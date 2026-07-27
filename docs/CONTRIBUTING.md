# Contributing

Thanks for helping improve Web3 Intelligence Platform. This repository should stay honest, maintainable, and useful for real builders.

## Ground Rules

- Keep feature labels accurate: use `Implemented`, `Coming Soon`, `Planned`, or `Concept Preview` when appropriate.
- Prefer small pull requests with focused scope.
- Keep frontend changes responsive and accessible.
- Keep backend changes behind DTO validation and shared types where possible.
- Add tests for risky business logic, API behavior, and shared utilities.
- Do not commit secrets, RPC keys, `.env`, build output, or generated cache files.

## Development Workflow

```bash
corepack enable
pnpm install
cp .env.example .env
pnpm docker:up
pnpm db:generate
pnpm db:push
pnpm db:seed
pnpm dev
```

Before opening a PR:

```bash
pnpm lint
pnpm test
pnpm build
```

## Pull Request Checklist

- [ ] The change has a clear issue, bug, or product reason.
- [ ] Public claims match the actual implementation status.
- [ ] UI states cover loading, empty, error, and mobile where relevant.
- [ ] API inputs are validated.
- [ ] Docs are updated for new commands, endpoints, or environment variables.
- [ ] Tests were added or the reason for no tests is explained.

## Commit Style

Use concise conventional commits when practical:

```text
feat(frontend): add portfolio analytics page
fix(api): validate wallet chain ids
docs: document deployment checklist
```

## Good First Issues

Suggested labels are defined in `.github/labels.yml`. Good first issue candidates:

- Improve copy or docs clarity
- Add focused component tests
- Add loading and empty states
- Improve mobile spacing on a specific page
- Add a small API DTO validation case

## Code Review Expectations

Reviews should focus on correctness, maintainability, security, accessibility, and whether the project is making honest claims about what is implemented.
