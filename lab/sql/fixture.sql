PRAGMA foreign_keys = ON;

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('CONFIRMED', 'PENDING')),
  total_idr INTEGER NOT NULL CHECK (total_idr >= 0)
);

CREATE TABLE payments (
  payment_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(order_id),
  status TEXT NOT NULL CHECK (status IN ('CAPTURED', 'DECLINED')),
  amount_idr INTEGER NOT NULL CHECK (amount_idr >= 0),
  recorded_at TEXT NOT NULL
);

-- An independent snapshot of API responses can refer to a missing order.
CREATE TABLE checkout_responses (
  request_id TEXT PRIMARY KEY,
  http_status INTEGER NOT NULL,
  returned_order_id INTEGER
);

INSERT INTO orders VALUES
  (101, 1, 'CONFIRMED', 100000),
  (102, 2, 'CONFIRMED', 75000),
  (103, 2, 'CONFIRMED', 50000),
  (104, 3, 'CONFIRMED', 120000),
  (105, 4, 'PENDING', 60000),
  (106, 4, 'CONFIRMED', 90000);

INSERT INTO payments VALUES
  (201, 101, 'CAPTURED', 100000, '2026-01-10T09:00:00Z'),
  (202, 103, 'CAPTURED', 50000, '2026-01-10T09:02:00Z'),
  (203, 103, 'CAPTURED', 50000, '2026-01-10T09:03:00Z'),
  (204, 104, 'CAPTURED', 115000, '2026-01-10T09:04:00Z'),
  (205, 105, 'DECLINED', 60000, '2026-01-10T09:05:00Z'),
  (206, 106, 'DECLINED', 90000, '2026-01-10T09:06:00Z'),
  (207, 106, 'CAPTURED', 90000, '2026-01-10T09:06:00Z'),
  (208, 102, 'DECLINED', 75000, '2026-01-10T09:07:00Z');

INSERT INTO checkout_responses VALUES
  ('req-01', 201, 101),
  ('req-02', 201, 108),
  ('req-03', 400, NULL),
  ('req-04', 201, 106);
