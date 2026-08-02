<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git Commit Message Standards

When generating git commit messages, enforce strict **Conventional Commits**:

Format:
`<type>(<optional scope>): <imperative description>`

Rules:

1. `<type>` must be one of: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
2. Keep the first line concise (under 72 characters).
3. Use lowercase for type, scope, and description.
4. Do NOT end the subject line with a period.
5. Use the imperative mood (e.g., "add deployment guide" rather than "added deployment guide").

Examples:

- `docs(deployment): add self-hosting guide and update README links`
- `feat(goals): add category filter dropdown`
- `fix(streak): correct streak calculation on missing days`
- `chore(deps): update prisma client to 7.9.1`
