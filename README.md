<div align="center">

  <img src="logo.svg" alt="Grova Logo" width="70" height="70" />

# Grova

**Goal Tracking & Daily Habit Building SaaS Platform**

_Transform your long-term goals into visual streaks, daily consistency heatmaps, and community accountability._

[![CI Workflow](https://github.com/RanitManik/Grova/actions/workflows/ci.yml/badge.svg)](https://github.com/RanitManik/Grova/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

</div>

<img alt="hero" src="public/hero-product-preview.png" />

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Database Schema & Architecture](#database-schema--architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Commit Hooks & Code Quality](#commit-hooks--code-quality)
- [Deployment Guide](#deployment-guide)
  - [Deploying on Vercel](#deploying-on-vercel)
  - [Neon PostgreSQL Database Setup](#neon-postgresql-database-setup)
- [Community & Contributing](#community--contributing)
- [License](#license)

## Overview

**Grova** is a modern, high-performance web application designed to help individuals and teams track their habits, reach ambitious targets, and maintain daily accountability. Taking inspiration from activity contribution graphs, Grova turns progress into interactive color-coded heatmaps, streak tracking algorithms, and real-time social feeds.

Whether you're tracking coding hours, fitness routines, reading targets, or financial savings, Grova provides an intuitive dashboard with rich visual feedback.

> [!NOTE]
> **Simple & Easy to Self-Host**: Grova is kept intentionally lightweight and straightforward so that anyone can quickly self-host and customize it. This is a personal/hobby project created for ease of deployment and simplicity.

## Key Features

- 🟩 **Contribution Heatmap Grid**: Visual 365-day activity grid displaying your daily effort intensity across all active goals.
- 🔥 **Smart Streak Calculations**: Real-time tracking of your current streak, longest streak, total contributions, and percentage completion rate.
- 🎯 **Flexible Goal Structures**:
  - `TOTAL_TARGET`: Cumulative target tracking (e.g. read 24 books or code 500 hours over a year).
  - `DAILY_RECURRING`: Daily habitual targets (e.g. meditate 20 mins every day).
  - `WEEKLY_RECURRING`: Weekly goal checkpoints.
- 🏷️ **Categorized Management**: Group goals into Work, Study, Health, Mindfulness, Finance, Creative, Social, or custom categories.
- 📝 **Daily Logging & Quick Notes**: Record daily progress, log partial or full completion status, and attach contextual quick notes to any day.
- 👥 **Social Accountability Feed**: Follow other achievers, explore public profiles, and stay inspired by community activity.
- 🔔 **Intelligent Notifications**: Receive alerts for streak milestones, goals at risk of falling behind, and friend achievements.
- 🌙 **Modern Dark/Light UI**: Built with Radix UI components, smooth Framer Motion micro-interactions, Tailwind CSS v4, and Lucide icons.
- 🔒 **Enterprise-Grade Auth**: NextAuth.js (Auth.js v5) integration supporting OAuth providers and secure session state.

## Tech Stack

### Core Framework & Runtime

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)

### Database & ORM

- **Database**: [Neon Serverless PostgreSQL](https://neon.tech/)
- **ORM**: [Prisma ORM v7](https://www.prisma.io/)

### Authentication & API

- **Auth Engine**: [NextAuth.js v5 (Auth.js)](https://authjs.dev/) with `@auth/prisma-adapter`
- **Schema Validation**: [Zod v4](https://zod.dev/)

### Styling & Data Visualization

- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **UI Components**: [Radix UI Primitives](https://www.radix-ui.com/) & `class-variance-authority`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion v12](https://www.framer.com/motion/)
- **Charts & Graphs**: [Recharts](https://recharts.org/)
- **Toast Notifications**: [Sonner](https://sonner.emilkowal.si/)

### Code Quality & Git Infrastructure

- **Package Manager**: [pnpm v10](https://pnpm.io/)
- **Code Formatter**: [Prettier v3](https://prettier.io/)
- **Linter**: [ESLint v9](https://eslint.org/)
- **Commit Hooks**: [Husky v9](https://typicode.github.io/husky/) & [lint-staged](https://github.com/okonet/lint-staged)
- **Commit Validation**: [Commitlint](https://commitlint.js.org/) (Conventional Commits)

## Database Schema & Architecture

Grova's database architecture leverages relational PostgreSQL models with optimized indexes and denormalized counters for lightning-fast reads:

```mermaid
erDiagram
    User ||--o{ Account : "authenticates via"
    User ||--o{ Session : "maintains"
    User ||--o{ Goal : "owns"
    User ||--o{ DailyLog : "logs"
    User ||--o{ QuickNote : "writes"
    User ||--o{ Notification : "receives"
    User ||--o{ Follow : "follows / followed by"
    Goal ||--o{ DailyLog : "tracks progress in"

    User {
        string id PK
        string email UK
        string username UK
        int currentStreak
        int longestStreak
        int totalContributions
        float completionRate
    }

    Goal {
        string id PK
        string userId FK
        string title
        GoalType type
        GoalStatus status
        GoalCategory category
        float targetAmount
        float completedAmount
        datetime startDate
        datetime endDate
    }

    DailyLog {
        string id PK
        string userId FK
        string goalId FK
        date date
        float completedAmount
        LogStatus status
    }
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- **Node.js**: `v20.x` or higher
- **pnpm**: `v9.x` or `v10.x` (`npm i -g pnpm`)
- **PostgreSQL**: A running instance or a free [Neon PostgreSQL](https://neon.tech) database URL.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/RanitManik/Grova.git
   cd Grova
   ```

2. **Install project dependencies**:

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory by copying `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. **Initialize Database Schema**:
   Generate Prisma Client and push schema to your database:

   ```bash
   pnpm db:push
   ```

5. **Start Development Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view Grova running locally.

### Environment Variables

| Variable             | Description                                              | Example / Default                                               |
| -------------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| `DATABASE_URL`       | PostgreSQL connection string (Neon or standard Postgres) | `postgresql://user:pass@ep-xxx.neon.tech/grova?sslmode=require` |
| `NEXTAUTH_SECRET`    | Secret token used to encrypt NextAuth JWT tokens         | Generate via `openssl rand -base64 32`                          |
| `NEXTAUTH_URL`       | Base URL of your application                             | `http://localhost:3000` (Dev) / `https://yourdomain.com` (Prod) |
| `AUTH_GITHUB_ID`     | GitHub OAuth App Client ID                               | Obtained from GitHub Developer Settings                         |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Client Secret                           | Obtained from GitHub Developer Settings                         |
| `AUTH_GOOGLE_ID`     | Google OAuth App Client ID                               | Obtained from Google Cloud Console                              |
| `AUTH_GOOGLE_SECRET` | Google OAuth App Client Secret                           | Obtained from Google Cloud Console                              |

## Available Scripts

In the project root, you can run the following scripts using `pnpm`:

| Command             | Description                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`          | Starts the Next.js development server with hot reloading.                                                           |
| `pnpm build`        | Runs production migrations (`prisma migrate deploy`), generates Prisma client, and compiles Next.js for production. |
| `pnpm start`        | Starts the Next.js production server.                                                                               |
| `pnpm validate`     | Full QA run: Tailwind class check, formatting, linting, type-checking & build test.                                 |
| `pnpm format`       | Auto-formats all codebase files using Prettier.                                                                     |
| `pnpm format:check` | Verifies code formatting compliance without modifying files.                                                        |
| `pnpm lint`         | Runs ESLint to catch syntax, import, and code style issues.                                                         |
| `pnpm type-check`   | Performs strict TypeScript type checks (`tsc --noEmit`).                                                            |
| `pnpm db:generate`  | Generates Prisma Client TypeScript definitions.                                                                     |
| `pnpm db:push`      | Pushes Prisma schema directly to the configured database.                                                           |
| `pnpm db:migrate`   | Runs database migrations in development mode (`prisma migrate dev`).                                                |
| `pnpm db:deploy`    | Runs pending database migrations safely in production mode (`prisma migrate deploy`).                               |
| `pnpm db:reset`     | Drops and resets the development database schema (`prisma migrate reset`).                                          |
| `pnpm db:studio`    | Launches Prisma Studio GUI at `http://localhost:5555`.                                                              |

## Commit Hooks & Code Quality

Grova uses **Husky**, **Commitlint**, and **lint-staged** to enforce code standard consistency on every commit:

- **Pre-commit Hook**: Automatically formats and lints only staged files before code can be committed (`lint-staged`).
- **Commit-msg Hook**: Ensures commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (`feat: ...`, `fix: ...`, `docs: ...`, `refactor: ...`, etc.).

Example of a valid commit:

```bash
git commit -m "feat(analytics): add monthly completion breakdown chart"
```

If a commit message does not comply with the convention, the commit will be rejected with actionable feedback.

## Deployment Guide

For detailed step-by-step instructions on Vercel deployment, Neon PostgreSQL configuration, and custom self-hosting (Docker/VPS/Node), read our full [Deployment & Self-Hosting Guide](docs/DEPLOYMENT.md).

### Deploying on Vercel

The easiest and recommended way to deploy Grova is using [Vercel](https://vercel.com/):

1. Push your code to your GitHub repository.
2. Import the repository into your Vercel Dashboard.
3. Vercel will automatically detect Next.js.
4. Set the **Build Command** to `pnpm build` (or `npx prisma generate && next build`).
5. Add all required **Environment Variables** (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, OAuth keys) in Vercel settings.
6. Click **Deploy**.

### Neon PostgreSQL Database Setup

1. Create a free account on [Neon.tech](https://neon.tech).
2. Create a new project named `grova-db`.
3. Copy your Pooled & Direct Connection Strings.
4. Set `DATABASE_URL` in your Vercel environment settings.
5. Execute database schema sync:
   ```bash
   pnpm db:push
   ```

## Community & Contributing

We welcome and appreciate contributions of all kinds! Please read our community guidelines before opening an issue or pull request:

- [Contributing Guide](CONTRIBUTING.md) — Detailed steps on local setup, branch conventions, and PR workflow.
- [Code of Conduct](CODE_OF_CONDUCT.md) — Community behavior standards and pledge.
- [Security Policy](.github/SECURITY.md) — Guidelines for reporting security vulnerabilities.
- [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) — Checklist for submitting PRs.

## License

This project is open-source software licensed under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/RanitManik">Ranit Manik</a> and the Open Source Community.
</div>
