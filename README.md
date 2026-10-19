# Nectivo — Angular 22 SSR + Hono (Cloudflare Workers) + Tailwind v4 + Optimus UI + D1

Projeto completo (não é mais overlay). Gerado sem acesso à internet: **nada foi instalado nem compilado ainda**.

## Rodar
```bash
npm install
npx wrangler d1 create nectivo          # cole o database_id em wrangler.jsonc
npm run db:local                        # cria a tabela orders no D1 local
npm run preview                         # build + wrangler dev (SSR + API + D1)
```
- `npm start` (ng serve) mostra o site em modo de desenvolvimento.
- Optimus UI: `ng add @openng/optimus-ui` só é necessário se for usar os componentes dele (configura o tema).

## Publicar
```bash
npm run db:remote
npm run deploy
```

## Notas
- **TypeScript ~6.0.3**: o Angular 22 não aceita o TS 7.
- Angular 22 renomeou `ssr.experimentalPlatform` para `ssr.platform` (já em angular.json).
- Preços, regras comerciais e número do WhatsApp ficam em `src/shared/plans.ts`.
