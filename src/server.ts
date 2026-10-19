import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { Hono } from 'hono';
import { llmsTxt } from './llms';

// O canal comercial é o WhatsApp: não há checkout nem API de pedidos nesta fase.
// A tabela `orders` (migrations/0001_init.sql) foi mantida para uso futuro.
const app = new Hono();
const angular = new AngularAppEngine();

app.get('/api/health', (c) => c.json({ ok: true }));

app.get('/llms.txt', (c) => c.text(llmsTxt(new URL(c.req.url).origin)));

app.get('*', async (c) => (await angular.handle(c.req.raw)) ?? c.text('Não encontrado', 404));

export default app;

// Usado pelo dev-server/build do Angular CLI.
export const reqHandler = createRequestHandler(app.fetch);
