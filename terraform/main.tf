# ---------------------------------------------------------------------------
# Oracle Cloud Infrastructure — Always Free Compute for the portfolio
# Provisions: VCN + Internet Gateway + Route Table + Subnet + Security List
#             + Always-Free Ampere A1 VM (Ubuntu 22.04) with a public IP.
# ---------------------------------------------------------------------------

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    oci = {
      source  = "oracle/oci"
      version = ">= 6.0.0"
    }
  }
}

provider "oci" {
  tenancy_ocid     = var.tenancy_ocid
  user_ocid        = var.user_ocid
  fingerprint      = var.api_fingerprint
  private_key_path = var.api_private_key_path
  region           = var.region

  retry_duration_seconds = 300
}

# ---- Compartment (use root compartment if no dedicated one) ----
data "oci_identity_compartment" "this" {
  id = var.compartment_ocid
}

# ---- Auto-discover an availability domain in the region ----
data "oci_identity_availability_domains" "ads" {
  compartment_id = var.tenancy_ocid
}

locals {
  ad_name         = length(data.oci_identity_availability_domains.ads.availability_domains) > 0 ? data.oci_identity_availability_domains.ads.availability_domains[min(var.availability_domain_index, length(data.oci_identity_availability_domains.ads.availability_domains) - 1)].name : var.availability_domain
  ubuntu_image_id = var.ubuntu_image_id != "" ? var.ubuntu_image_id : data.oci_core_images.ubuntu.images[0].id
}

# ---- Auto-discover the latest Canonical Ubuntu 22.04 image ----
data "oci_core_images" "ubuntu" {
  compartment_id           = var.tenancy_ocid
  operating_system         = "Canonical Ubuntu"
  operating_system_version = "22.04"
  shape                    = var.instance_shape
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
}

# ---- VCN ----
resource "oci_core_vcn" "this" {
  compartment_id = var.compartment_ocid
  display_name   = "pro-portfolio-vcn"
  cidr_blocks    = [var.vcn_cidr]
  dns_label      = "portfoliovcn"
}

# ---- Internet Gateway ----
resource "oci_core_internet_gateway" "this" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.this.id
  display_name   = "pro-portfolio-igw"
  enabled        = true
}

# ---- Route Table (public) ----
resource "oci_core_route_table" "this" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.this.id
  display_name   = "pro-portfolio-rt"

  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.this.id
  }
}

# ---- Security List (allow 22/80/443 + ICMP) ----
resource "oci_core_security_list" "this" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.this.id
  display_name   = "pro-portfolio-sl"

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options {
      min = 22
      max = 22
    }
  }
  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 80
      max = 80
    }
  }
  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 443
      max = 443
    }
  }
  ingress_security_rules {
    protocol = "1" # ICMP
    source   = "0.0.0.0/0"
    icmp_options {
      type = 3
      code = 4
    }
  }

  egress_security_rules {
    protocol    = "all"
    destination = "0.0.0.0/0"
  }
}

# ---- Subnet ----
resource "oci_core_subnet" "this" {
  compartment_id             = var.compartment_ocid
  vcn_id                     = oci_core_vcn.this.id
  display_name               = "pro-portfolio-subnet"
  cidr_block                 = var.subnet_cidr
  security_list_ids          = [oci_core_security_list.this.id]
  route_table_id             = oci_core_route_table.this.id
  dns_label                  = "portfoliosub"
  prohibit_public_ip_on_vnic = false
}

# ---- Compute Instance (Always Free: VM.Standard.A1.Flex, Ampere, 1 OCPU / 4 GB RAM) ----
resource "oci_core_instance" "this" {
  availability_domain = local.ad_name
  compartment_id      = var.compartment_ocid
  display_name        = "pro-portfolio-vm"
  shape               = var.instance_shape
  fault_domain        = var.fault_domain != "" ? var.fault_domain : null

  shape_config {
    ocpus         = var.instance_ocpus
    memory_in_gbs = var.instance_memory_gbs
  }

  availability_config {
    recovery_action = "RESTORE_INSTANCE"
  }

  instance_options {
    are_legacy_imds_endpoints_disabled = true
  }

  agent_config {
    is_monitoring_disabled   = false
    is_management_disabled   = false
    are_all_plugins_disabled = false

    plugins_config {
      name          = "Compute Instance Monitoring"
      desired_state = "ENABLED"
    }
    plugins_config {
      name          = "Custom Logs Monitoring"
      desired_state = "ENABLED"
    }
    plugins_config {
      name          = "OS Management Hub Agent"
      desired_state = "ENABLED"
    }
    plugins_config {
      name          = "Cloud Guard Workload Protection"
      desired_state = "ENABLED"
    }
    plugins_config {
      name          = "Vulnerability Scanning"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Management Agent"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Compute HPC RDMA Auto-Configuration"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Compute HPC RDMA Authentication"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Block Volume Management"
      desired_state = "DISABLED"
    }
    plugins_config {
      name          = "Bastion"
      desired_state = "DISABLED"
    }
  }

  source_details {
    source_type             = "image"
    source_id               = local.ubuntu_image_id
    boot_volume_size_in_gbs = 50
  }

  create_vnic_details {
    subnet_id        = oci_core_subnet.this.id
    assign_public_ip = true
    hostname_label   = "pro-portfolio"
  }

  metadata = {
    ssh_authorized_keys = var.ssh_public_key
    user_data           = base64encode(file("${path.module}/cloud-init.sh"))
  }

  freeform_tags = {
    project = "pro-portfolio"
    env     = "production"
  }
}