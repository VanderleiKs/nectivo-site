import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { Hono } from 'hono';
import { PLANS, totalCents, type Pay, type Period } from './shared/plans';

// Tipos mínimos do D1 (evita conflito entre @cloudflare/workers-types e DOM no build do Angular).
interface D1Database {
  prepare(sql: string): { bind(...v: unknown[]): { run(): Promise<unknown> } };
}
type Env = { Bindings: { DB?: D1Database } };

const app = new Hono<Env>();
const angular = new AngularAppEngine();

app.get('/api/health', (c) => c.json({ ok: true }));

app.post('/api/orders', async (c) => {
  const db = c.env?.DB;
  if (!db) return c.json({ error: 'db_unavailable' }, 503);

  const b = (await c.req.json().catch(() => null)) as Record<string, string> | null;
  const plan = PLANS.find((p) => p.id === b?.['plan']);
  const period = b?.['period'] as Period;
  const pay = b?.['pay'] as Pay;
  const name = b?.['name']?.trim() ?? '';
  const phone = b?.['phone']?.trim() ?? '';
  const email = b?.['email']?.trim() ?? '';

  const valid =
    plan && ['m', 'a'].includes(period) && ['pix', 'card', 'boleto'].includes(pay) &&
    !(pay === 'boleto' && period !== 'a') &&
    name.length > 1 && name.length <= 120 &&
    phone.replace(/\D/g, '').length >= 10 && phone.length <= 20 &&
    /^\S+@\S+\.\S+$/.test(email) && email.length <= 160;
  if (!valid) return c.json({ error: 'invalid_order' }, 400);

  // O total é sempre calculado no servidor; o valor do cliente nunca é usado.
  const total = totalCents(plan, period);
  const id = crypto.randomUUID();
  await db
    .prepare('INSERT INTO orders (id, plan, period, pay, name, phone, email, total_cents) VALUES (?,?,?,?,?,?,?,?)')
    .bind(id, plan.id, period, pay, name, phone, email, total)
    .run();

  return c.json({ id, totalCents: total }, 201);
});

app.get('*', async (c) => (await angular.handle(c.req.raw)) ?? c.text('Não encontrado', 404));

export default app;

// Usado pelo dev-server/build do Angular CLI.
export const reqHandler = createRequestHandler(app.fetch);
