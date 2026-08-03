# Grova Community Standards & Contribution Guidelines

This document outlines the operational guidelines, code review expectations, quality standards, and security principles required when participating in the **Grova** open-source project.

---

## Table of Contents

- [1. Quality & Code Review Checklist](#1-quality--code-review-checklist)
- [2. Architectural Rules & Constraints](#2-architectural-rules--constraints)
- [3. Git & Branching Strategy](#3-git--branching-strategy)
- [4. Pull Request Review Process](#4-pull-request-review-process)
- [5. Security & Vulnerability Reporting](#5-security--vulnerability-reporting)
- [6. Community Governance & Moderation](#6-community-governance--moderation)

---

## 1. Quality & Code Review Checklist

Before submitting a Pull Request or approving a code contribution, verify that the submission satisfies the project's QA checklist:

- [ ] **Type Safety**: TypeScript strict mode passed without any `any` types or implicit coercion (`pnpm type-check`).
- [ ] **Code Formatting**: Code is formatted with Prettier (`pnpm format`).
- [ ] **Linting Standards**: ESLint rules pass without warnings or unused imports (`pnpm lint`).
- [ ] **Tailwind Class Order**: Class utility strings use canonical order (`pnpm format:tailwind`).
- [ ] **Build Validation**: Production build succeeds cleanly (`pnpm build`).
- [ ] **Validation Script**: The comprehensive QA script passes (`pnpm validate`).

---

## 2. Architectural Rules & Constraints

Contributors must adhere to the following core engineering rules:

1. **Server Components First**: Keep React components as Server Components by default. Include `"use client"` only when managing state, browser hooks, or event listeners.
2. **Database Imports**: Import Prisma singleton exclusively from `@/lib/db`. Do not instantiate multiple `PrismaClient` instances.
3. **Icons**: Icons must be imported exclusively from `lucide-react`.
4. **Conditional Styling**: Conditional CSS utility classes must be wrapped with the `cn()` helper from `@/lib/utils`.
5. **Form Validation**: All client and API route inputs must be validated using **Zod** schemas.
6. **No Raw SQL Strings**: Use Prisma ORM query builders to prevent SQL injection vulnerabilities.

---

## 3. Git & Branching Strategy

Grova follows a structured Git workflow:

- `main`: Production-ready branch. All releases are generated from `main`.
- `dev`: Active integration branch for upcoming features and bug fixes.
- `feat/<feature-name>`: Topic branch for new features.
- `fix/<bug-name>`: Topic branch for bug fixes.
- `docs/<doc-name>`: Topic branch for documentation updates.

### Conventional Commit Standards

All commit messages must comply with the [Conventional Commits](https://www.conventionalcommits.org/) format:

```text
<type>(<scope>): <description>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

---

## 4. Pull Request Review Process

### PR Guidelines:

1. **Title**: Use conventional commit format (e.g., `feat(goals): add category filter dropdown`).
2. **Description**: Use the provided [PR Template](../.github/PULL_REQUEST_TEMPLATE.md) to document changes, motivation, and verification steps.
3. **Changeset**: Include a changeset file (`pnpm change`) for any user-facing feature or bug fix.
4. **Automated Verification**: GitHub Actions CI must pass 100% of required checks.

### Review SLA:

Maintainers aim to review incoming PRs within **48 hours**. Constructive, respectful, and clear feedback is expected from all reviewers.

---

## 5. Security & Vulnerability Reporting

Security is a top priority for Grova.

- **Reporting Security Issues**: Please **do not** open a public GitHub Issue for security vulnerabilities. Instead, refer to our [Security Policy](../.github/SECURITY.md) or email [ranitmanik.dev@gmail.com](mailto:ranitmanik.dev@gmail.com).
- **Environment Variables**: Never commit secrets, API keys, or database credentials (`.env` files) to Git.

---

## 6. Community Governance & Moderation

Grova is dedicated to providing a safe, inclusive, and welcoming environment for everyone.

- **Code of Conduct**: All interactions across issues, PRs, and discussions are governed by the [Grova Code of Conduct](../CODE_OF_CONDUCT.md).
- **Enforcement**: Project maintainers have the authority to edit, close, or remove comments or contributions that violate community standards.

---
