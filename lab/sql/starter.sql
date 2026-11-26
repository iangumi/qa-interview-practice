-- Inspect the synthetic checkout data. Amounts are whole IDR.
SELECT order_id, customer_id, status, total_idr FROM orders ORDER BY order_id;
SELECT payment_id, order_id, status, amount_idr, recorded_at FROM payments ORDER BY payment_id;
SELECT request_id, http_status, returned_order_id FROM checkout_responses ORDER BY request_id;

-- 1. Find confirmed orders with no captured payment, including declined-only orders.
-- 2. Find orders with more than one captured payment.
-- 3. Find orders with exactly one capture whose amount differs from the order total.
-- 4. Return the latest payment attempt for each order with payment activity.
--    If timestamps tie, use the higher payment ID.
-- 5. Find 201 responses whose returned order ID is missing from the database.
