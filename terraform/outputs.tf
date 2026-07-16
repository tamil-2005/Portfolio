# ---------------------------------------------------------------------------
# Terraform outputs
# ---------------------------------------------------------------------------

output "instance_public_ip" {
  description = "Public IP of the portfolio VM"
  value       = oci_core_instance.this.public_ip
}

output "instance_id" {
  description = "OCID of the compute instance"
  value       = oci_core_instance.this.id
}

output "vcn_id" {
  description = "OCID of the created VCN"
  value       = oci_core_vcn.this.id
}

output "subnet_id" {
  description = "OCID of the public subnet"
  value       = oci_core_subnet.this.id
}

output "ssh_command" {
  description = "Ready-to-use SSH command"
  value       = "ssh ubuntu@${oci_core_instance.this.public_ip}"
}