# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nectivo is a Brazilian web application for a site-building service. It's an Angular 22 SSR application running on Cloudflare Workers via Hono, with Cloudflare D1 (SQLite) for persistence.

## Commands

```bash
npm install                    # install dependencies
npm run typecheck              # TypeScript type-check (no emit)
npm start                      # ng serve (dev server)
npm run preview                # build + wrangler dev (full SSR + API + local D1)
npm run deploy                 # build + wrangler deploy to Cloudflare

npm run db:local               # apply D1 migrations locally
npm run db:remote              # apply D1 migrations to remote Cloudflare D1
```

There are no tests or linter configured.

## Architecture

**Frontend (Angular 22):**
- `src/shared/plans.ts` — configuração comercial centralizada: as duas soluções (landing page e site institucional), preços, divisão do pagamento 50/50, itens do plano mensal, itens orçados à parte, regras de cancelamento e o número do WhatsApp. Ajuste preços e textos comerciais aqui.
- `src/app/app.ts` — layout raiz (`layout/site-header.ts`, `<router-outlet>`, `layout/site-footer.ts`)
- `src/app/app.routes.ts` — rotas: `/`, `/landing-page`, `/site-institucional`, `/como-funciona`, `/exemplos`, `/duvidas`, `/contato` (todas pré-renderizadas)
- `src/app/home/` — página inicial (hero + cards das duas soluções)
- `src/app/solution/solution.ts` — página de detalhes compartilhada; o slug da solução vem do `data` da rota
- `src/app/pages/` — como funciona, exemplos, dúvidas e contato
- `src/app/ui/page-intro.ts` — breadcrumb + título das páginas internas
- `src/app/ui/mockup-image.ts` — mockup da oficina com `srcset` (`public/mockup-oficina-{352,640}.webp` + `mockup-oficina.webp` de 1000px); usado no hero, nas páginas de detalhes e em exemplos. Cada uso define seu `sizes`.
- `public/logos/`, `public/icons/` — logos (claro/escuro) e favicons

O canal comercial é o WhatsApp (home → solução → detalhes → WhatsApp → proposta → contratação). Não há checkout, login ou painel administrativo.

**Backend (Hono on Cloudflare Workers):**
- `src/server.ts` — Hono app com `/api/health`, `/llms.txt` (gerado em `src/llms.ts` a partir de `plans.ts`) mais o catch-all de SSR do Angular. Exporta `reqHandler` para o dev-server do Angular CLI e um app Hono padrão para o Wrangler.
- `public/robots.txt` — arquivo estático
- `migrations/0001_init.sql` — schema D1 da tabela `orders` (mantida para uso futuro; sem rota que a utilize hoje)

**Build & Deploy:**
- `angular.json` — Angular CLI config with `@angular/build:application` builder, SSR platform set to `cloudflare`
- `wrangler.jsonc` — Wrangler config binding D1 database `nectivo` and pointing to the Angular SSR output
- `.postcssrc.json` — Tailwind CSS v4 via PostCSS

**Key conventions:**
- All prices are stored in cents (integers) in `src/shared/plans.ts`.
- Language is Portuguese (Brazilian) for UI strings and comments.
- TypeScript ~6.0.3 is required (Angular 22 does not support TS 7).
- Optimus UI (`@openng/optimus-ui`) provides the component library; `ng add @openng/optimus-ui` is needed only if adding new Optimus components.