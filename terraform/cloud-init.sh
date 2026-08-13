#!/bin/bash
# cloud-init: runs once on first boot of the Oracle VM.
# Installs Docker + Compose and prepares the app directory.
set -euo pipefail

exec > /var/log/cloud-init-bootstrap.log 2>&1

echo "==> Updating packages"
apt-get update -y
apt-get upgrade -y

echo "==> Installing Docker"
apt-get install -y ca-certificates curl gnupg lsb-release

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  > /etc/apt/sources.list.d/docker.list

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

systemctl enable --now docker
usermod -aG docker ubuntu

echo "==> Configuring OS Firewall for HTTP/HTTPS"
iptables -I INPUT -p tcp --dport 80 -j ACCEPT || true
iptables -I INPUT -p tcp --dport 443 -j ACCEPT || true
if command -v netfilter-persistent &> /dev/null; then
  netfilter-persistent save || true
fi
if command -v ufw &> /dev/null; then
  ufw allow 80/tcp || true
  ufw allow 443/tcp || true
fi

echo "==> Creating app directory"
mkdir -p /opt/pro-portfolio
chown -R ubuntu:ubuntu /opt/pro-portfolio

echo "==> Disabling host nginx (port 80 belongs to the app container)"
systemctl stop nginx 2>/dev/null || true
systemctl disable nginx 2>/dev/null || true
apt-get remove -y nginx nginx-common 2>/dev/null || true

echo "==> Installing certbot"
apt-get install -y certbot
mkdir -p /etc/letsencrypt /var/www/certbot/.well-known/acme-challenge
chmod 755 /etc/letsencrypt
chown -R ubuntu:ubuntu /var/www/certbot

echo "==> Setting up certbot auto-renewal"
cat > /etc/cron.d/certbot-renew <<'CRON'
0 3 * * * root certbot renew --quiet --webroot -w /var/www/certbot --deploy-hook "docker restart pro-portfolio"
CRON
chmod 644 /etc/cron.d/certbot-renew

echo "==> Bootstrap complete"