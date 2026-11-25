import assert from "node:assert/strict";
import { test } from "node:test";
import { startOrdersFixture } from "./fixture.mjs";

for (const delivery of ["standard", "express"]) {
  test(`reports a created ${delivery} order`, async t => {
    const { baseURL, close } = await startOrdersFixture();
    t.after(close);
    const response = await fetch(baseURL + "/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ item: "notebook", quantity: 2, delivery }),
    });
    assert.equal(response.status, 201);
    const order = await response.json();
    assert.match(order.id, /^\d+$/);
    // Add an independent check that the returned order was actually saved.
  });
}
