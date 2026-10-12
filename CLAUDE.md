# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nectivo is a Brazilian web application for a site-building service. It's an Angular 22 SSR application running on Cloudflare Workers via Hono, with Cloudflare D1 (SQLite) for persistence.

## Commands

```bash
npm install                    # install dependencies
npm run typecheck              # TypeScript type-check (no emit)
npm start                      # ng serve (dev server, no D1 — API returns 503)
npm run preview                # build + wrangler dev (full SSR + API + local D1)
npm run deploy                 # build + wrangler deploy to Cloudflare

npm run db:local               # apply D1 migrations locally
npm run db:remote              # apply D1 migrations to remote Cloudflare D1
```

There are no tests or linter configured.

## Architecture

**Frontend (Angular 22):**
- `src/app/home/home.ts` — main landing page with pricing plans and checkout button
- `src/app/checkout/checkout-dialog.ts` — modal checkout form
- `src/app/checkout/orders.service.ts` — HTTP client for `/api/orders`
- `src/shared/plans.ts` — shared plan definitions, pricing logic, and types (`Plan`, `PlanId`, `Period`, `Pay`)

**Backend (Hono on Cloudflare Workers):**
- `src/server.ts` — Hono app with two API routes (`/api/health`, `POST /api/orders`) plus Angular SSR catch-all. Exports `reqHandler` for the Angular CLI dev-server and a default Hono app for Wrangler.
- `migrations/0001_init.sql` — D1 schema for the `orders` table

**Build & Deploy:**
- `angular.json` — Angular CLI config with `@angular/build:application` builder, SSR platform set to `cloudflare`
- `wrangler.jsonc` — Wrangler config binding D1 database `nectivo` and pointing to the Angular SSR output
- `.postcssrc.json` — Tailwind CSS v4 via PostCSS

**Key conventions:**
- All prices are stored and calculated in cents (integers). The server always computes totals; client-sent totals are never trusted.
- Language is Portuguese (Brazilian) for UI strings and comments.
- TypeScript ~6.0.3 is required (Angular 22 does not support TS 7).
- `@openng/icons` is pinned to `"latest"` — after `npm install`, fix it to a specific version.
- Optimus UI (`@openng/optimus-ui`) provides the component library; `ng add @openng/optimus-ui` is needed only if adding new Optimus components.