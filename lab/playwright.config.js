import { defineConfig } from "@playwright/test";

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: ".",
  retries: 0,
  use: {
    trace: "retain-on-failure",
    launchOptions: executablePath ? { executablePath } : {},
  },
});
