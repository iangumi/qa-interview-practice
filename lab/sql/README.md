# SQL lab · Reconcile checkout records

The SQLite fixture contains six synthetic orders, eight payment attempts, and four API responses. All amounts are whole IDR. The checkout contract allows at most one captured payment per order, and a successful create response must reference a stored order. Payment attempts can be declined. All timestamps use UTC.

From the repository root, use SQLite 3.25 or later:

```sh
sqlite3 -header -column -cmd '.read lab/sql/fixture.sql' :memory: < lab/sql/starter.sql
```

Add your queries in `starter.sql` and rerun the command. Each run starts with the same data in memory. When you are ready to check your work, substitute `lab/sql/solution.sql` for `lab/sql/starter.sql`.

| Check | Expected result |
|---|---|
| Confirmed orders without a capture | Order 102 |
| More than one capture | Order 103, two captures |
| Single capture with a wrong amount | Order 104, expected Rp120,000 and captured Rp115,000 |
| Latest attempt for each order with payment activity | Payment IDs 201, 208, 203, 204, 205, 207 in order ID order |
| HTTP 201 with a missing order | Request req-02, order 108 |

For each anomaly, write the expected invariant, the observed row, and one follow-up check. For example, verify whether an API response was captured before the write became visible when the production contract allows eventual consistency.

[SQLite window functions](https://www.sqlite.org/windowfunctions.html) · [SQLite foreign keys](https://www.sqlite.org/foreignkeys.html)
