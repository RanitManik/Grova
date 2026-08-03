# Changelog

## 1.0.0

### Major Changes

- 34dff08: # 🎉 Grova v1.0.0 - Initial Public Release

  Welcome to **Grova v1.0.0**, a modern, high-performance daily habit-building and goal-tracking SaaS platform. Grova transforms daily efforts into 365-day contribution heatmaps, streak analytics, and community accountability.

  ### 🌟 Key Features Included in v1.0.0
  - 🎯 **Flexible Goal Mechanics**: Support for `TOTAL_TARGET` (cumulative target), `DAILY_RECURRING`, and `WEEKLY_RECURRING` goals across categories (Work, Study, Health, Mindfulness, Finance, Creative, Social, Other).
  - 🟩 **Contribution Activity Heatmap**: 365-day interactive color-coded contribution grid displaying daily effort intensity levels.
  - 🔥 **Streak & Consistency Calculator**: Real-time calculations for current streak, longest streak, total contributions, and percentage completion rate.
  - 🔒 **Enterprise-Grade Authentication**: NextAuth.js (Auth.js v5) with Prisma adapter supporting GitHub and Google OAuth providers.
  - ⚡ **Database Architecture**: Prisma ORM v7 integration connected to Neon PostgreSQL serverless database.
  - 👥 **Social Accountability Feed**: Follow other users, view public activity feeds, and share achievement profile cards.
  - 🔔 **Notifications & Daily Quick Notes**: Real-time streak milestone alerts, goal risk notifications, and daily contextual quick notes.
  - 🚀 **Automated Release Pipeline**: Automated semver versioning, changelog generation, and GitHub Release pipeline powered by Changesets.

All notable changes to **Grova** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-08-02

### Added

- **Goal Tracking System**: Total Target, Daily Recurring, and Weekly Recurring goal engines.
- **Contribution Heatmap**: 365-day visual GitHub-style activity contribution graph with color-coded intensity levels.
- **Streak Calculator**: Real-time tracking of current streak, longest streak, total contributions, and percentage completion rate.
- **Authentication**: NextAuth.js (Auth.js v5) with Prisma adapter supporting GitHub and Google OAuth providers.
- **Database Architecture**: Prisma ORM v7 integration connected to Neon PostgreSQL serverless database.
- **Social Accountability**: Public user profile pages, follow/unfollow system, and explore feed.
- **Notifications & Quick Notes**: Real-time streak milestone alerts, goal risk notifications, and daily quick notes.
- **Community Standards & Infrastructure**:
  - Husky & Commitlint commit hooks (enforcing Conventional Commits).
  - GitHub Actions CI pipeline for automated linting, type-checking, and build validation.
  - Interactive issue templates (`bug_report.yml`, `feature_request.yml`), PR template, CODEOWNERS, SECURITY.md, CONTRIBUTING.md, and CODE_OF_CONDUCT.md.
  - Web App Manifest (`manifest.webmanifest`), OpenGraph metadata, JSON-LD structured data, and custom PNG/SVG/ICO favicons.
