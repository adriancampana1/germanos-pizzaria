# Google Analytics GA4 Integration — Design

**Date:** 2026-06-25
**Status:** Approved

## Goal

Add Google Analytics 4 tracking to the Germano's Pizzaria site using the current,
officially recommended Next.js method — no deprecated libraries or legacy methods.

## Context

- **Stack:** Next.js 16.2.2, React 19, App Router.
- **Output:** `output: "export"` (static export) served by nginx. Build runs inside
  Docker in CI (`RUN npm run build`); there is no runtime environment, so any
  `NEXT_PUBLIC_*` value is inlined at build time.
- **Existing analytics:** A self-hosted Umami script is already injected in
  `src/app/layout.tsx` via `next/script` with a hardcoded `data-website-id`. GA4
  coexists with it.

## Decision

Use the first-party `@next/third-parties/google` `GoogleAnalytics` component — the
method recommended by the official Next.js docs. It loads `gtag.js` client-side via
`next/script` after hydration, which is compatible with `output: "export"`.

Rejected alternatives:
- `react-ga` / `react-gtag` and similar wrappers — deprecated, not used.
- Manual `gtag.js` via `next/script` — works, but more manual code than the
  official component; no benefit here.

The GA Measurement ID is **hardcoded**, not stored in an env var. Rationale:
- The ID (`G-WT7KD8MSJK`) is public — it ships in the static client JS regardless.
- Consistent with the existing hardcoded Umami website ID in the same file.
- A `NEXT_PUBLIC_GA_ID` env var would require a Docker build `ARG`/`ENV` plus a
  GitHub Actions build-arg, for zero security benefit.

## Implementation

1. Install dependency matched to Next 16: `npm i @next/third-parties@16`.
2. In `src/app/layout.tsx`:
   - `import { GoogleAnalytics } from "@next/third-parties/google"`.
   - Render `<GoogleAnalytics gaId="G-WT7KD8MSJK" />` inside `<html>`, after
     `<body>` (per official docs). Leave the existing Umami `<Script>` untouched.

## Verification

- `npm run build` completes without errors.
- After deploy, confirm hits appear in GA4 Realtime report.

## Out of scope

- Custom event tracking (`sendGAEvent`) — page views only for now.
- Consent/cookie banner (LGPD) — noted as possible follow-up, not in this change.
