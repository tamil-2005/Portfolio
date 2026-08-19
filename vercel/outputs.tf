output "project_id" {
  description = "The ID of the Vercel project."
  value       = vercel_project.portfolio.id
}

output "project_name" {
  description = "The name of the Vercel project."
  value       = vercel_project.portfolio.name
}

output "default_domain" {
  description = "The default Vercel production domain for the project."
  value       = "https://${vercel_project.portfolio.name}.vercel.app"
}

output "custom_domain" {
  description = "The custom domain associated with the project (if configured)."
  value       = length(vercel_project_domain.portfolio_domain) > 0 ? vercel_project_domain.portfolio_domain[0].domain : null
}
