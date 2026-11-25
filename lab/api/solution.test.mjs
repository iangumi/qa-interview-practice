import assert from "node:assert/strict";
import { test } from "node:test";
import { startOrdersFixture } from "./fixture.mjs";

for (const delivery of ["standard", "express"]) {
  test(`saves and retrieves a ${delivery} order`, async t => {
    const { baseURL, close } = await startOrdersFixture({ persistExpress: process.env.FIXED_ORDERS === "1" });
    t.after(close);
    const input = { item: "notebook", quantity: 2, delivery };
    const response = await fetch(baseURL + "/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    assert.equal(response.status, 201);
    const created = await response.json();
    assert.match(created.id, /^\d+$/);
    assert.deepEqual(created, { id: created.id, ...input });

    const lookup = await fetch(baseURL + "/orders/" + created.id);
    const stored = await lookup.json();
    assert.equal(lookup.status, 200, `GET order ${created.id}: ${JSON.stringify(stored)}`);
    assert.deepEqual(stored, { id: created.id, ...input });
  });
}
