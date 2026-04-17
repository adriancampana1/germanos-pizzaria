# Dockerfile + CI/CD Design

**Date:** 2026-04-17  
**Project:** germano-pizzeria  
**Status:** Approved

---

## Context

Next.js 16.2.2 project with `output: "export"` — generates a fully static site into the `out/` folder. No Node.js server is needed in production; only a static file server.

**Deployment target:** Hostinger VPS with an external nginx proxy in front of the container.  
**CI/CD platform:** GitHub Actions.  
**Deploy strategy:** GitHub Actions SSHs into the VPS, runs `git pull` and `docker compose up --build -d` directly on the machine.

---

## Files to Create

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build: Node.js builds the app, nginx serves static files |
| `nginx.conf` | Custom nginx config for Next.js static export routing |
| `docker-compose.yml` | Defines the `web` service with port mapping and restart policy |
| `.github/workflows/deploy.yml` | GitHub Actions workflow triggered on push to `main` |

---

## Dockerfile

Two-stage build:

**Stage `builder` (node:22-alpine):**
- Copy `package.json` and `package-lock.json`, run `npm ci`
- Copy remaining source files
- Run `npm run build` to generate `out/`

**Stage `runner` (nginx:alpine):**
- Copy `out/` from the builder stage into `/usr/share/nginx/html`
- Copy `nginx.conf` into the nginx config directory
- Expose port `80`

Final image contains only nginx and static files — no Node.js runtime.

---

## nginx.conf

Custom configuration required for Next.js static export:

- `try_files $uri $uri/ $uri.html /index.html` — handles client-side routing
- Long cache headers (`max-age=31536000, immutable`) for `_next/static/` assets
- No-cache headers for `index.html` to ensure fresh deploys are picked up
- Gzip compression enabled

---

## docker-compose.yml

Single service `web`:

- Built from local `Dockerfile`
- Port mapping: `3000:80` (external proxy points to port 3000 on the VPS)
- Restart policy: `unless-stopped`
- Container name: `germano-pizzeria`

No environment variables needed (static site, no server).

---

## GitHub Actions Workflow

File: `.github/workflows/deploy.yml`  
Trigger: push to `main` branch

**Steps:**

1. Checkout code (for workflow file validation only — actual code is pulled on the VPS)
2. SSH into VPS using `appleboy/ssh-action` with the following GitHub Secrets:
   - `VPS_HOST` — IP address or domain of the VPS
   - `VPS_USER` — SSH user (e.g., `root` or a dedicated deploy user)
   - `VPS_SSH_KEY` — private SSH key
   - `VPS_PORT` — SSH port (default `22`)
3. Remote commands executed on the VPS:
   ```bash
   cd /path/to/project          # replace with actual path via VPS_PATH secret
   git pull origin main
   docker compose up --build -d
   docker image prune -f
   ```

**GitHub Secrets required:**

| Secret | Value |
|--------|-------|
| `VPS_HOST` | IP or domain of the VPS |
| `VPS_USER` | SSH username |
| `VPS_SSH_KEY` | Private SSH key (RSA or Ed25519) |
| `VPS_PORT` | SSH port (usually `22`) |
| `VPS_PATH` | Absolute path to the project on the VPS |

**One-time VPS setup (manual):**  
Before the first deploy, SSH into the VPS and clone the repository:
```bash
git clone <repo-url> /path/to/project
```
Subsequent deploys use `git pull` via the workflow.

---

## Constraints & Decisions

- Build happens on the VPS at deploy time. Acceptable for a static site where builds are fast.
- No container registry needed — simpler setup, no registry credentials to manage.
- `docker image prune -f` after each build prevents disk accumulation from old images.
- The external nginx proxy handles SSL termination; the container only serves HTTP on port 3000.
