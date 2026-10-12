CREATE TABLE IF NOT EXISTS orders (
  id          TEXT PRIMARY KEY,
  plan        TEXT NOT NULL,
  period      TEXT NOT NULL CHECK (period IN ('m','a')),
  pay         TEXT NOT NULL CHECK (pay IN ('pix','card','boleto')),
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL,
  total_cents INTEGER NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending',
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status, created_at);
