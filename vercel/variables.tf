variable "vercel_api_token" {
  description = "Vercel API Token used for authentication with the Vercel Terraform Provider."
  type        = string
  sensitive   = true
}

variable "vercel_team_id" {
  description = "Optional Vercel Team / Organization ID. Leave empty if deploying to personal account."
  type        = string
  default     = null
}

variable "project_name" {
  description = "The name of the Vercel project."
  type        = string
  default     = "tamilselvan-portfolio"
}

variable "framework" {
  description = "The framework preset used by Vercel for building the application."
  type        = string
  default     = "vite"
}

variable "git_repository" {
  description = "Git repository details to connect to Vercel."
  type = object({
    type = string # e.g. "github", "gitlab", "bitbucket"
    repo = string # e.g. "owner/repository-name"
  })
  default = null
}

variable "custom_domain" {
  description = "Optional custom domain name to attach to the Vercel project."
  type        = string
  default     = null
}

variable "environment_variables" {
  description = "Map of environment variables to add to the Vercel project."
  type = list(object({
    key    = string
    value  = string
    target = list(string) # e.g. ["production", "preview", "development"]
  }))
  default = []
}
