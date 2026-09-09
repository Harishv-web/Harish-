# Harish V Portfolio

This repository contains a static portfolio website for Harish V, including the personal landing page, free digital tools, games, an identity page, and a PWA/offline installation flow.

## Repository baseline

The current site is intentionally static and deployable on GitHub Pages or any static hosting provider. It is built using plain HTML, CSS, and JavaScript with no framework migration. The existing design and branding are preserved.

## Project structure

- `index.html` — main portfolio homepage
- `free-services.html` — free browser tools and website studio
- `games.html` — browser games
- `dashboard.html` — private analytics dashboard (requires access key)
- `styles.css` — shared styling and layouts
- `site.js` — common landing-page behavior, translations, and PWA logic
- `tools.js` — free services tools and interactions
- `games.js` — game logic and local score storage
- `dashboard.js` — private dashboard logic
- `manifest.webmanifest` — installable PWA manifest
- `sw.js` — service worker for offline caching
- `CNAME` — custom domain configuration for deployment
- `robots.txt` and `sitemap.xml` — SEO and crawler directives

## Local development

Because this is a static website, no dependency installation or build step is required for normal local editing.

Open the project in a browser directly or serve it locally with a simple static server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

## Validation

Run the repository quality checks with:

```bash
node scripts/check.mjs
```

On Windows PowerShell, if script execution is restricted, use:

```powershell
npm.cmd run check
```

Useful focused commands:

```bash
node scripts/check.mjs --html
node scripts/check.mjs --css
node scripts/check.mjs --js
node scripts/check.mjs --links
node scripts/check.mjs --security
```

## CI and automation

The GitHub Actions workflow runs on pushes and pull requests to `main` and executes the static validation suite. It checks for malformed HTML, invalid asset references, JS syntax issues, missing project files, and obvious secret exposure patterns.

## Deployment

This project remains compatible with static hosting and GitHub Pages. The deployment configuration is intentionally simple and should continue to work without introducing a framework or server-side build step.

## PWA and offline behavior

- `manifest.webmanifest` defines the installable app metadata.
- `sw.js` caches the main site assets after an online visit so the pages remain usable offline.
- The network speed test and external services still require live network access by design.

## Security expectations

- No secrets or private credentials should be added to the repository.
- Frontend values that are intentionally public are allowed.
- Real tokens, API keys, private keys, or deployment credentials must never be committed.

## Contributing

See `CONTRIBUTING.md` for workflow, security, and validation expectations.

## Security reporting

See `SECURITY.md` for the private disclosure policy.
