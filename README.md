# Tamilselvan Mariyappan — Portfolio

A clean, professional portfolio built with **React 18**, **Vite 5**, and **Tailwind CSS 3**.

---

## Quick start

```bash
# 1. Install Node.js ≥ 18 from https://nodejs.org if not installed
node -v        # should print v18.x or higher

# 2. Move into the project folder
cd portfolio-project

# 3. Install dependencies  (~30 s)
npm install

# 4. Add your assets
#    public/img/img1.jpg      ← your profile photo (400×400 recommended)
#    public/Assets/Resume.pdf ← your resume PDF

# 5. Start dev server
npm run dev
# Open http://localhost:5173
```

---

## All commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build for production → `dist/` folder |
| `npm run preview` | Preview production build locally |

---

## Customise your content

All portfolio data lives in **one file**: `src/data/portfolioData.js`

```
What to change          Where
──────────────────────────────────────────────
Name / tagline          Home.jsx (hardcoded)
Typed roles             TYPED_ROLES array
Education               EDUCATION array
Work experience         EXPERIENCES array
Projects                PROJECTS array
Skills & certifications SKILL_CATEGORIES array
Contact info            CONTACT_INFO array
Social links            SOCIAL array
```

---

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx         Active-link highlight, sticky scroll, mobile menu
│   ├── Home.jsx           Hero — typed roles, live clock, social links
│   ├── About.jsx          Bio + education cards
│   ├── Experience.jsx     Pipeline timeline + full detail panel
│   ├── Projects.jsx       Numbered project cards
│   ├── Skills.jsx         Click-to-expand categories with progress bars
│   ├── Contact.jsx        Contact info + message form
│   ├── Footer.jsx
│   └── ScrollUpBtn.jsx
├── hooks/
│   └── useCustomHooks.js  useTyped · useClock · useScrollReveal
├── data/
│   └── portfolioData.js   All content — edit this to customise
├── App.jsx
├── main.jsx
└── index.css              Design tokens, animations, scrollbar
```

---

## Deploy — Oracle Cloud (Always Free) + GitHub Actions CI/CD

This project ships with a full containerised deployment pipeline:

```
Developer ──git push (main)──▶ GitHub Repo
                                   │ trigger
                                   ▼
                        GitHub Actions CI/CD
                        • checkout • install • build
                        • build & push Docker image → GHCR
                        • SSH to Oracle VM • pull • restart container
                                   │ SSH
                                   ▼
            Oracle Cloud Always-Free VM (Ubuntu 22.04)
                        Docker Engine + Nginx container :80
                                   │ HTTP/HTTPS
                                   ▼
                              End Users
```

### 1. Provision the Oracle Cloud VM (Terraform)

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars   # fill in your OCIDs/keys
terraform init
terraform apply
# note the instance_public_ip output
```

The `cloud-init.sh` automatically installs Docker + Compose and creates `/opt/pro-portfolio` on first boot.

### 2. Configure GitHub Secrets

In **Repo → Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|-------|
| `ORACLE_HOST` | Public IP of the VM |
| `ORACLE_USER` | `ubuntu` |
| `ORACLE_SSH_KEY` | Private SSH key (contents of `~/.ssh/id_rsa`) |

> The workflow pushes the image to **GHCR** using the built-in `GITHUB_TOKEN` — no extra secret needed. Make sure the package is set to **public** (or the VM is authenticated to GHCR).

### 3. Deploy

Push to `main` — the pipeline builds, pushes to GHCR, SSH-deploys, and restarts the container automatically.

```bash
git push origin main
```

Or trigger manually from the **Actions** tab.

### 4. Manual deploy (no GitHub Actions)

```bash
ORACLE_HOST=<vm-ip> ./scripts/deploy.sh
```

### Files involved

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build (Node → Nginx) |
| `nginx.conf` | SPA-aware Nginx config (gzip, caching, fallback) |
| `.github/workflows/deploy.yml` | CI/CD pipeline |
| `docker-compose.yml` | Container definition for the VM |
| `terraform/` | OCI networking + Always-Free compute |
| `scripts/deploy.sh` | Manual deploy helper |

---

## Deploy (static hosts — alternative)

### Vercel (recommended — free, ~1 min)
```bash
npm i -g vercel
npm run build
vercel          # follow prompts
```

### Netlify
```bash
npm run build
# Drag-drop the dist/ folder at app.netlify.com/drop
```

### GitHub Pages
```bash
npm i -D gh-pages

# package.json → add:
#   "homepage": "https://USERNAME.github.io/REPO",
#   "predeploy": "npm run build",
#   "deploy": "gh-pages -d dist"

# vite.config.js → add:  base: '/REPO/'

npm run deploy
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `npm: command not found` | Install Node.js from nodejs.org |
| Photo not showing | Check file is at `public/img/img1.jpg` (exact name, exact case) |
| Styles broken after `npm install` | Delete `node_modules/` and run `npm install` again |
| Port 5173 in use | `npm run dev -- --port 3000` |
| Icons appear as squares | Check internet connection (Font Awesome loads from CDN) |

---

Built with React · Vite · Tailwind CSS · Font Awesome · Inter (Google Fonts)
