# Grova Deployment & Self-Hosting Guide

This guide walks you through deploying **Grova** on [Vercel](https://vercel.com/) with a serverless [Neon PostgreSQL](https://neon.tech/) database, as well as self-hosting on custom Linux servers or Docker containers.

---

## Table of Contents

- [Option 1: Deploy on Vercel (Recommended)](#option-1-deploy-on-vercel-recommended)
- [Option 2: Self-Hosting (Node.js / VPS / Docker)](#option-2-self-hosting-nodejs--vps--docker)
- [Database Setup (Neon PostgreSQL)](#database-setup-neon-postgresql)
- [Environment Variables Checklist](#environment-variables-checklist)
- [Post-Deployment Verification](#post-deployment-verification)

---

## Option 1: Deploy on Vercel (Recommended)

Vercel is the fastest and easiest platform to host Next.js App Router projects.

### Step-by-Step Vercel Setup

1. **Fork or Push Code to GitHub**:
   Ensure your code is pushed to your GitHub repository.

2. **Import Project into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Select your `Grova` repository and click **Import**.

   - **Build Command**: `pnpm build` (runs `prisma migrate deploy && prisma generate && next build`)
   - **Install Command**: `pnpm install`

3. **Set Environment Variables**:
   Add the following environment variables in the Vercel project settings:
   - `DATABASE_URL`: Your pooled Neon connection string.
   - `DIRECT_URL`: Your direct Neon connection string.
   - `NEXTAUTH_SECRET`: Secret token generated via `openssl rand -base64 32`.
   - `NEXTAUTH_URL`: Your custom production domain (e.g., `https://grova.5dev.in`).
   - `AUTH_GITHUB_ID` & `AUTH_GITHUB_SECRET`: GitHub OAuth app credentials.
   - `AUTH_GOOGLE_ID` & `AUTH_GOOGLE_SECRET`: Google OAuth app credentials.

4. **Deploy**:
   Click **Deploy**. Vercel will automatically build and publish your site.

---

## Option 2: Self-Hosting (Node.js / VPS / Docker)

Grova is intentionally kept simple to make self-hosting on your own VPS (Ubuntu, Debian, DigitalOcean, Hetzner, AWS) quick and straightforward.

### Prerequisites for Self-Hosting

- **Node.js**: `v20.x` or higher
- **pnpm**: `v9.x` or `v10.x` (`npm i -g pnpm`)
- **PostgreSQL**: A local PostgreSQL database or managed database instance.

### Self-Hosting Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/RanitManik/Grova.git
   cd Grova
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Configure `.env`**:

   ```bash
   cp .env.example .env
   # Edit .env and fill in DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, etc.
   ```

4. **Initialize Database Schema**:

   ```bash
   pnpm db:push
   ```

5. **Build Production Assets**:

   ```bash
   pnpm build
   ```

6. **Start Production Server**:
   ```bash
   pnpm start
   ```
   _Tip: Use PM2 or systemd to keep the app running continuously:_
   ```bash
   npm install -g pm2
   pm2 start "pnpm start" --name "grova"
   ```

---

## Database Setup (Neon PostgreSQL)

Grova uses [Prisma ORM v7](https://www.prisma.io/) connected to PostgreSQL.

1. Create a free database at [Neon.tech](https://neon.tech).
2. Copy your **Pooled Connection String** to `DATABASE_URL` (for connection pooling in serverless environments).
3. Copy your **Direct Connection String** to `DIRECT_URL` (used by Prisma for migrations).
4. Run database migrations for production:
   ```bash
   pnpm db:deploy
   ```
   _(Or `pnpm db:push` if initializing without migration history files)._

### Production Schema Migration Workflow

When modifying the database schema (`prisma/schema.prisma`):

1. **Local Development**: Generate migration SQL files:
   ```bash
   pnpm db:migrate --name add_new_feature
   ```
2. **Commit Migration Files**: Commit `prisma/migrations/` to Git.
3. **Automated Production Deployment**: When building on Vercel or your hosting server, `pnpm build` will automatically run `pnpm db:deploy` (`prisma migrate deploy`) against your production database using `DIRECT_URL` / `DATABASE_URL` before compiling the app.

---

## Environment Variables Checklist

| Variable             | Description                          | Production Example                                                             |
| -------------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `DATABASE_URL`       | Pooled PostgreSQL connection URL     | `postgresql://user:pass@ep-xxx.neon.tech/grova?sslmode=require&pgbouncer=true` |
| `DIRECT_URL`         | Direct PostgreSQL connection URL     | `postgresql://user:pass@ep-xxx.neon.tech/grova?sslmode=require`                |
| `NEXTAUTH_SECRET`    | 32-character random string           | `openssl rand -base64 32`                                                      |
| `NEXTAUTH_URL`       | Canonical domain of the deployed app | `https://grova.5dev.in`                                                        |
| `AUTH_GITHUB_ID`     | OAuth App Client ID                  | Obtained from GitHub Developer Settings                                        |
| `AUTH_GITHUB_SECRET` | OAuth App Client Secret              | Obtained from GitHub Developer Settings                                        |

---

## Post-Deployment Verification

After deploying your application:

1. Visit your production URL (e.g., `https://grova.5dev.in`).
2. Test user login via GitHub or Google OAuth.
3. Create a test goal and log daily progress to verify database read/write operations.
4. Verify link sharing previews on social platforms (WhatsApp, Twitter, LinkedIn) to confirm OpenGraph cards render cleanly.
