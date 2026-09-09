# Contributing

Thanks for helping maintain this portfolio and its tools.

## Workflow

- Create a feature branch from `main`.
- Keep changes focused on the repository-quality work, not the visual design.
- Run the project checks before opening a pull request.

## Validation before opening a PR

```bash
node scripts/check.mjs
```

On Windows PowerShell, use `npm.cmd run check` if script execution is blocked.

This project is intentionally static. Avoid introducing frameworks, build steps, or redesign work unless a real reliability or maintainability fix requires it.

## Coding expectations

- Preserve the current website identity and content.
- Do not remove functionality or pages.
- Prefer small, safe fixes over large rewrites.
- Keep front-end logic simple and browser-compatible.

## Security rules

- Never commit secrets, credentials, API tokens, or private keys.
- Do not expose personal or service credentials in HTML, JavaScript, GitHub Actions, or documentation.
- If a real secret has been published, rotate it immediately and remove it from the repository history.

## Commit expectations

Use clear and professional commit messages. Examples:

- `chore: add repository validation`
- `ci: add automated quality checks`
- `docs: improve development workflow`
- `security: add secret scanning`
