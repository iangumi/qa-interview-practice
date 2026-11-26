-- 1. A declined payment does not satisfy the capture requirement.
SELECT o.order_id
FROM orders AS o
WHERE o.status = 'CONFIRMED'
  AND NOT EXISTS (
    SELECT 1 FROM payments AS p
    WHERE p.order_id = o.order_id AND p.status = 'CAPTURED'
  )
ORDER BY o.order_id;

-- 2. This checkout contract permits at most one capture per order.
SELECT order_id, COUNT(*) AS capture_count
FROM payments
WHERE status = 'CAPTURED'
GROUP BY order_id
HAVING COUNT(*) > 1
ORDER BY order_id;

-- 3. Isolate amount errors from missing and duplicate captures.
WITH captures AS (
  SELECT order_id, COUNT(*) AS capture_count, SUM(amount_idr) AS captured_idr
  FROM payments
  WHERE status = 'CAPTURED'
  GROUP BY order_id
)
SELECT o.order_id, o.total_idr, c.captured_idr
FROM orders AS o
JOIN captures AS c ON c.order_id = o.order_id
WHERE c.capture_count = 1 AND c.captured_idr <> o.total_idr
ORDER BY o.order_id;

-- 4. The payment ID makes the ordering deterministic when timestamps tie.
WITH ranked AS (
  SELECT order_id, payment_id, status,
         ROW_NUMBER() OVER (
           PARTITION BY order_id ORDER BY recorded_at DESC, payment_id DESC
         ) AS position
  FROM payments
)
SELECT order_id, payment_id, status
FROM ranked
WHERE position = 1
ORDER BY order_id;

-- 5. An API success response is evidence to reconcile with stored data.
SELECT r.request_id, r.returned_order_id
FROM checkout_responses AS r
LEFT JOIN orders AS o ON o.order_id = r.returned_order_id
WHERE r.http_status = 201 AND o.order_id IS NULL
ORDER BY r.request_id;
