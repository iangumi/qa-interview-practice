import { once } from "node:events";
import { createServer } from "node:http";

export async function startOrdersFixture({ persistExpress = false } = {}) {
  const orders = new Map();
  let nextId = 1;
  const server = createServer(async (request, response) => {
    const send = (status, body) => {
      response.writeHead(status, { "content-type": "application/json" });
      response.end(JSON.stringify(body));
    };
    if (request.method === "POST" && request.url === "/orders") {
      let payload;
      try {
        const chunks = [];
        for await (const chunk of request) chunks.push(chunk);
        payload = JSON.parse(Buffer.concat(chunks));
      } catch {
        send(400, { error: "Invalid JSON" });
        return;
      }
      if (typeof payload?.item !== "string" || !payload.item.trim() ||
          !Number.isInteger(payload.quantity) || payload.quantity < 1 ||
          !["standard", "express"].includes(payload.delivery)) {
        send(400, { error: "Invalid order" });
        return;
      }
      const order = {
        id: String(nextId++), item: payload.item, quantity: payload.quantity, delivery: payload.delivery,
      };
      if (order.delivery === "standard" || persistExpress) orders.set(order.id, order);
      send(201, order);
      return;
    }
    const getOrder = request.method === "GET" && request.url.match(/^\/orders\/(\d+)$/);
    const order = getOrder && orders.get(getOrder[1]);
    if (order) send(200, order);
    else send(404, { error: "Order not found" });
  });
  const ready = once(server, "listening");
  server.listen(0, "127.0.0.1");
  await ready;
  return {
    baseURL: "http://127.0.0.1:" + server.address().port,
    close: () => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())),
  };
}
