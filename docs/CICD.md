# Grova CI/CD & Automated Release Pipeline Documentation

This guide provides a comprehensive overview of **Grova's** Continuous Integration (CI), Continuous Deployment (CD), automated versioning, and dependency management architecture built with **GitHub Actions**, **Changesets**, and **Vercel**.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [1. Continuous Integration (CI) Workflow](#1-continuous-integration-ci-workflow)
- [2. Automated Versioning & Release Pipeline](#2-automated-versioning--release-pipeline)
  - [The Two-Pass Release Process](#the-two-pass-release-process)
  - [Private Package Configuration](#private-package-configuration)
- [3. Dependabot & Auto-Merge Workflow](#3-dependabot--auto-merge-workflow)
- [4. Vercel Deployment Optimization](#4-vercel-deployment-optimization)
- [5. Developer Guide: How to Work with Changesets](#5-developer-guide-how-to-work-with-changesets)
- [6. Required Tokens & Repository Secrets](#6-required-tokens--repository-secrets)
- [7. Troubleshooting & FAQs](#7-troubleshooting--faqs)

---

## Architecture Overview

Grova uses a modular, multi-tier GitHub Actions setup to enforce code quality, manage Semantic Versioning (SemVer), generate changelogs, tag releases, and optimize build minutes on Vercel.

```
                         +-----------------------------------+
                         |           Developer Commit        |
                         +-----------------------------------+
                                           |
                                           v
       +-----------------------------------+-----------------------------------+
       |                                   |                                   |
       v                                   v                                   v
+--------------+                   +---------------+                   +---------------+
|    CI.yml    |                   |  Release.yml  |                   | Dependabot.yml|
| (Validation) |                   |  (Changeset)  |                   |  (Auto-Merge) |
+--------------+                   +---------------+                   +---------------+
       |                                   |                                   |
       | Runs formatting,                  | Step 1: Creates Version PR        | Auto-enables
       | linting & type                    | Step 2: Tags & publishes          | auto-merge for
       | checks                            |         GitHub Release            | dependabot PRs
       v                                   v                                   v
+--------------+                   +---------------+                   +---------------+
|  Pass/Fail   |                   | GitHub Release|                   | Auto-Merged   |
| Status Check |                   |   & Tagged    |                   |   on Pass     |
+--------------+                   +---------------+                   +---------------+
                                           |
                                           v
                               +-----------------------+
                               |   Vercel Deployment   |
                               | (Filtered by vercel.json)|
                               +-----------------------+
```

---

## 1. Continuous Integration (CI) Workflow

File: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

The CI workflow acts as the quality gatekeeper for the codebase. It automatically runs on every `push` or `pull_request` targeting the `main` branch.

### Key Steps Performed:

1. **Checkout & Environment Setup**: Checks out the repository, initializes `pnpm v10`, and sets up Node.js `v20`.
2. **Prisma Generation (`pnpm db:generate`)**: Generates the Prisma Client types to verify database access code.
3. **Format Verification (`pnpm format:check`)**: Ensures all code adheres to Prettier formatting standards.
4. **Codebase Linting (`pnpm lint`)**: Verifies Next.js and React ESLint rules and unused imports.
5. **TypeScript Type Verification (`pnpm type-check`)**: Runs `tsc --noEmit` to ensure strict static type safety across all components and server handlers.

---

## 2. Automated Versioning & Release Pipeline

File: [`.github/workflows/release.yml`](../.github/workflows/release.yml)

Grova uses [`@changesets/cli`](https://github.com/changesets/changesets) to handle Semantic Versioning and automated release notes.

### The Two-Pass Release Process

Because GitHub prevents default `GITHUB_TOKEN` bots from triggering secondary workflows (to avoid infinite loops), the release pipeline handles two distinct states:

#### Pass 1: Pending Changesets Found

When developer commits containing changeset files (`.changeset/*.md`) are pushed to `main`:

1. The `changesets/action` step detects the unconsumed changesets.
2. It bumps the version in `package.json` and updates `CHANGELOG.md`.
3. It opens a **"Version Packages"** Pull Request (e.g., `chore(release): version packages`).
4. The workflow enables **Auto-Merge** on this release PR using your Personal Access Token (`GH_PAT`).

#### Pass 2: No Pending Changesets Found (Release Publishing)

Once the "Version Packages" PR is merged into `main`:

1. The workflow runs again.
2. `steps.changesets.outputs.hasChangesets` evaluates to `'false'`.
3. The **Publish GitHub Release** step executes:
   - Runs `pnpm run release` (`changeset tag`) to generate the `vX.X.X` tag locally.
   - Pushes the git tags to GitHub (`git push --follow-tags`).
   - Generates the formal GitHub Release with changelog notes using `gh release create`.

### Private Package Configuration

Because Grova's `package.json` contains `"private": true`, Changesets natively skips tagging unless explicitly configured. This is configured in [`.changeset/config.json`](../.changeset/config.json):

```json
{
  "access": "restricted",
  "baseBranch": "main",
  "privatePackages": {
    "version": true,
    "tag": true
  }
}
```

---

## 3. Dependabot & Auto-Merge Workflow

Files: [`.github/dependabot.yml`](../.github/dependabot.yml) and [`.github/workflows/dependabot-auto-merge.yml`](../.github/workflows/dependabot-auto-merge.yml)

Dependabot scans dependencies weekly for both standard `npm` packages and `github-actions`.

### Automated Auto-Merge Mechanism:

1. When Dependabot opens a Pull Request, `dependabot-auto-merge.yml` triggers.
2. It verifies the PR actor is `dependabot[bot]`.
3. It executes `gh pr merge --auto --merge`.
4. GitHub waits for all CI validation checks (`ci.yml`) to pass before automatically merging the PR and deleting the branch.

---

## 4. Vercel Deployment Optimization

File: [`vercel.json`](../vercel.json)

To prevent wasting Vercel build minutes on documentation updates, CI config changes, or markdown updates, Grova configures Vercel's **Ignored Build Step**:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "ignoreCommand": "git diff HEAD^ HEAD --quiet . ':!docs' ':!.github' ':!*.md'"
}
```

### How `ignoreCommand` Operates:

- Runs `git diff HEAD^ HEAD --quiet` while excluding `docs/`, `.github/`, and `*.md` files.
- If **only** excluded files are modified: exits with code `0` (build skipped).
- If application source files (`app/`, `components/`, `lib/`, etc.) are modified: exits with code `1` (build proceeds).

---

## 5. Developer Guide: How to Work with Changesets

When contributing new features, bug fixes, or breaking changes:

1. **Create a Changeset**:
   Run the interactive Changeset CLI in your terminal:

   ```bash
   pnpm change
   ```

   _(Or `npx changeset`)_

2. **Select Change Type**:
   - `patch`: Bug fixes or minor adjustments.
   - `minor`: New features (backwards-compatible).
   - `major`: Breaking changes.

3. **Enter Release Summary**:
   Provide a clear, user-facing summary of the changes.

4. **Commit the Changeset File**:
   Commit the generated `.changeset/<random-name>.md` file along with your code changes:
   ```bash
   git add .changeset/
   git commit -m "feat(analytics): add streak summary calculation"
   ```

---

## 6. Required Tokens & Repository Secrets

To ensure the automated release pipeline can auto-merge release PRs and push tags, set up a Fine-Grained Personal Access Token (PAT):

### Creating a Fine-Grained PAT (`GH_PAT`):

1. Go to GitHub -> **Profile Settings** -> **Developer Settings** -> **Personal Access Tokens** -> **Fine-grained tokens**.
2. Click **Generate new token**.
3. **Repository Access**: Select **Only select repositories** -> Select `Grova`.
4. **Permissions**:
   - `Contents`: **Read and write** (To push git tags and create GitHub Releases).
   - `Pull requests`: **Read and write** (To enable auto-merge on release PRs).
5. Copy the generated token string.

### Adding Secret to Repository:

1. Go to your repository settings -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Click **New repository secret**.
3. Set **Name**: `GH_PAT`.
4. Set **Secret**: Paste the copied token string.

---

## 7. Troubleshooting & FAQs

### Q: Why didn't a release generate after merging a feature PR?

**A**: Feature PRs do not immediately publish releases. Merging a feature PR triggers Changesets to create a **"Version Packages"** PR. The release is published once the "Version Packages" PR is merged into `main`.

### Q: Can I manually trigger a release?

**A**: Yes! Go to the GitHub repository **Actions** tab -> **Release Pipeline** -> Click **Run workflow**. If no changesets are pending, it will instantly run tag creation and publish the GitHub release.

### Q: Why did the release PR fail to auto-merge?

**A**: Check if `GH_PAT` repository secret is configured with valid `Contents: Read and Write` and `Pull Requests: Read and Write` permissions.

---
