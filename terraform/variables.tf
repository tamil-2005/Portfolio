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

variable "ubuntu_image_id" {
  description = "OCID of the Canonical Ubuntu 22.04 image for the region"
  type        = string
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