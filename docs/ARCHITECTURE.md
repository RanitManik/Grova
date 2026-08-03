# Grova System Architecture & Technical Design

This document provides a deep dive into **Grova's** software architecture, technical stack decisions, database schema design, and client/server component boundaries.

---

## Table of Contents

- [1. High-Level System Architecture](#1-high-level-system-architecture)
- [2. Component & Rendering Strategy](#2-component--rendering-strategy)
- [3. Database Design & Streak Engine](#3-database-design--streak-engine)
- [4. Authentication & Security Middleware](#4-authentication--security-middleware)
- [5. API Routing & Data Fetching](#5-api-routing--data-fetching)
- [6. Styling & Design System](#6-styling--design-system)

---

## 1. High-Level System Architecture

Grova is built as a full-stack web application using **Next.js 16 (App Router)** hosted on **Vercel**, backed by a serverless **Neon PostgreSQL** database managed with **Prisma ORM v7**.

```
+-----------------------------------------------------------------------+
|                             Client Browser                            |
| (React 19, Tailwind CSS v4, Framer Motion, Radix UI Primitives, Lucide)|
+-----------------------------------------------------------------------+
                                   |
                       HTTP / HTTPS (NextAuth JWT)
                                   |
                                   v
+-----------------------------------------------------------------------+
|                         Next.js App Router Server                     |
|  - Middleware (`proxy.ts` - Auth Route Guards)                        |
|  - Server Components (Direct Async Data Fetching)                     |
|  - Client Components ("use client" for Interactivity & State)          |
|  - REST API Route Handlers (`app/api/...`)                            |
+-----------------------------------------------------------------------+
                                   |
                         Prisma ORM Client (`@/lib/db`)
                                   |
                                   v
+-----------------------------------------------------------------------+
|                        Neon Serverless PostgreSQL                     |
|  - Connection Pooling (`DATABASE_URL`) for Web Requests               |
|  - Direct Connection (`DIRECT_URL`) for Schema Migrations             |
+-----------------------------------------------------------------------+
```

---

## 2. Component & Rendering Strategy

Grova strictly enforces **React Server Components (RSC) by default**:

- **Server Components (`app/(protected)/.../page.tsx`)**:
  - Perform direct database queries using `db` from `@/lib/db`.
  - Validate authenticated sessions using `await auth()`.
  - Pass initial props to interactive client components.
  - Eliminate unnecessary API waterfalls and reduce client-side bundle sizes.

- **Client Components (`"use client"`)**:
  - Used strictly for interactive UI elements: forms, modals, tabs, drag-and-drop elements, toasts, and Framer Motion micro-animations.
  - State is localized to the component or managed using standard React Hooks (`useState`, `useTransition`, `useOptimistic`).

---

## 3. Database Design & Streak Engine

The core value of Grova lies in its visual heatmaps and real-time streak calculations.

### Denormalized Counter Pattern

To optimize read performance for public profile pages and dashboards, key metrics are stored as denormalized fields on the `User` and `Goal` models:

```prisma
model User {
  id                 String   @id @default(cuid())
  currentStreak      Int      @default(0)
  longestStreak      Int      @default(0)
  totalContributions Int      @default(0)
  completionRate     Float    @default(0)
  // ...
}

model Goal {
  id              String   @id @default(cuid())
  completedAmount Float    @default(0)
  // ...
}
```

### Streak & Contribution Calculation Logic

Located in [`lib/utils.ts`](../lib/utils.ts):

1. **Daily Activity Aggregation**: Converts daily completion logs into date-mapped intensity values (0–4 scale).
2. **Consecutive Days Calculation**: Iterates backwards from today (allowing a 1-day grace period for incomplete current days) to determine active streak counts.
3. **Longest Streak Retention**: Atomically updates `longestStreak` whenever `currentStreak` exceeds the historic maximum.

---

## 4. Authentication & Security Middleware

- **Engine**: [NextAuth.js v5 (Auth.js)](../auth.ts) with `@auth/prisma-adapter`.
- **Supported Providers**: GitHub OAuth & Google OAuth.
- **Session Strategy**: JWT session tokens with server-side validation.
- **Route Protection Middleware**: [`proxy.ts`](../proxy.ts) intercepts incoming requests to guarded route groups (`/(protected)/dashboard`, `/(protected)/goals`, `/(protected)/analytics`, `/(protected)/settings`) and redirects unauthenticated requests to `/login`.

---

## 5. API Routing & Data Fetching

API endpoints are implemented as Next.js Route Handlers (`app/api/...`):

- **Data Validation**: Every API payload is validated against a **Zod** schema prior to executing database operations.
- **Session Verification**: Route handlers authenticate requests using `const session = await auth()`. Unauthenticated requests return `401 Unauthorized`.
- **Response Format**: Standardized JSON payload responses (`{ data, error, message }`).

---

## 6. Styling & Design System

- **Utility Engine**: [Tailwind CSS v4](../app/globals.css) with PostCSS.
- **Atomic Components**: Located in [`components/ui/`](../components/ui/) built on top of accessible **Radix UI** primitives (`Dialog`, `DropdownMenu`, `Popover`, `Tabs`, `Avatar`).
- **Class Merging Helper**: Always use `cn()` from `@/lib/utils` (`clsx` + `tailwind-merge`) for conditional class composition.
- **Icons**: Icons are imported exclusively from `lucide-react`.

---
