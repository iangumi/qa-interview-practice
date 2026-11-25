import { expect, test } from "@playwright/test";
import { openProfile, responseTimes } from "./scenario.js";

for (const responseTime of responseTimes) {
  test(`reports a successful save after ${responseTime} ms`, async ({ page }) => {
    await openProfile(page, responseTime);
    await page.getByRole("button", { name: "Save profile" }).click();
    await expect(page.getByRole("status")).toHaveText("Profile saved");
  });
}
