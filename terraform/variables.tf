# ---------------------------------------------------------------------------
# Terraform variables for Oracle Cloud provisioning
# ---------------------------------------------------------------------------

variable "tenancy_ocid" {
  description = "OCID of the OCI tenancy"
  type        = string
}

variable "user_ocid" {
  description = "OCID of the OCI user with API keys"
  type        = string
}

variable "api_fingerprint" {
  description = "Fingerprint of the OCI API private key"
  type        = string
}

variable "api_private_key_path" {
  description = "Local path to the OCI API private key (PEM)"
  type        = string
  default     = "~/.oci/oci_api_key.pem"
}

variable "region" {
  description = "OCI region (e.g. ap-mumbai-1)"
  type        = string
  default     = "ap-mumbai-1"
}

variable "compartment_ocid" {
  description = "OCID of the target compartment (root or dedicated)"
  type        = string
}

variable "availability_domain" {
  description = "Availability domain, e.g. ZLjJ:AP-MUMBAI-1-AD-1"
  type        = string
}

variable "availability_domain_index" {
  description = "Index of the availability domain to use (0-based). Use 0, 1, or 2 to try different ADs if capacity is unavailable."
  type        = number
  default     = 0
}

variable "ubuntu_image_id" {
  description = "OCID of the Canonical Ubuntu 22.04 image. If empty, auto-discovered via data source."
  type        = string
  default     = ""
}

variable "instance_shape" {
  description = "OCI compute shape for the instance"
  type        = string
  default     = "VM.Standard.A1.Flex"
}

variable "instance_ocpus" {
  description = "Number of OCPUs for the instance"
  type        = number
  default     = 1
}

variable "instance_memory_gbs" {
  description = "Memory in GB for the instance"
  type        = number
  default     = 4
}

variable "fault_domain" {
  description = "Fault domain for the instance (e.g. FAULT-DOMAIN-1, FAULT-DOMAIN-2, FAULT-DOMAIN-3). Leave empty to auto-select."
  type        = string
  default     = ""
}

variable "ssh_public_key" {
  description = "SSH public key injected into the instance"
  type        = string
}

variable "vcn_cidr" {
  description = "CIDR block for the VCN"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.0.0/24"
}