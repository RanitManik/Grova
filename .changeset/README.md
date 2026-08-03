# Changesets

Hello and welcome! This directory contains configuration and change files for [Changesets](https://github.com/changesets/changesets).

## Creating a Changeset

When submitting a pull request that introduces user-facing changes, bug fixes, or notable updates, please run:

```bash
pnpm change
# or
pnpm changeset
```

Follow the interactive prompts to select the change type (`patch`, `minor`, or `major`) and describe the changes. This will create a Markdown file inside `.changeset/`. Commit this file alongside your code changes.
