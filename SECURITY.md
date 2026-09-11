# Security Policy

## Reporting a vulnerability

If you discover a security issue in this project, please report it privately.

- Do not open a public issue for a suspected vulnerability.
- Report the issue using a private channel or the repository's responsible disclosure contact.
- Include the relevant file, reproduction steps, impact, and any evidence that helps confirm the issue.

## Responsible handling

We will review the report, assess the risk, and work on a safe fix as quickly as possible. If a real credential or security issue is found, we will rotate or revoke that credential and remove the exposed value from the repository history when appropriate.

## No-secret policy

This repository must not contain secrets or environment-specific credentials. Public frontend values such as website URLs or contact details are acceptable when intentionally published. Private tokens, API keys, password material, and cloud credentials are never acceptable in source control.

## Frontend dashboard security note

The public site and the private dashboard are static frontend assets. The dashboard access flow is browser-enforced only; the repository does not include the backend authorization layer for the worker endpoint. In other words, backend authorization is not fully verifiable from this repository alone and must be enforced by the Cloudflare Worker or hosting service before any sensitive dashboard data is treated as protected.

The site minimizes sensitive client-side storage by keeping the dashboard access key in memory only while a tab is open. It does not persist the key in localStorage or sessionStorage.
