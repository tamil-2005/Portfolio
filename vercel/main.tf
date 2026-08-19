terraform {
  required_version = ">= 1.0.0"
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team_id
}

# Vercel Project Resource
resource "vercel_project" "portfolio" {
  name      = var.project_name
  framework = var.framework

  build_command    = "npm run build"
  output_directory = "dist"
  install_command  = "npm install"

  git_repository = var.git_repository != null ? {
    type = var.git_repository.type
    repo = var.git_repository.repo
  } : null

  environment = [
    for env in var.environment_variables : {
      key    = env.key
      value  = env.value
      target = env.target
    }
  ]
}

# Optional Custom Domain Resource
resource "vercel_project_domain" "portfolio_domain" {
  count      = var.custom_domain != null && var.custom_domain != "" ? 1 : 0
  project_id = vercel_project.portfolio.id
  domain     = var.custom_domain
}
