#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Manual deploy helper (alternative to the GitHub Actions pipeline).
# Builds the image locally, pushes to GHCR, then SSH-deploys to the VM.
#
# Usage:
#   ./scripts/deploy.sh
#
# Required environment variables (or fill them in below):
#   ORACLE_HOST      public IP / hostname of the VM
#   ORACLE_USER      SSH user (default: ubuntu)
#   IMAGE            full image ref, e.g. ghcr.io/user/pro-portfolio:latest
# ---------------------------------------------------------------------------
set -euo pipefail

ORACLE_HOST="${ORACLE_HOST:?Set ORACLE_HOST}"
ORACLE_USER="${ORACLE_USER:-ubuntu}"
IMAGE="${IMAGE:-ghcr.io/${GITHUB_REPOSITORY_OWNER:-tamilselvan}/pro-portfolio:latest}"

echo "==> Building image: $IMAGE"
docker build -t "$IMAGE" .

echo "==> Pushing image"
if [ -n "${GHCR_TOKEN:-}" ]; then
  echo "$GHCR_TOKEN" | docker login ghcr.io -u "${GHCR_USER:-$GITHUB_ACTOR}" --password-stdin
fi
docker push "$IMAGE"

echo "==> Deploying to $ORACLE_USER@$ORACLE_HOST"
ssh -o StrictHostKeyChecking=no "$ORACLE_USER@$ORACLE_HOST" bash -s <<REMOTE
  set -e
  docker pull "$IMAGE"
  mkdir -p /opt/pro-portfolio
  cat > /opt/pro-portfolio/docker-compose.yml <<'EOF'
services:
  web:
    image: $IMAGE
    container_name: pro-portfolio
    restart: unless-stopped
    ports:
      - "80:80"
EOF
  cd /opt/pro-portfolio
  docker compose up -d --pull always
  docker image prune -f
REMOTE

echo "==> Deploy complete"