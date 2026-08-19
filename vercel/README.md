# Vercel Deployment via Terraform

This folder contains Terraform configuration to provision and manage the deployment of the portfolio web application on **Vercel**.

---

## 📋 Prerequisites

1. **Terraform CLI** (`>= 1.0.0`) installed on your local machine.
2. A **Vercel Account** ([vercel.com](https://vercel.com/)).
3. A **Vercel API Token**:
   - Go to **Vercel Account Settings** -> **Tokens** -> **Create Token**.
   - Copy the generated token string.

---

## 🚀 Quick Start Guide

### 1. Initialize Configuration File

Copy the example variables file to `terraform.tfvars`:

```bash
cd vercel
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` and set your `vercel_api_token`:

```hcl
vercel_api_token = "your_actual_vercel_api_token"
project_name     = "tamilselvan-portfolio"
```

---

### 2. Initialize Terraform

Initialize the Vercel Terraform provider:

```bash
terraform init
```

---

### 3. Review Plan

Preview the infrastructure changes:

```bash
terraform plan
```

---

### 4. Deploy to Vercel

Apply the configuration to create the project on Vercel:

```bash
terraform apply
```

Once complete, your portfolio project will be available at:
`https://<project-name>.vercel.app`

---

## 📁 File Structure

- [`main.tf`](file:///c:/Users/TamilselvanMariyappa/OneDrive%20-%20Infinitesol%20LLC/PSNL/Final/pro-portfolio/vercel/main.tf): Core Vercel provider setup, `vercel_project`, and optional domain resources.
- [`variables.tf`](file:///c:/Users/TamilselvanMariyappa/OneDrive%20-%20Infinitesol%20LLC/PSNL/Final/pro-portfolio/vercel/variables.tf): Input variable definitions (API token, framework, git repo, custom domain).
- [`outputs.tf`](file:///c:/Users/TamilselvanMariyappa/OneDrive%20-%20Infinitesol%20LLC/PSNL/Final/pro-portfolio/vercel/outputs.tf): Output parameters (Project ID, project name, default deployment URL).
- [`terraform.tfvars.example`](file:///c:/Users/TamilselvanMariyappa/OneDrive%20-%20Infinitesol%20LLC/PSNL/Final/pro-portfolio/vercel/terraform.tfvars.example): Sample variable definitions file.
