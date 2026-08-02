# Contributing to Grova

First off, thank you for considering contributing to **Grova**! It's people like you who make Grova a great tool for habit tracking, goal visualization, and developer productivity.

---

## 📜 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [How Can I Contribute?](#-how-can-i-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Enhancements](#suggesting-enhancements)
   - [Pull Requests](#pull-requests)
3. [Local Development Setup](#-local-development-setup)
4. [Commit Conventions](#-commit-conventions)
5. [Code Style & Quality](#-code-style--quality)

---

## 🤝 Code of Conduct

This project and everyone participating in it is governed by the [Grova Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [ranitmanik.dev@gmail.com](mailto:ranitmanik.dev@gmail.com).

---

## 💡 How Can I Contribute?

### Reporting Bugs

Bugs are tracked using GitHub Issues. Before creating a bug report:

- Check existing issues to see if the problem has already been reported.
- Ensure you can reproduce the issue using the latest `main` branch code.

When opening a bug report, please fill out our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.yml).

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub Issues. Provide:

- A clear, descriptive title.
- Step-by-step description of the proposed feature.
- Use cases explaining why this feature would be useful to Grova users.

Submit your idea using our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.yml).

### Pull Requests

1. Fork the repo and create your branch from `main`:
   ```bash
   git checkout -b feat/my-amazing-feature
   ```
2. Make your changes and write clean code following the project guidelines.
3. Run project validation commands before committing:
   ```bash
   pnpm validate
   ```
4. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat(goals): add category filter dropdown"
   ```
5. Push to your fork and submit a Pull Request targeting `main`.

---

## 💻 Local Development Setup

### Prerequisites

- **Node.js**: `v20.x` or higher
- **pnpm**: `v9.x` or `v10.x` (`npm i -g pnpm`)
- **PostgreSQL Database**: Neon serverless database or local PostgreSQL instance.

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/RanitManik/Grova.git
   cd Grova
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   Fill in required variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `AUTH_GITHUB_ID`, etc.).

4. **Initialize Database**:

   ```bash
   pnpm db:push
   ```

5. **Start Development Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💬 Commit Conventions

Grova enforces [Conventional Commits](https://www.conventionalcommits.org/) via Husky and Commitlint.

Commit messages must follow this structure:

```text
<type>(<optional scope>): <description>
```

### Supported Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of code (white-space, formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding or correcting tests
- `build`: Changes affecting build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

### Examples

- `feat(auth): integrate OAuth provider for Google`
- `fix(streak): prevent negative streak counter calculation`
- `docs(readme): add deployment instructions`

---

## 🎨 Code Style & Quality

- **TypeScript**: Strict mode enabled. Avoid `any` types.
- **Formatting**: Prettier is configured. Run `pnpm format` to auto-format.
- **Linting**: ESLint with Next.js & TypeScript rules. Run `pnpm lint`.
- **Pre-commit Hooks**: Husky automatically validates staged files before each commit.

---

Thank you for helping build **Grova**! 🚀
