# Lab · Debug a flaky save test

The fixture simulates a successful profile save with two response times. Both runs click the same button and wait for the same status. The starter passes at 20 ms and fails at 650 ms because it reads the status after a fixed 100 ms wait.

## Run

With Node.js 20 or later, run from the repository root:

```sh
cd lab
npm ci
npx playwright install chromium
npm run starter
```

The starter is expected to return a failing exit code. Look at the failed assertion, then open the attached trace using the command printed by Playwright. Confirm that the report shows **Saving…** at the time of the assertion.

## Solve

Update the assertion in `starter.spec.js` so it waits for the relevant application state. Keep both response-time cases and retries disabled. Compare the status shown before and after the operation when explaining your diagnosis.

```sh
npm run starter -- --repeat-each=5
npm run solution -- --repeat-each=5
```

After the fix, each command should pass ten tests. Explain how you would verify the change in CI using the same browser, runner, and worker settings as the original failure.

- [Playwright auto-retrying assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer-intro)
