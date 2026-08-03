# Grova Project Governance

This document outlines the governance model, maintainer responsibilities, and decision-making processes for **Grova**.

---

## 👥 Roles & Responsibilities

### Project Lead / Benevolent Dictator (BDFL)

- **Lead Maintainer**: [Ranit Manik](https://github.com/RanitManik) ([ranitmanik.dev@gmail.com](mailto:ranitmanik.dev@gmail.com))
- **Responsibilities**: Sets the vision and strategic direction of Grova, oversees core architectural decisions, manages release tags, and maintains final decision-making authority over pull requests.

### Maintainers & Contributors

- **Contributors**: Anyone in the community who submits code, documentation, bug reports, feature requests, or provides code reviews.
- **Responsibilities**: Adhere to the [Code of Conduct](../CODE_OF_CONDUCT.md) and [Community Standards](../docs/COMMUNITY_STANDARDS.md).

---

## 🗣️ Decision-Making Process

1. **Feature Proposals**: Proposed features are discussed in GitHub Issues using the Feature Request template or in GitHub Discussions.
2. **Consensus Seeking**: Maintainers work to build consensus among contributors regarding design implementation, schema alterations, and API contracts.
3. **Tie-Breaking**: In the event of an unresolved technical conflict or architectural disagreement, the Project Lead makes the final decision.

---

## 📦 Release Management

Releases follow [Semantic Versioning (SemVer)](https://semver.org/) and are governed using [Changesets](https://github.com/changesets/changesets). Every user-facing feature or fix merged into `main` requires a changeset entry, which triggers automated release notes and GitHub release tagging upon approval.

---
