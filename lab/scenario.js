import { readFile } from "node:fs/promises";

export const responseTimes = [20, 650];

export async function openProfile(page, responseTime) {
  const html = await readFile(new URL("./fixture.html", import.meta.url), "utf8");
  await page.setContent(html);
  await page.getByRole("form", { name: "Profile" }).evaluate((form, delay) => {
    form.dataset.delay = String(delay);
  }, responseTime);
}
