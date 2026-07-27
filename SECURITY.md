# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| `0.1.x` | Yes       |

## Reporting a Vulnerability

Please report security vulnerabilities privately to the maintainers. Do not create public GitHub issues for security-sensitive reports.

Include:

- Affected component or endpoint
- Reproduction steps
- Expected impact
- Suggested remediation, if known

The project does not request, handle, or store private keys. If a change introduces private key handling, it should be rejected unless the architecture is explicitly redesigned and reviewed.

## Security Baseline

- Keep secrets in environment variables.
- Do not commit `.env` files or RPC keys.
- Use HTTPS in production.
- Use SSL for hosted PostgreSQL and Redis.
- Keep CORS restricted to trusted frontend origins.
- Rotate JWT and provider credentials regularly.
- Treat all on-chain metadata as untrusted input.
