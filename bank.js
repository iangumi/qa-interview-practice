export const questions = [
  {
    "id": 1,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "Can you walk me through your overall experience in automation testing and the technical skills you have acquired?",
    "answer": [
      {
        "text": "Use a 60–90 second structure. “I currently work on [product or learning project]. I owned [quality responsibility], used [tools or techniques] to address [risk], and observed [verified result or evidence]. I’m looking for [role or kind of work].” A portfolio project is a valid example when described as such."
      }
    ]
  },
  {
    "id": 2,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "Can you describe your most recent project, including its business domain, architecture, team structure and responsibilities?",
    "answer": [
      {
        "text": "Explain the user journey, relevant components and data boundaries, the people you collaborated with, and the outcomes you personally owned. Example framework: “[Users] needed [outcome]. The flow involved [UI/API/system]. I worked with [roles] and owned [coverage, automation or release decision]. We validated it by [evidence].” Use a training or portfolio project if that is your closest example."
      }
    ]
  },
  {
    "id": 3,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "What automation frameworks and tools have you worked with, and what is your hands-on experience with Playwright?",
    "answer": [
      {
        "text": "Name only tools you have actually used and connect each one to a task. “I used [framework] to [build or improve checks] and [runner or CI] to execute them. For browser testing, I implemented [one locator, assertion or fixture].” If your browser experience is in another tool, explain the transferable design and identify any Playwright practice separately."
      }
    ]
  },
  {
    "id": 4,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "Which programming languages have you used for automation scripting?",
    "answer": [
      {
        "text": "Name the languages you used and give one example of what you built or maintained in each, such as Java for a shared page object, Python for API setup, or JavaScript for a browser test. Distinguish work experience, portfolio practice and familiarity."
      }
    ]
  },
  {
    "id": 5,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "How many test cases have you automated in your current or previous projects, and how long does the execution typically take?",
    "answer": [
      {
        "text": "Give the counts and timings you can verify. “I added or maintained [number] scenarios in [scope]. A comparable run took [wall-clock duration] on [runner and concurrency].” Separate personal contribution from suite size and queue time from execution time. If records are unavailable, explain what report you would use to measure it."
      }
    ]
  },
  {
    "id": 6,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "Can you provide a specific project example describing the number of test cases automated and their execution time?",
    "answer": [
      {
        "text": "Choose one suite or project. Describe the business risk, the scenario selection, the execution setup and one verified run or before-and-after result. Give counts and durations only if you have records. A small portfolio suite can demonstrate the same reasoning if its scope is stated."
      }
    ]
  },
  {
    "id": 7,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "What are the major challenges you have faced while working with Playwright, and how did you overcome them?",
    "answer": [
      {
        "text": "Use symptom, evidence, fix and verification. Example: a result appeared late after a search. The trace showed the assertion read the state before rendering finished. Switching to a stable result locator and a retrying assertion addressed the timing dependency. Explain how you checked repeated runs. Label this as a hypothetical if it isn’t your experience."
      }
    ]
  },
  {
    "id": 8,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "What recent features or enhancements have you implemented in your Playwright automation framework?",
    "answer": [
      {
        "text": "Choose a change you can explain, such as fixture-based data setup, API seeding or improved failure evidence. Describe the original pain, your contribution and what the result showed. If you haven’t contributed to a production Playwright suite, describe a lab improvement or walk through the design you would propose."
      }
    ]
  },
  {
    "id": 9,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "Have you created an automation framework from scratch? If so, can you explain the process and architecture?",
    "answer": [
      {
        "text": "State which parts you built or led, such as runner configuration, fixtures, reporting or CI. Walk through a representative journey, then explain which abstractions you introduced as the suite grew. If you extended an existing framework, explain your design contribution and outline how you would start a fresh one."
      }
    ]
  },
  {
    "id": 10,
    "topic": "Professional Experience & Project Discussion",
    "prompt": "Have you prepared a test strategy document? What key sections did you include?",
    "answer": [
      {
        "text": "Use a real strategy if available, or label your answer a proposed approach. Cover scope, risks, test levels, environments and data, ownership, release criteria and reporting. Give one example where a risk led you to choose a different test layer or allocate more time to a workflow."
      }
    ]
  },
  {
    "id": 11,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "What is Playwright, and what are its key features?",
    "answer": [
      {
        "text": "Playwright is a browser automation library with support for Chromium, Firefox and WebKit. Key capabilities include isolated browser contexts, auto-waiting locators, network control and tracing. The JavaScript/TypeScript Playwright Test runner adds fixtures, projects, parallel execution and reporting."
      }
    ]
  },
  {
    "id": 12,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "What are the major differences between Playwright and Selenium?",
    "answer": [
      {
        "text": "Selenium uses the WebDriver standard and has a mature ecosystem for browser, language and grid coverage. Playwright provides browser contexts, built-in locator actionability checks and integrated tracing. Choose based on the browsers and platforms you need, the team’s stack, existing infrastructure and the cost of migrating stable tests."
      }
    ]
  },
  {
    "id": 13,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "How does Playwright’s architecture work?",
    "answer": [
      {
        "text": "The client library sends automation commands to Playwright’s browser-control layer. A browser can host multiple isolated contexts, and each context can contain several pages. In Playwright Test, workers are separate OS processes. The standard fixtures usually reuse a browser per worker and create a clean context and page for each test."
      }
    ]
  },
  {
    "id": 14,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "What is the difference between a Browser, BrowserContext and Page in Playwright?",
    "answer": [
      {
        "text": "A Browser is the browser instance or connection. A BrowserContext is an isolated session with its own cookies and storage. A Page represents a tab or popup in that context. Multiple pages in one context can share the session, subject to normal origin and storage rules."
      }
    ]
  },
  {
    "id": 15,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "How does a browser context work in Playwright?",
    "answer": [
      {
        "text": "Create a context with browser.newContext(), set options such as locale or initial storage state, and open one or more pages. Contexts isolate browser-side session data. Close manually created contexts in teardown. Separate contexts can still affect the same backend records, so give write tests isolated data."
      }
    ]
  },
  {
    "id": 16,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "How do you handle multiple users using separate browser contexts in Playwright?",
    "answer": [
      {
        "text": "Create one context per role and load the corresponding authentication state. Open a page from each context, perform actions as separate users, and assert the result in the appropriate session. For an approval test, create a request as the submitter and approve it as the reviewer, using one unique request ID."
      }
    ]
  },
  {
    "id": 17,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "What is the difference between locators and selectors in Playwright?",
    "answer": [
      {
        "text": "A selector is a matching expression such as CSS or XPath. A locator represents a query that Playwright resolves against the current DOM when you use it. You can build locators from semantic methods such as getByRole() or from selectors via locator()."
      }
    ]
  },
  {
    "id": 18,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "What are the different locator strategies available in Playwright?",
    "answer": [
      {
        "text": "Use role and accessible name, label, text, placeholder, alt text, title or a test ID. CSS and XPath are available when needed. Scope to a meaningful container and filter by text or a child locator when multiple elements match."
      }
    ]
  },
  {
    "id": 19,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "How do you handle dynamically changing elements without using XPath?",
    "answer": [
      {
        "text": "Target a stable accessible name, label or test ID. Scope the query to a stable component and prefer a business identifier over an index. For example, find the row by order ID and then click its View button. The locator resolves again when used after a re-render."
      },
      {
        "text": "Across tools, choose an element identity tied to user behaviour or a stable test contract. Playwright can scope a getByRole locator to a row. In Selenium, locate the row and search within it using a stable By selector."
      }
    ]
  },
  {
    "id": 20,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "How do you verify whether an element has been removed from the DOM rather than simply hidden?",
    "answer": [
      {
        "text": "Assert await expect(locator).toHaveCount(0) or use not.toBeAttached() for a unique locator. toBeHidden() can pass for either a hidden or detached element. First verify that your locator matches the expected element before performing the removal."
      }
    ]
  },
  {
    "id": 21,
    "topic": "Playwright Fundamentals & Architecture",
    "prompt": "How do you handle browser compatibility testing using Playwright?",
    "answer": [
      {
        "text": "Define projects for your supported browser engines and, where appropriate, branded channels. Run high-risk smoke tests on each project and prioritize wider regression by user traffic and feature risk. Chromium, Firefox and WebKit coverage is useful, but confirm Safari and real-device requirements separately when applicable."
      }
    ]
  },
  {
    "id": 22,
    "topic": "Locators & Web Element Handling",
    "prompt": "What are the different ways to locate web elements in Playwright?",
    "answer": [
      {
        "text": "Use semantic queries such as page.getByRole('button', { name: 'Save' }), test IDs for explicit contracts, and CSS or XPath for legacy surfaces. For iframe content, enter the frame with a frame locator before applying the same strategies."
      }
    ]
  },
  {
    "id": 23,
    "topic": "Locators & Web Element Handling",
    "prompt": "What is the difference between getByRole(), getByText(), getByLabel(), getByPlaceholder() and locator()?",
    "answer": [
      {
        "text": "getByRole() matches an accessibility role and optionally a name. getByText() matches displayed text content. getByLabel() finds a form control through its label or accessible labelling, and getByPlaceholder() matches placeholder text. locator() accepts a selector or another locator when you need lower-level or scoped matching."
      }
    ]
  },
  {
    "id": 24,
    "topic": "Locators & Web Element Handling",
    "prompt": "How do you handle dynamic elements when their attributes or identifiers change frequently?",
    "answer": [
      {
        "text": "Prefer a stable role, accessible name or agreed test ID. Scope repeated components to a stable parent, then filter by unique visible data. For generated IDs, ask for a durable selector contract and use a retrying assertion to verify the expected state."
      }
    ]
  },
  {
    "id": 25,
    "topic": "Locators & Web Element Handling",
    "prompt": "How do you locate an element relative to another element using Playwright?",
    "answer": [
      {
        "text": "Chain locators from a known container or use filter({ has: ... }) to select a container with a matching descendant. Then find the intended control within it."
      },
      {
        "code": "const row = page.getByRole('row').filter({\n  has: page.getByRole('cell', { name: 'ORDER-42', exact: true }),\n});\nawait row.getByRole('button', { name: 'Edit' }).click();"
      }
    ]
  },
  {
    "id": 26,
    "topic": "Locators & Web Element Handling",
    "prompt": "How do you use XPath in Playwright, and when would you prefer other locator strategies?",
    "answer": [
      {
        "text": "Example: page.locator('xpath=//button[@type=\"submit\"]'). Use XPath for a legacy DOM where a stable semantic or test-ID target is unavailable. Prefer role or label for user behaviour and a test ID for an explicit contract. Avoid absolute XPath tied to layout."
      }
    ]
  },
  {
    "id": 27,
    "topic": "Locators & Web Element Handling",
    "prompt": "How would you locate the “Sell” option on Amazon and navigate through the page structure to locate “Amazon Pay”?",
    "answer": [
      {
        "text": "Inspect the actual locale and page first. Find the Sell link by role and exact accessible name, scoped to the footer or menu it belongs to. Verify the destination, then look for Amazon Pay in the appropriate navigation region. If it is on a separate page, handle that as a separate navigation. Actual labels and placement vary by marketplace."
      }
    ]
  },
  {
    "id": 28,
    "topic": "Handling Browser Events, Tabs & Pop-ups",
    "prompt": "How do you handle multiple tabs or popup windows in Playwright?",
    "answer": [
      {
        "text": "Register the page or popup wait before the action that opens it. Retain the returned Page object and interact with that reference. Assert a meaningful URL, heading or ready state in the new page."
      },
      {
        "code": "const popupPromise = page.waitForEvent('popup');\nawait page.getByRole('link', { name: 'Open receipt' }).click();\nconst receipt = await popupPromise;\nawait expect(receipt).toHaveTitle(/Receipt/);"
      }
    ]
  },
  {
    "id": 29,
    "topic": "Handling Browser Events, Tabs & Pop-ups",
    "prompt": "What is the purpose of context.waitForEvent('page') in Playwright?",
    "answer": [
      {
        "text": "It waits for a new Page anywhere in the specified browser context, including one opened from any existing tab in that context. Set up the wait before the trigger. When several pages could open, use a predicate if it can reliably distinguish the intended page at event time, or use the specific opener’s popup event."
      }
    ]
  },
  {
    "id": 30,
    "topic": "Handling Browser Events, Tabs & Pop-ups",
    "prompt": "What is the difference between page.waitForEvent('popup') and context.waitForEvent('page')?",
    "answer": [
      {
        "text": "The popup event is tied to one opener page. The context page event observes new pages across that context, regardless of opener. Use the opener-scoped event when you know the source of the popup."
      }
    ]
  },
  {
    "id": 31,
    "topic": "Handling Browser Events, Tabs & Pop-ups",
    "prompt": "How do you switch between multiple pages or tabs within the same browser context?",
    "answer": [
      {
        "text": "Keep the Page references and call actions on whichever one you need. For example, use await receipt.title() and then interact with mainPage. bringToFront() is useful for focus-dependent behaviour or debugging, but ordinary page operations use the reference directly."
      }
    ]
  },
  {
    "id": 32,
    "topic": "Handling Browser Events, Tabs & Pop-ups",
    "prompt": "How do you handle browser alerts, confirmation dialogs and prompt dialogs in Playwright?",
    "answer": [
      {
        "text": "Register a dialog handler before triggering the action. Use dialog.accept() for alerts or confirmations, dialog.dismiss() for cancellation, and dialog.accept('input') for prompts. Linked actions can stall if a registered handler never responds. Assert the dialog text and the resulting application state."
      }
    ]
  },
  {
    "id": 33,
    "topic": "File Uploads & Downloads",
    "prompt": "How do you upload a file using Playwright? Write a sample automation script.",
    "answer": [
      {
        "text": "Use setInputFiles() on the file input. Then trigger submission and assert a confirmed result in the application. Here the labels, route and fixture path are illustrative."
      },
      {
        "code": "import { test, expect } from '@playwright/test';\n\ntest('uploads a receipt', async ({ page }) => {\n  await page.goto('/documents');\n  await page.getByLabel('Attachment').setInputFiles('fixtures/receipt.pdf');\n  await page.getByRole('button', { name: 'Upload' }).click();\n  await expect(page.getByRole('status')).toHaveText('Upload complete');\n  await expect(page.getByRole('link', { name: 'receipt.pdf' })).toBeVisible();\n});"
      }
    ]
  },
  {
    "id": 34,
    "topic": "File Uploads & Downloads",
    "prompt": "How do you handle file uploads when the application uses a hidden file input element?",
    "answer": [
      {
        "text": "If the input already exists, setInputFiles() can set it directly even when hidden. If clicking the visible UI opens a chooser or creates the input, start waiting for filechooser before clicking and call setFiles() on the returned chooser."
      }
    ]
  },
  {
    "id": 35,
    "topic": "File Uploads & Downloads",
    "prompt": "How do you verify that a file has been successfully downloaded after clicking a button?",
    "answer": [
      {
        "text": "Start waiting for the download before clicking, then await completion using saveAs() or failure(). The download event fires when it starts. Assert the expected filename and contents when relevant, and use a unique test output path."
      }
    ]
  },
  {
    "id": 36,
    "topic": "File Uploads & Downloads",
    "prompt": "How do you capture the downloaded file and validate its name or contents?",
    "answer": [
      {
        "text": "Use download.suggestedFilename() for the proposed name and download.saveAs(testInfo.outputPath(...)) to retain the file. Read or parse the saved file to check meaningful data such as CSV headers, record IDs or an expected checksum."
      }
    ]
  },
  {
    "id": 37,
    "topic": "File Uploads & Downloads",
    "prompt": "How would you design a Playwright test to upload 50 files efficiently using parallel execution and workers?",
    "answer": [
      {
        "text": "Generate independent test cases by file or scenario, use unique data and allow test-level parallelism where safe. Set a measured worker cap and tune it using storage throughput, backend limits and first-pass stability. If the user feature is a single multi-file upload, also test that feature as one UI interaction with an array of files."
      }
    ]
  },
  {
    "id": 38,
    "topic": "Assertions & Validation",
    "prompt": "What are assertions in Playwright, and where do you use them in your automation scripts?",
    "answer": [
      {
        "text": "Assertions compare observed behaviour with expected outcomes. Use them at meaningful checkpoints such as a successful status message, persisted record, URL change or blocked action. Prefer retrying assertions for UI state that can change after an action."
      }
    ]
  },
  {
    "id": 39,
    "topic": "Assertions & Validation",
    "prompt": "What are the different assertion methods available in Playwright?",
    "answer": [
      {
        "text": "Use locator assertions such as toBeVisible(), toHaveText(), toHaveCount() and toHaveValue(); page assertions such as toHaveURL(); and generic value assertions such as toBe() and toEqual(). Use expect.poll() when a computed condition needs repeated evaluation."
      }
    ]
  },
  {
    "id": 40,
    "topic": "Assertions & Validation",
    "prompt": "What is the difference between toHaveText(), toContainText(), toHaveTitle() and toBeVisible()?",
    "answer": [
      {
        "text": "toHaveText() checks the locator’s text against an expected string or pattern. toContainText() permits a substring or pattern. toHaveTitle() checks the page title, and toBeVisible() checks whether a matching element is visible. They retry when applied to the appropriate locator or page."
      }
    ]
  },
  {
    "id": 41,
    "topic": "Assertions & Validation",
    "prompt": "What is the difference between Playwright’s auto-retrying assertions and generic assertions?",
    "answer": [
      {
        "text": "await expect(locator).toHaveText('Saved') rechecks the UI until the condition passes or times out. expect(await locator.textContent()).toBe('Saved') compares one captured value. Generic assertions are a good fit when the data is already available and stable."
      },
      {
        "text": "The principle is to re-evaluate the expected condition until it is true or its deadline expires. Playwright supplies retrying locator assertions. With Selenium, use WebDriverWait for the condition, then assert the outcome."
      }
    ]
  },
  {
    "id": 42,
    "topic": "Assertions & Validation",
    "prompt": "How do you verify that an element is not present in the DOM?",
    "answer": [
      {
        "text": "Use await expect(page.getByTestId('toast')).toHaveCount(0). For a unique element, not.toBeAttached() also expresses detachment. A prior positive assertion or an independent ready-state check helps avoid a false pass caused by a wrong selector or an unloaded page."
      }
    ]
  },
  {
    "id": 43,
    "topic": "Assertions & Validation",
    "prompt": "How do you validate search results displayed on a web page using Playwright?",
    "answer": [
      {
        "text": "Seed predictable matching and nonmatching records. Trigger the search, wait for a result or empty-state indicator tied to that query, then check each returned row or the expected top result according to the ranking rules. Verify no-results handling and pagination when relevant."
      }
    ]
  },
  {
    "id": 44,
    "topic": "Synchronisation, Waits & Asynchronous Operations",
    "prompt": "What is auto-waiting in Playwright, and how does it work?",
    "answer": [
      {
        "text": "Locator actions wait for their applicable actionability checks. A click normally waits for a unique target that is visible, stable, enabled and able to receive events. Wait for a business result separately with a web-first assertion or relevant event."
      },
      {
        "text": "A control being ready for a click and a business operation being complete are separate conditions. In Selenium, wait explicitly for the relevant state with WebDriverWait. For an API-backed UI, assert the resulting UI change after the action."
      }
    ]
  },
  {
    "id": 45,
    "topic": "Synchronisation, Waits & Asynchronous Operations",
    "prompt": "What are the different waiting mechanisms available in Playwright?",
    "answer": [
      {
        "text": "Use locator actionability and retrying assertions first. You can explicitly wait for a locator state, URL, browser event, request or response when it represents the intended condition. Register event or response waits before the trigger to prevent races."
      }
    ]
  },
  {
    "id": 46,
    "topic": "Synchronisation, Waits & Asynchronous Operations",
    "prompt": "What is the difference between waitForSelector(), waitForLoadState() and waitForTimeout()?",
    "answer": [
      {
        "text": "waitForSelector() waits for an element state; Playwright favours locator waits or assertions. waitForLoadState() waits for a document lifecycle milestone such as load or domcontentloaded. waitForTimeout() always sleeps for a fixed duration and is mainly useful for temporary debugging."
      }
    ]
  },
  {
    "id": 47,
    "topic": "Synchronisation, Waits & Asynchronous Operations",
    "prompt": "How do you handle dynamically loaded web elements in Playwright?",
    "answer": [
      {
        "text": "Use a stable locator and assert the expected content or readiness indicator. For a list, wait for the item associated with the submitted query. If you need a specific response, wait for that request and still assert what the user sees because rendering may follow the response."
      }
    ]
  },
  {
    "id": 48,
    "topic": "Synchronisation, Waits & Asynchronous Operations",
    "prompt": "How do you handle asynchronous operations in Playwright scripts?",
    "answer": [
      {
        "text": "Await actions and retrying assertions. Execute dependent steps in order. For independent operations or a trigger paired with an event, start the observation before the action and await both. Keep timeouts specific enough to reveal the underlying failure."
      }
    ]
  },
  {
    "id": 49,
    "topic": "Synchronisation, Waits & Asynchronous Operations",
    "prompt": "Do you always need to use async and await in Playwright? Can you write scripts without them?",
    "answer": [
      {
        "text": "Browser operations usually return promises. You can return a promise chain with .then() instead of using async/await, as long as the runner can observe completion and errors. Synchronous calls like constructing a locator or comparing an already available value need no await."
      }
    ]
  },
  {
    "id": 50,
    "topic": "Synchronisation, Waits & Asynchronous Operations",
    "prompt": "Why can’t you use await outside an async function, and why doesn’t declaring a function async automatically make every operation awaitable?",
    "answer": [
      {
        "text": "await is valid inside an async function and at the top level of an ES module. An async function returns a promise, but its internal promise-returning calls still need awaiting or returning. Awaiting a plain value resolves to that value; it cannot detect asynchronous work whose promise was discarded."
      }
    ]
  },
  {
    "id": 51,
    "topic": "Playwright Test Runner, Fixtures & Hooks",
    "prompt": "What is the Playwright Test Runner, and what are its key features?",
    "answer": [
      {
        "text": "Playwright Test discovers and runs JavaScript or TypeScript tests. It provides isolated fixtures, retrying assertions, projects, timeouts, retries, workers, sharding and reporters. It can attach browser traces and other evidence for diagnostics."
      }
    ]
  },
  {
    "id": 52,
    "topic": "Playwright Test Runner, Fixtures & Hooks",
    "prompt": "What are fixtures in Playwright, and how do they work?",
    "answer": [
      {
        "text": "Fixtures provide test dependencies with managed lifecycles. A test requests fixtures by destructuring its arguments. A custom fixture sets up its value, calls await use(value) to make it available, and cleans up afterwards, preferably with try/finally when cleanup is needed."
      },
      {
        "text": "Manage test dependencies with a clear lifecycle in any stack. Playwright fixtures, pytest fixtures and JUnit setup and teardown can all provision and release per-test data or sessions, with scopes chosen for isolation."
      }
    ]
  },
  {
    "id": 53,
    "topic": "Playwright Test Runner, Fixtures & Hooks",
    "prompt": "What are the different types of fixtures available in Playwright?",
    "answer": [
      {
        "text": "Built-ins include page, context, browser and request. Define your own with test.extend(). Test-scoped fixtures are created for individual tests, while worker-scoped fixtures can be shared within a worker. Fixtures can be requested by name or configured to run automatically."
      }
    ]
  },
  {
    "id": 54,
    "topic": "Playwright Test Runner, Fixtures & Hooks",
    "prompt": "What is the difference between test.beforeEach(), test.afterEach(), test.beforeAll() and test.afterAll()?",
    "answer": [
      {
        "text": "Each hooks run around every test in their scope. All hooks run around the tests in the applicable file or group within each worker that executes them. Workers can restart after failures, so all hooks may execute again. Use idempotent setup and keep UI state isolated per test."
      }
    ]
  },
  {
    "id": 55,
    "topic": "Playwright Test Runner, Fixtures & Hooks",
    "prompt": "What is the difference between test.describe(), test() and test.step()?",
    "answer": [
      {
        "text": "test.describe() groups related tests and gives them shared configuration or hooks. test() declares an independently reported test. test.step() names an operation inside that test and records it in reports and traces. Await asynchronous steps."
      }
    ]
  },
  {
    "id": 56,
    "topic": "Playwright Test Runner, Fixtures & Hooks",
    "prompt": "How do you configure the Playwright test runner using playwright.config.js or playwright.config.ts?",
    "answer": [
      {
        "text": "Export a configuration with defineConfig(). Set discovery, projects, timeouts, workers, retries and reporters at the appropriate level. Supply browser and context options under use."
      },
      {
        "code": "import { defineConfig, devices } from '@playwright/test';\n\nexport default defineConfig({\n  testDir: './tests',\n  timeout: 30_000,\n  retries: process.env.CI ? 1 : 0,\n  workers: process.env.CI ? 2 : undefined,\n  reporter: [['html', { open: 'never' }]],\n  use: {\n     baseURL: process.env.BASE_URL || 'http://localhost:3000',\n     screenshot: 'only-on-failure',\n     trace: 'retain-on-failure',\n  },\n  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],\n});"
      }
    ]
  },
  {
    "id": 57,
    "topic": "Playwright Test Runner, Fixtures & Hooks",
    "prompt": "How do you pass configuration values such as baseURL, timeout, retries and browser settings?",
    "answer": [
      {
        "text": "Place baseURL and context options such as viewport under use. Set test timeout and retries at config or project scope and use projects for browser profiles. Validate environment variables early and use per-test overrides only for scenarios with different requirements."
      }
    ]
  },
  {
    "id": 58,
    "topic": "Playwright Test Runner, Fixtures & Hooks",
    "prompt": "How do you configure screenshots to be captured automatically when a test fails?",
    "answer": [
      {
        "text": "Set use: { screenshot: 'only-on-failure' } in the configuration. Attach the test output and reports in CI. Screenshots reflect one point in time, so keep traces alongside them when you need the sequence of events."
      }
    ]
  },
  {
    "id": 59,
    "topic": "Playwright Test Runner, Fixtures & Hooks",
    "prompt": "How do you configure video recording and trace collection in Playwright?",
    "answer": [
      {
        "text": "Use options such as video: 'retain-on-failure' and trace: 'retain-on-failure' under use to keep failure evidence. trace: 'on-first-retry' records the first retry and requires retries to be enabled for that attempt to happen. Publish only to the audience authorised to see the data in the recordings."
      }
    ]
  },
  {
    "id": 60,
    "topic": "Parallel Execution & Test Execution Optimisation",
    "prompt": "How do you implement parallel execution in Playwright?",
    "answer": [
      {
        "text": "Test files run concurrently by default when workers are available. Enable fullyParallel or configure a describe group for parallel mode when individual tests are independent. For more machines, run separate shards with --shard=x/y and merge their reports when needed."
      }
    ]
  },
  {
    "id": 61,
    "topic": "Parallel Execution & Test Execution Optimisation",
    "prompt": "What is the role of workers in Playwright?",
    "answer": [
      {
        "text": "A worker is a separate OS process that executes assigned tests and normally owns a browser instance. Playwright can reuse a worker across files with compatible fixtures. After a test failure it may replace the worker, so avoid storing essential test state only in memory between cases."
      }
    ]
  },
  {
    "id": 62,
    "topic": "Parallel Execution & Test Execution Optimisation",
    "prompt": "What is the difference between workers and fullyParallel in Playwright?",
    "answer": [
      {
        "text": "workers caps worker-process concurrency. fullyParallel lets tests within files be scheduled independently by default. Turning on full parallelism does not raise the worker cap, and raising the cap does not automatically parallelise tests within a file."
      }
    ]
  },
  {
    "id": 63,
    "topic": "Parallel Execution & Test Execution Optimisation",
    "prompt": "How do you configure the maximum number of parallel workers?",
    "answer": [
      {
        "text": "Set workers: 4 or a percentage such as '50%' in the configuration, or override it with npx playwright test --workers=4. Set the CI value based on measured resources and backend capacity."
      }
    ]
  },
  {
    "id": 64,
    "topic": "Parallel Execution & Test Execution Optimisation",
    "prompt": "How do you control parallel execution limits in Playwright?",
    "answer": [
      {
        "text": "First cap workers per test run. Control aggregate concurrency across CI jobs or shards separately. For a group that requires ordered execution, configure its mode deliberately, but prefer independent data so unrelated tests can still run concurrently."
      }
    ]
  },
  {
    "id": 65,
    "topic": "Parallel Execution & Test Execution Optimisation",
    "prompt": "What challenges can occur during parallel execution, and how do you resolve them?",
    "answer": [
      {
        "text": "Common failures come from shared accounts or data, request limits, browser memory pressure and order dependencies. Use separate resources per test or worker, make cleanup scoped and idempotent, and benchmark with a controlled worker count. Compare the same selection sequentially and concurrently to diagnose collisions."
      }
    ]
  },
  {
    "id": 66,
    "topic": "Parallel Execution & Test Execution Optimisation",
    "prompt": "How do you handle shared test data and application state when tests run in parallel?",
    "answer": [
      {
        "text": "Keep reference data read-only. For writes, create records namespaced by run, shard and test or worker. Provision per-worker accounts when server-side user state is changed, and reset per-test data. Delete only resources created by the current test."
      },
      {
        "text": "For an API suite, unique records per test are often enough. For browser suites, also consider account-level preferences, storage and permission state. A separate browser session alone cannot isolate shared backend records."
      }
    ]
  },
  {
    "id": 67,
    "topic": "Parallel Execution & Test Execution Optimisation",
    "prompt": "What steps do you take to reduce the overall execution time of automation test suites?",
    "answer": [
      {
        "text": "Measure setup, queue and test duration separately. Move common setup to APIs, remove duplicated end-to-end coverage, eliminate fixed sleeps and select smoke versus regression by risk. Tune workers and shards after evaluating startup cost and stability."
      }
    ]
  },
  {
    "id": 68,
    "topic": "Parallel Execution & Test Execution Optimisation",
    "prompt": "How would you optimise a test suite containing 50 file-upload scenarios to reduce execution time?",
    "answer": [
      {
        "text": "Keep representative UI cases for selecting, uploading and reporting errors. Exercise file type, size and backend validation at API or component level when that is where the rule lives. Reuse lightweight fixtures, isolate uploads, and compare worker settings using duration, storage/API load and failure rates."
      }
    ]
  },
  {
    "id": 69,
    "topic": "Debugging, Reporting & Flaky Test Management",
    "prompt": "What debugging methods and tools are available in Playwright?",
    "answer": [
      {
        "text": "Use --debug for Inspector, Trace Viewer for recorded actions and DOM snapshots, HTML reports for run results and attachments, and headed mode or browser DevTools for live diagnosis. Add structured logs for backend IDs and correlate them with test evidence."
      }
    ]
  },
  {
    "id": 70,
    "topic": "Debugging, Reporting & Flaky Test Management",
    "prompt": "How do you troubleshoot and fix a failed test case in Playwright?",
    "answer": [
      {
        "text": "Start at the first failing assertion or action, inspect the trace, and reproduce using the same data and browser project. Classify the issue as product, test, data or environment. Fix the underlying condition, then run the affected test repeatedly and run nearby coverage."
      }
    ]
  },
  {
    "id": 71,
    "topic": "Debugging, Reporting & Flaky Test Management",
    "prompt": "How do you debug a test that passes locally but fails in Jenkins?",
    "answer": [
      {
        "text": "Match the Jenkins image, browser versions, environment, account permissions, locale, time zone and worker count. Compare trace, logs and resource usage. Run with one worker to isolate concurrency, then restore production concurrency to verify the actual fix."
      }
    ]
  },
  {
    "id": 72,
    "topic": "Debugging, Reporting & Flaky Test Management",
    "prompt": "How do you use Playwright Inspector, Trace Viewer and browser developer tools for debugging?",
    "answer": [
      {
        "text": "Use Inspector to step through actions and refine live locators. Open a trace to review timeline, DOM snapshots and relevant network or console evidence. Use browser DevTools for live DOM, network and application-storage inspection. Choose the tool based on whether the failure needs live reproduction or recorded evidence."
      }
    ]
  },
  {
    "id": 73,
    "topic": "Debugging, Reporting & Flaky Test Management",
    "prompt": "How do you configure screenshots for failed test cases?",
    "answer": [
      {
        "text": "Set use.screenshot to 'only-on-failure' and archive the Playwright output. Capture custom screenshots around an important intermediate state with page.screenshot() and attach them when helpful."
      }
    ]
  },
  {
    "id": 74,
    "topic": "Debugging, Reporting & Flaky Test Management",
    "prompt": "How do you handle flaky tests in Playwright automation?",
    "answer": [
      {
        "text": "Track first-attempt failures even if a retry passes. Reproduce under CI-like conditions, determine whether timing, data, environment or the application is unstable, and fix the cause. If the test blocks delivery, use temporary quarantine with an owner and review date, and preserve coverage of critical flows."
      }
    ]
  },
  {
    "id": 75,
    "topic": "Debugging, Reporting & Flaky Test Management",
    "prompt": "What are the common reasons for flaky tests, and how do you prevent them?",
    "answer": [
      {
        "text": "Typical causes include brittle selectors, async rendering, shared state, external dependency jitter and overloaded runners. Prevent them with stable locators, observable readiness, isolated data, controlled dependencies and measured parallelism. Keep retries limited so instability remains visible."
      }
    ]
  },
  {
    "id": 76,
    "topic": "Debugging, Reporting & Flaky Test Management",
    "prompt": "How do you analyse Playwright execution reports and identify the root cause of failures?",
    "answer": [
      {
        "text": "Group failures by first error, project and attempt. Open the trace for a representative case and follow the action sequence, DOM and network evidence. Compare against a passing run and combine the trace with app or runner logs. Distinguish a common setup failure from independent test failures."
      }
    ]
  },
  {
    "id": 77,
    "topic": "Playwright Framework Design & Page Object Model",
    "prompt": "How would you design an automation framework using Playwright from scratch?",
    "answer": [
      {
        "text": "Start with a smoke journey and configure the runner, reporting and CI. Add test fixtures to manage data and sessions, page or component objects where UI logic repeats, and API clients to seed state. Expand projects and coverage in response to requirements and measure reliability as you scale."
      }
    ]
  },
  {
    "id": 78,
    "topic": "Playwright Framework Design & Page Object Model",
    "prompt": "Can you explain the architecture and folder structure of your Playwright automation framework?",
    "answer": [
      {
        "text": "Walk through the path from test cases to fixtures, page or component objects and API clients. A representative layout uses tests/, pages/ or components/, fixtures/, clients/ and test-data/. If you use Python and pytest, explain the analogous role of conftest.py and pytest fixtures. Use your own repository layout when describing past work."
      }
    ]
  },
  {
    "id": 79,
    "topic": "Playwright Framework Design & Page Object Model",
    "prompt": "How do you implement the Page Object Model (POM) in Playwright?",
    "answer": [
      {
        "text": "Give the page object a Page reference. Store stable locators and expose meaningful operations such as signIn. Keep business assertions visible in tests and use objects for recurring UI interactions and component details."
      },
      {
        "code": "export class LoginPage {\n  constructor(page) {\n    this.page = page;\n    this.email = page.getByLabel('Email');\n    this.password = page.getByLabel('Password');\n  }\n\n    async signIn(email, password) {\n      await this.email.fill(email);\n      await this.password.fill(password);\n      await this.page.getByRole('button', { name: 'Sign in' }).click();\n    }\n}"
      },
      {
        "text": "The same approach works in Selenium, Playwright or other UI tools. Encapsulate the page interactions behind an intent-based method, and let the test show the expected business outcome."
      }
    ]
  },
  {
    "id": 80,
    "topic": "Playwright Framework Design & Page Object Model",
    "prompt": "How do you maintain reusable methods and common utilities in your framework?",
    "answer": [
      {
        "text": "Keep helpers close to the behaviour they own, such as filters in a grid component or order setup in an API client. Give them clear inputs and outcomes. Extract repeated domain operations and avoid wrapping every framework call in a second generic API."
      }
    ]
  },
  {
    "id": 81,
    "topic": "Playwright Framework Design & Page Object Model",
    "prompt": "How do you manage and access test data files in your automation framework?",
    "answer": [
      {
        "text": "Keep small deterministic fixtures under version control. Use builders for scenario variations and API setup for backend state. Generate unique values for concurrent cases, keep output in per-test directories and hold credentials in CI or a secret store."
      }
    ]
  },
  {
    "id": 82,
    "topic": "Playwright Framework Design & Page Object Model",
    "prompt": "Do you use external libraries to read or manage test data? If so, which ones and why?",
    "answer": [
      {
        "text": "Match the tool to the data. Native JSON handling often covers small fixtures. A CSV parser helps with quoting and multiline fields, and schema validation is useful for externally owned inputs. Use seeded generation when you need reproducibility. Identify which tools you used and which you would consider."
      }
    ]
  },
  {
    "id": 83,
    "topic": "Playwright Framework Design & Page Object Model",
    "prompt": "How do you implement environment-specific configurations in your framework?",
    "answer": [
      {
        "text": "Read environment variables such as BASE_URL and validate required settings early. Keep safe defaults for local runs and define projects for meaningful combinations. Keep secrets separate, report the environment in CI metadata, and scope any state-changing test to the intended test environment."
      }
    ]
  },
  {
    "id": 84,
    "topic": "Playwright Framework Design & Page Object Model",
    "prompt": "How do you manage authentication and reuse login sessions across test cases?",
    "answer": [
      {
        "text": "Run an authentication setup project and save storageState for read-only workflows when safe. Keep state files private. Use a separate account or state per worker for write-heavy tests, and use distinct contexts and state files for different roles. Keep a UI login smoke test to cover the actual login path."
      }
    ]
  },
  {
    "id": 85,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "Why did you choose JavaScript instead of TypeScript for your Playwright automation scripts?",
    "answer": [
      {
        "text": "If you used JavaScript, explain the team’s existing tooling, the complexity of the suite and how reviews, linting or JSDoc supported maintenance. If your project used TypeScript, Python or another language, state that choice and discuss JavaScript as a hypothetical trade-off."
      }
    ]
  },
  {
    "id": 86,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "Why might you choose TypeScript over JavaScript for an automation framework?",
    "answer": [
      {
        "text": "Static checking helps catch incorrect fixture and payload usage before execution and improves editor assistance during refactors. This is valuable for shared component and API abstractions. Set up CI type checks such as tsc --noEmit and keep runtime validation for untrusted external data."
      }
    ]
  },
  {
    "id": 87,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "What are the differences between JavaScript and TypeScript?",
    "answer": [
      {
        "text": "JavaScript executes in the runtime. TypeScript adds compile-time type syntax and analysis, then emits or is transformed to JavaScript. Type information is mostly erased at runtime, so parsed APIs and environment values still need validation where correctness depends on them."
      }
    ]
  },
  {
    "id": 88,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "What is a Promise in JavaScript?",
    "answer": [
      {
        "text": "A Promise represents an operation’s eventual result. It starts pending, then fulfils with a value or rejects with a reason. Playwright operations return promises so tests can wait for browser work to complete and surface failures."
      }
    ]
  },
  {
    "id": 89,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "What is an asynchronous operation in JavaScript?",
    "answer": [
      {
        "text": "It starts work whose completion can arrive later, such as an HTTP response or browser action. While waiting, the runtime can continue processing other work. A promise or callback lets the program react when the operation completes."
      }
    ]
  },
  {
    "id": 90,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "What is the difference between async and await?",
    "answer": [
      {
        "text": "async declares a function that always returns a promise. await suspends the current async function or module evaluation until the awaited value settles, yielding a fulfilment value or throwing a rejection. It does not block the entire runtime."
      }
    ]
  },
  {
    "id": 91,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "What is the purpose of the then() method in JavaScript Promises?",
    "answer": [
      {
        "text": ".then() registers a fulfilment handler and optionally a rejection handler, and returns a new promise. The next link receives the handler’s return value or adopts the promise it returns. A missing return can let the chain progress before nested asynchronous work completes."
      }
    ]
  },
  {
    "id": 92,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "What is a callback function? Explain with a simple Playwright example.",
    "answer": [
      {
        "text": "A callback is a function passed to another function to be called later or as part of its operation. In page.on('console', message => console.log(message.text())), Playwright calls the callback for each page console message and supplies the message object."
      }
    ]
  },
  {
    "id": 93,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "What arguments are passed to callback functions in Playwright? Explain with an example.",
    "answer": [
      {
        "text": "The signature depends on the API. A waitForResponse() predicate receives a Response, whereas the Playwright Test callback receives a fixture object and optional TestInfo. For example, this predicate matches a specific request shape."
      },
      {
        "code": "const ordersResponse = page.waitForResponse(response =>\n   new URL(response.url()).pathname === '/api/orders' &&\n   response.request().method() === 'POST'\n);\nawait page.getByRole('button', { name: 'Create order' }).click();\nexpect((await ordersResponse).status()).toBe(201);"
      }
    ]
  },
  {
    "id": 94,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "What is the difference between Promise.all() and Promise.allSettled()?",
    "answer": [
      {
        "text": "Promise.all() resolves with results in input order if every input fulfils and rejects when an input rejects. It does not cancel the other work. Promise.allSettled() waits for all inputs and returns each status plus its value or reason, in input order."
      }
    ]
  },
  {
    "id": 95,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "What is the difference between push(), pop() and shift() array methods in JavaScript?",
    "answer": [
      {
        "text": "push(value) appends and returns the new length. pop() removes and returns the last element. shift() removes and returns the first element, moving later positions. The removal methods return undefined on an empty array."
      }
    ]
  },
  {
    "id": 96,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "How would you find duplicate characters in a string using JavaScript?",
    "answer": [
      {
        "text": "Track encountered characters in one Set and repeat characters in another. This returns each repeated Unicode code point once, in the order it first repeats. Clarify case and whitespace rules before coding."
      },
      {
        "code": "export function duplicates(text) {\n  const seen = new Set();\n  const repeated = new Set();\n  for (const char of text) {\n    if (seen.has(char)) repeated.add(char);\n    seen.add(char);\n  }\n  return [...repeated];\n}\n// duplicates('banana') gives ['a', 'n']."
      }
    ]
  },
  {
    "id": 97,
    "topic": "JavaScript Fundamentals for Playwright",
    "prompt": "How would you format the current date in Playwright as “17th October 2026”?",
    "answer": [
      {
        "text": "Pick a business time zone, extract English date parts and apply the ordinal rule, including 11th, 12th and 13th. Pass a fixed Date to verify deterministic examples."
      },
      {
        "code": "function formatOrdinalDate(date = new Date()) {\n  const formatter = new Intl.DateTimeFormat('en-GB', {\n     day: 'numeric', month: 'long', year: 'numeric',\n     timeZone: 'Asia/Jakarta',\n  });\n  const parts = Object.fromEntries(\n     formatter.formatToParts(date).map(({ type, value }) => [type, value])\n  );\n  const day = Number(parts.day);\n  const endsInTeen = day % 100 >= 11 && day % 100 <= 13;\n  const suffixes = { 1: 'st', 2: 'nd', 3: 'rd' };\n  const suffix = endsInTeen ? 'th' : (suffixes[day % 10] || 'th');\n  return day + suffix + ' ' + parts.month + ' ' + parts.year;\n}"
      }
    ]
  },
  {
    "id": 98,
    "topic": "Practical Playwright Coding Scenarios",
    "prompt": "Write a basic Playwright test for logging in, including entering credentials and validating success.",
    "answer": [
      {
        "text": "Use test credentials supplied by the environment and assert a protected page or user-visible success. In this example a test environment and baseURL are already configured."
      },
      {
        "code": "import { test, expect } from '@playwright/test';\n\ntest('signs in', async ({ page }) => {\n  const { TEST_EMAIL: email, TEST_PASSWORD: password } = process.env;\n  if (!email || !password) throw new Error('Test credentials are required');\n  await page.goto('/login');\n  await page.getByLabel('Email').fill(email);\n  await page.getByLabel('Password').fill(password);\n  await page.getByRole('button', { name: 'Sign in' }).click();\n  await expect(page).toHaveURL(/\\/dashboard(?:[/?#]|$)/);\n  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();\n});"
      }
    ]
  },
  {
    "id": 99,
    "topic": "Practical Playwright Coding Scenarios",
    "prompt": "Write a Playwright script to upload a file and verify that the upload was successful.",
    "answer": [
      {
        "text": "Use an in-memory file for a small deterministic fixture. Check the persisted file row after reload if persistence is part of the contract."
      },
      {
        "code": "await page.goto('/documents');\nawait page.getByLabel('Attachment').setInputFiles({\n  name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('QA fixture'),\n});\nawait page.getByRole('button', { name: 'Upload' }).click();\nawait expect(page.getByRole('status')).toHaveText('Upload complete');\nawait page.reload();\nawait expect(page.getByRole('link', { name: 'notes.txt' })).toBeVisible();"
      }
    ]
  },
  {
    "id": 100,
    "topic": "Practical Playwright Coding Scenarios",
    "prompt": "Write a Playwright script to download a file and validate that it was downloaded successfully.",
    "answer": [
      {
        "text": "This example runs inside a test with seeded report data. Register the download wait first and read the completed file."
      },
      {
        "code": "import { readFile } from 'node:fs/promises';\n\nconst pending = page.waitForEvent('download');\nawait page.getByRole('button', { name: 'Export CSV' }).click();\nconst download = await pending;\nexpect(download.suggestedFilename()).toBe('orders.csv');\nconst path = testInfo.outputPath('orders.csv');\nawait download.saveAs(path);\nexpect(await readFile(path, 'utf8')).toMatch(/^order_id,total\\r?\\n/);"
      }
    ]
  },
  {
    "id": 101,
    "topic": "Practical Playwright Coding Scenarios",
    "prompt": "Write a Playwright script to search for a keyword on a web page and validate the results.",
    "answer": [
      {
        "text": "With a seeded catalogue, assert the expected product within the results region. A full result-set assertion depends on the search contract and stable test data."
      },
      {
        "code": "await page.goto('/catalogue');\nawait page.getByRole('searchbox').fill('wireless mouse');\nawait page.getByRole('button', { name: 'Search' }).click();\nconst results = page.getByRole('region', { name: 'Search results' });\nawait expect(results.getByRole('link', {\n  name: 'Studio Wireless Mouse', exact: true,\n})).toBeVisible();"
      }
    ]
  },
  {
    "id": 102,
    "topic": "Practical Playwright Coding Scenarios",
    "prompt": "Write a Playwright script to open YouTube, search for a video, select the first result and play it.",
    "answer": [
      {
        "text": "This browser exercise assumes the English desktop site and a normal session with any required consent already handled. Choose a video result rather than a channel or ad. The site controls its own UI and autoplay policy, so verify selectors in the actual session."
      },
      {
        "code": "await page.goto('https://www.youtube.com/');\nconst search = page.getByRole('combobox', { name: 'Search' });\nawait search.fill('Playwright automation tutorial');\nawait search.press('Enter');\nconst firstVideo = page.locator('ytd-video-renderer a#video-title').first();\nawait expect(firstVideo).toBeVisible();\nawait firstVideo.click();\nawait expect(page).toHaveURL(/\\/watch\\?v=/);\nconst player = page.locator('#movie_player');\nconst play = player.getByRole('button', { name: /^Play(?: \\(k\\))?$/ });\ntry {\n  await play.click({ timeout: 3_000 });\n} catch (error) {\n  if (error.name !== 'TimeoutError') throw error;\n}\nawait expect.poll(() => player.evaluate(element => {\n  const video = element.querySelector('video');\n  return !element.classList.contains('ad-showing') &&\n    Boolean(video && !video.paused && video.currentTime > 0);\n}), { timeout: 30_000 }).toBe(true);"
      }
    ]
  },
  {
    "id": 103,
    "topic": "Practical Playwright Coding Scenarios",
    "prompt": "Write a Playwright script to open a new tab, navigate to a URL and validate the page title.",
    "answer": [
      {
        "text": "Use a new Page from the existing test context. The test fixture closes the context after the test."
      },
      {
        "code": "const tab = await context.newPage();\nawait tab.goto('https://example.com/');\nawait expect(tab).toHaveTitle('Example Domain');"
      }
    ]
  },
  {
    "id": 104,
    "topic": "Practical Playwright Coding Scenarios",
    "prompt": "Write a Playwright script to handle multiple browser tabs and switch between them.",
    "answer": [
      {
        "text": "Keep references to the opener and the popup. Interactions use the corresponding reference. Bring a tab to the front only when focus itself matters."
      },
      {
        "code": "const pending = page.waitForEvent('popup');\nawait page.getByRole('link', { name: 'Open invoice' }).click();\nconst invoice = await pending;\nawait expect(invoice.getByRole('heading', { name: 'Invoice' })).toBeVisible();\nawait expect(page.getByRole('heading', { name: 'Orders' })).toBeVisible();"
      }
    ]
  },
  {
    "id": 105,
    "topic": "Practical Playwright Coding Scenarios",
    "prompt": "Write a Playwright script to find duplicate characters in a given string.",
    "answer": [
      {
        "text": "This is a pure JavaScript task. Playwright Test can assert the function from the JavaScript section without opening a browser."
      },
      {
        "code": "import { test, expect } from '@playwright/test';\nimport { duplicates } from './duplicates.js';\n\ntest('returns distinct repeats in first-repeat order', () => {\n  expect(duplicates('banana')).toEqual(['a', 'n']);\n  expect(duplicates('abc')).toEqual([]);\n});"
      }
    ]
  },
  {
    "id": 106,
    "topic": "API Automation & REST Assured",
    "prompt": "What is your experience with API automation testing?",
    "answer": [
      {
        "text": "Choose an endpoint you tested in a workplace, class or portfolio project. Explain the contract, seeded data, positive and negative cases, status and body checks, and how you verified side effects. Mention the CI trigger if applicable. Label a practice example as such."
      }
    ]
  },
  {
    "id": 107,
    "topic": "API Automation & REST Assured",
    "prompt": "What activities do you perform as part of API automation testing?",
    "answer": [
      {
        "text": "Review the contract and risks, establish isolated data and build positive, negative and boundary coverage. Validate authentication, permissions, request handling, responses and side effects. Run the tests in CI and keep enough diagnostics to reproduce failures."
      }
    ]
  },
  {
    "id": 108,
    "topic": "API Automation & REST Assured",
    "prompt": "How do you validate API responses, status codes, headers and response bodies?",
    "answer": [
      {
        "text": "Assert the exact documented status, meaningful headers and key fields. Add schema or contract checks for structure, types and required fields. For state changes, follow up with a read or an event assertion so a successful response code alone cannot hide a failed write."
      },
      {
        "text": "Status, headers, body and side effects are the checks that transfer between clients. REST Assured expresses them through a Java DSL, while Python or Playwright can assert the same contract using parsed response values."
      }
    ]
  },
  {
    "id": 109,
    "topic": "API Automation & REST Assured",
    "prompt": "What tools and libraries have you used for API automation?",
    "answer": [
      {
        "text": "Name tools you used and identify what each one helped you verify. Common options include REST Assured in Java, Playwright APIRequestContext, or HTTP clients and a test runner in Python. Give one precise example and explain how the tests ran and reported failures."
      }
    ]
  },
  {
    "id": 110,
    "topic": "API Automation & REST Assured",
    "prompt": "Write a REST Assured Java script to send an API request and validate the HTTP status code.",
    "answer": [
      {
        "text": "Use a stable endpoint from the controlled test environment. This illustrative Java test assumes a REST Assured dependency and a configured TEST_API_URL."
      },
      {
        "code": "import static io.restassured.RestAssured.given;\nimport org.junit.jupiter.api.Test;\n\nclass HealthCheck {\n    @Test\n    void returnsOk() {\n        given().baseUri(System.getenv(\"TEST_API_URL\"))\n            .when().get(\"/health\")\n            .then().statusCode(200);\n    }\n}"
      }
    ]
  },
  {
    "id": 111,
    "topic": "API Automation & REST Assured",
    "prompt": "How do you integrate API automation tests with your web automation framework?",
    "answer": [
      {
        "text": "Put API calls behind focused clients and expose them through fixtures. Seed and clean up records via API so UI tests can focus on what users do. Keep API-only tests independently runnable. In Playwright the browser context request object can share session cookies, while a standalone API context can use separate credentials."
      }
    ]
  },
  {
    "id": 112,
    "topic": "API Automation & REST Assured",
    "prompt": "How do you handle authentication, request payloads and response validation in API testing?",
    "answer": [
      {
        "text": "Inject scoped test credentials through CI, obtain tokens through the supported flow, and exclude them from logs. Build payloads with typed models or templates and per-test values. Assert the contract and meaningful response data, including invalid tokens, permissions and malformed payloads."
      }
    ]
  },
  {
    "id": 113,
    "topic": "Selenium Automation Framework & Cucumber BDD",
    "prompt": "Can you explain the architecture and folder structure of the Selenium automation framework you worked on?",
    "answer": [
      {
        "text": "Describe the framework you actually worked on or state that you’re using a representative layout. In a Java project, Java runners, hooks and page objects often live under src/test/java, with features or fixtures under src/test/resources. Follow one test from a scenario through browser actions and evidence in CI."
      }
    ]
  },
  {
    "id": 114,
    "topic": "Selenium Automation Framework & Cucumber BDD",
    "prompt": "Have you developed a Selenium automation framework from scratch? Walk me through its implementation.",
    "answer": [
      {
        "text": "State which components you designed, extended or led. A representative build order is dependencies and runner, driver lifecycle, one test, page objects and waits, then test data, parallel execution, reporting and CI. Explain an actual trade-off or label your design as proposed."
      }
    ]
  },
  {
    "id": 115,
    "topic": "Selenium Automation Framework & Cucumber BDD",
    "prompt": "What are the key components of your Selenium automation framework?",
    "answer": [
      {
        "text": "A typical framework has a build and test runner, browser lifecycle management, page or component objects, test data and environment config, synchronisation, assertions, reporting and CI. If it uses Cucumber, features and glue connect business behaviour to Selenium code."
      }
    ]
  },
  {
    "id": 116,
    "topic": "Selenium Automation Framework & Cucumber BDD",
    "prompt": "Can you explain the architecture and folder structure of your Cucumber BDD framework?",
    "answer": [
      {
        "text": "Feature files are grouped by business capability. Glue contains step definitions and hooks. Steps call page objects or API clients, with scenario-scoped state for sharing data. The runner configures discovery, tags and reporting. Describe where these components live in your actual project."
      }
    ]
  },
  {
    "id": 117,
    "topic": "Selenium Automation Framework & Cucumber BDD",
    "prompt": "What is the purpose of feature files in Cucumber?",
    "answer": [
      {
        "text": "Feature files specify observable business behaviour with examples in language that product, engineering and QA can review together. The linked step definitions make those scenarios executable. Keep the scenarios focused on outcomes and business rules."
      }
    ]
  },
  {
    "id": 118,
    "topic": "Selenium Automation Framework & Cucumber BDD",
    "prompt": "Which language and format are used to write Cucumber feature scenarios?",
    "answer": [
      {
        "text": "Use Gherkin in plain-text .feature files. Key constructs include Feature, Scenario, Scenario Outline, Examples and Given/When/Then. Use Scenario Outline for meaningful input and outcome variations that follow the same rule."
      }
    ]
  },
  {
    "id": 119,
    "topic": "Selenium Automation Framework & Cucumber BDD",
    "prompt": "What are Given, When and Then in Cucumber BDD?",
    "answer": [
      {
        "text": "Given establishes context, When describes an action or event, and Then describes the expected outcome. For example, given a shipment awaiting approval, when a reviewer approves it, then its status becomes Approved."
      }
    ]
  },
  {
    "id": 120,
    "topic": "Selenium Automation Framework & Cucumber BDD",
    "prompt": "How do you connect feature files with step definition files?",
    "answer": [
      {
        "text": "Configure the runner to locate features and glue. Cucumber matches the step text against a Cucumber Expression or regular expression and passes captured parameters to the step method. A missing match is undefined; multiple matches are ambiguous."
      },
      {
        "code": "@Given(\"shipment {string} is pending\")\npublic void shipmentIsPending(String shipmentId) {\n    shipmentFixtures.createPending(shipmentId);\n}"
      }
    ]
  },
  {
    "id": 121,
    "topic": "Selenium Automation Framework & Cucumber BDD",
    "prompt": "How do you integrate Cucumber with Selenium and TestNG or JUnit?",
    "answer": [
      {
        "text": "Add Cucumber Java and the appropriate integration dependency. With TestNG, use a runner extending AbstractTestNGCucumberTests. With JUnit 5, run using the Cucumber JUnit Platform engine and suite configuration. Hooks or fixtures own WebDriver lifecycle. Each scenario needs its own driver or properly isolated equivalent in parallel execution."
      }
    ]
  },
  {
    "id": 122,
    "topic": "Git & Version Control",
    "prompt": "Which Git commands do you use regularly as an automation engineer?",
    "answer": [
      {
        "text": "Use status, diff and log to inspect changes. Use switch, add and commit for local work, fetch to update remote references and push to share branches. Use merge or rebase according to team conventions."
      }
    ]
  },
  {
    "id": 123,
    "topic": "Git & Version Control",
    "prompt": "How do you manage source code in a Git repository and collaborate with team members?",
    "answer": [
      {
        "text": "Use short-lived branches, clear commits, pull requests and required checks. Review test intent, isolation and maintainability. Protect the default branch and keep generated results, session files and secrets out of Git."
      }
    ]
  },
  {
    "id": 124,
    "topic": "Git & Version Control",
    "prompt": "What is the difference between Git merge and Git rebase?",
    "answer": [
      {
        "text": "Merge integrates histories and can create a merge commit when histories diverge. Rebase replays commits onto a different base, creating new commit IDs. Rebase your private branch where team policy permits; coordinate before rewriting a branch other people use."
      }
    ]
  },
  {
    "id": 125,
    "topic": "Git & Version Control",
    "prompt": "What is Git stash, and how do you use it in your daily development workflow?",
    "answer": [
      {
        "text": "Stash temporarily saves uncommitted changes so you can switch tasks. Use git stash push -u -m \"WIP upload checks\" to include untracked work. Inspect with git stash list and restore with git stash apply or git stash pop. Conflicts can still occur on restoration."
      }
    ]
  },
  {
    "id": 126,
    "topic": "Git & Version Control",
    "prompt": "How do you resolve merge conflicts when working with pull requests?",
    "answer": [
      {
        "text": "Fetch the target branch, integrate it using the team’s merge or rebase convention, and inspect each conflict in context. Preserve the intended behaviour from both changes. Stage the resolved files, finish the merge or rebase, run targeted and relevant regression checks, then update the pull request branch."
      }
    ]
  },
  {
    "id": 127,
    "topic": "Git & Version Control",
    "prompt": "What steps do you follow to create a feature branch, commit changes and raise a pull request?",
    "answer": [
      {
        "text": "Start from the current default branch, create a named branch and implement one coherent change. Review the diff, stage files, commit, push with upstream tracking and open a pull request with the purpose, validation results and any reviewer context."
      },
      {
        "code": "git fetch origin\ngit switch -c qa/upload-coverage origin/main\ngit add tests/upload.spec.js\ngit commit -m \"Cover document upload validation\"\ngit push -u origin qa/upload-coverage"
      }
    ]
  },
  {
    "id": 128,
    "topic": "CI/CD & Jenkins Integration",
    "prompt": "How do you integrate your Playwright automation framework with Jenkins?",
    "answer": [
      {
        "text": "Version the pipeline with the tests. Check out the code, install locked dependencies, supply a compatible browser runtime, run a named test selection and publish evidence even on failure. Jenkins expresses this in a Jenkinsfile, while GitHub Actions uses a workflow. Describe the system you’ve used and map the stages to Jenkins when asked."
      }
    ]
  },
  {
    "id": 129,
    "topic": "CI/CD & Jenkins Integration",
    "prompt": "How do you configure and execute Playwright tests through a CI/CD pipeline?",
    "answer": [
      {
        "text": "Run a small PR smoke suite and schedule wider regression only if the project needs it. Define environment, tags, project and workers explicitly. Install browsers on a compatible Linux agent, or use an image already matched to the npm package. Example stages for a Jenkins agent with Node, npm and supported browser prerequisites:"
      },
      {
        "code": "pipeline {\n  agent { label 'playwright-linux' }\n  environment { CI = 'true' }\n  stages {\n    stage('Install') {\n      steps {\n         sh 'npm ci'\n         sh 'npx playwright install chromium'\n      }\n    }\n    stage('Test') {\n      steps { sh 'npx playwright test --project=chromium' }\n    }\n  }\n  post {\n    always {\n      archiveArtifacts artifacts: 'playwright-report/**,test-results/**',\n                        allowEmptyArchive: true\n      junit 'test-results/junit.xml'\n    }\n  }\n}"
      },
      {
        "text": "Configure a Playwright JUnit reporter with outputFile set to test-results/junit.xml and include HTML if you archive it. Jenkins’s default checkout assumes the job is loaded from SCM."
      }
    ]
  },
  {
    "id": 130,
    "topic": "CI/CD & Jenkins Integration",
    "prompt": "How do you manage environment variables, credentials and configuration settings in Jenkins?",
    "answer": [
      {
        "text": "Use environment variables or parameters for values such as the base URL. Store secrets in Jenkins Credentials and bind them only around the steps that need them. Avoid printing secrets or interpolating them into Groovy strings. Keep application config validated and choose an appropriate test account for the target environment."
      }
    ]
  },
  {
    "id": 131,
    "topic": "CI/CD & Jenkins Integration",
    "prompt": "How do you publish and analyse automation execution reports in Jenkins?",
    "answer": [
      {
        "text": "Configure JUnit XML for Jenkins trends and publish it with the junit step. Archive the HTML report and failure artifacts so reviewers can inspect traces or screenshots. Compare failure groups, browser projects and execution duration. Track retry outcomes separately when the CI summary hides first-attempt failures."
      }
    ]
  },
  {
    "id": 132,
    "topic": "CI/CD & Jenkins Integration",
    "prompt": "How do you troubleshoot test failures that occur only during CI/CD execution?",
    "answer": [
      {
        "text": "Reproduce using the runner image, lockfile, browser, network and environment variables. Check time zone, CPU, memory, permissions and concurrent data. Compare trace and logs with a passing run. Isolate differences one at a time, then confirm the fix under the original CI conditions."
      }
    ]
  },
  {
    "id": 133,
    "topic": "CI/CD & Jenkins Integration",
    "prompt": "How do you manage code changes and prepare an automation framework for continuous integration?",
    "answer": [
      {
        "text": "Use pull requests and predictable install and test commands. Pin dependencies with the lockfile and keep environment configuration separate. Ensure tests start from clean state, return meaningful exit status, and publish evidence after failures. Validate a fresh checkout so CI does not rely on files or accounts available only on a developer machine."
      },
      {
        "text": "In Jenkins, implement those stages in a Jenkinsfile. In GitHub Actions, place them in a workflow with a report-upload step that runs after failure. The key evidence is the same: execution status, environment and enough artifacts to diagnose failures."
      }
    ]
  },
  {
    "id": 134,
    "topic": "Quality Assurance & Agile Methodology",
    "prompt": "What is the role of a QA engineer during sprint planning?",
    "answer": [
      {
        "text": "Help clarify acceptance criteria and risks, identify test data and environment dependencies, and estimate test work with the team. Agree on which checks can run earlier or at a lower layer. Surface scope, observability and release tradeoffs before the sprint commits to delivery."
      }
    ]
  },
  {
    "id": 135,
    "topic": "Quality Assurance & Agile Methodology",
    "prompt": "How do you plan and execute regression testing in your project?",
    "answer": [
      {
        "text": "Use the change scope, dependency map, incident history and business impact to select tests. Run critical smoke checks first, add targeted API and UI coverage and use exploratory testing for unfamiliar risks. Communicate remaining coverage and release risks with evidence."
      }
    ]
  },
  {
    "id": 136,
    "topic": "Quality Assurance & Agile Methodology",
    "prompt": "How do you identify test cases suitable for automation?",
    "answer": [
      {
        "text": "Prioritise high-value checks that repeat, have stable expectations and can run on deterministic data. Compare maintenance and infrastructure cost with execution frequency and defect impact. Keep exploratory, subjective or rapidly changing checks manual where appropriate."
      }
    ]
  },
  {
    "id": 137,
    "topic": "Quality Assurance & Agile Methodology",
    "prompt": "How do you decide which automation tool is best suited for a project?",
    "answer": [
      {
        "text": "Define the platform and risks first. Shortlist feasible tools, then implement a representative flow in each with realistic CI and data needs. Compare reliability, debugging and maintenance, and select based on the team’s ability to own the tool over time."
      }
    ]
  },
  {
    "id": 138,
    "topic": "Quality Assurance & Agile Methodology",
    "prompt": "What factors do you consider when selecting an automation testing tool?",
    "answer": [
      {
        "text": "Consider supported platforms and browsers, test layers, team languages, testability, CI and device integration, reporting, runtime, maintainability, accessibility needs, licensing and community support. Weight factors by project priority and validate the highest-risk assumption with a small proof of concept."
      }
    ]
  },
  {
    "id": 139,
    "topic": "Quality Assurance & Agile Methodology",
    "prompt": "How do you measure the effectiveness and coverage of your automation suite?",
    "answer": [
      {
        "text": "Map coverage to critical journeys, rules and integrations, then track first-pass reliability, meaningful defect detection, maintenance burden and feedback time. A high pass rate alone says little about gaps. Compare improvements against the same scope and measure flaky retries separately."
      }
    ]
  },
  {
    "id": 140,
    "topic": "Emerging Technologies – AI & LLM Concepts",
    "prompt": "What is Retrieval-Augmented Generation (RAG)?",
    "answer": [
      {
        "text": "RAG retrieves relevant external material at question time and supplies it as context to a language model. In QA, it could pull product specs or test standards before drafting scenarios. Evaluate retrieval relevance, answer grounding and how the system behaves when evidence is missing."
      }
    ]
  },
  {
    "id": 141,
    "topic": "Emerging Technologies – AI & LLM Concepts",
    "prompt": "What are vector databases, and how are they used in AI applications?",
    "answer": [
      {
        "text": "They store embedding vectors and can retrieve nearby vectors by a similarity or distance measure. AI applications use them for semantic document search and RAG. Metadata filters, keyword search and reranking can improve relevance and enforce scope where the application is designed to apply those filters."
      }
    ]
  },
  {
    "id": 142,
    "topic": "Emerging Technologies – AI & LLM Concepts",
    "prompt": "What is Model Context Protocol (MCP), and what problem does it solve?",
    "answer": [
      {
        "text": "MCP standardises how an AI host connects through clients to servers that expose capabilities such as tools, resources and prompts. It reduces bespoke integration work. For example, a QA assistant could read approved test documentation and query issue metadata through supported MCP connections."
      }
    ]
  },
  {
    "id": 143,
    "topic": "Emerging Technologies – AI & LLM Concepts",
    "prompt": "What is token optimisation in LLMs, and why is it important?",
    "answer": [
      {
        "text": "Token optimisation reduces unnecessary model input and output within the context limit, which can lower cost and latency. Retrieve only relevant chunks, deduplicate context, shorten repetitive examples and cache repeated prefixes where supported. Measure accuracy and completeness alongside token count to catch regressions."
      }
    ]
  },
  {
    "id": 144,
    "topic": "QA Fundamentals & Manual Testing",
    "prompt": "How would you test a checkout flow before release?",
    "answer": [
      {
        "text": "Start with the highest-risk outcomes: a customer is charged the correct amount, exactly one order is created, and the confirmation matches the order. Then test declined payments, duplicate submissions, expired carts, inventory changes, and what happens when the payment outcome is uncertain."
      },
      {
        "text": "Use a payment sandbox. For a declined payment, check the customer message, absence of a completed order, and whether the cart can be retried. For a timeout, verify that retrying does not create a duplicate charge or order. Automate repeatable pricing and order checks at the API layer, keep one browser smoke test, and explore recovery paths manually."
      }
    ]
  },
  {
    "id": 145,
    "topic": "QA Fundamentals & Manual Testing",
    "prompt": "How do you design boundary and equivalence partition tests?",
    "answer": [
      {
        "text": "Group inputs that should behave the same way, then test representative inputs from each group and the points where behaviour changes."
      },
      {
        "text": "Suppose free shipping starts at Rp100,000 before discounts. Check Rp99,999, Rp100,000, and Rp100,001. Also check a representative amount in each group. Ask which amount the business rule uses if taxes, discounts, or rounding can change the threshold result."
      }
    ]
  },
  {
    "id": 146,
    "topic": "QA Fundamentals & Manual Testing",
    "prompt": "How would you run an exploratory testing session for checkout?",
    "answer": [
      {
        "text": "Set a time limit and a charter such as ‘Explore how shoppers recover from interrupted checkout.’ Vary one condition at a time, collect evidence, and record coverage, findings, and questions."
      },
      {
        "text": "Try back navigation during payment, switching networks, and re-opening the cart in a second tab. Look for duplicate orders, confusing status, and lost cart data. Debrief by naming the highest risk and the checks worth repeating."
      }
    ]
  },
  {
    "id": 147,
    "topic": "QA Fundamentals & Manual Testing",
    "prompt": "How do you write a defect report that a developer can act on?",
    "answer": [
      {
        "text": "Include a specific title, impact, environment and build, test data, reproduction steps, expected and actual results, and evidence. Record how often it happens if it is intermittent."
      },
      {
        "text": "For example, ‘Retry after payment timeout creates two orders’ is more actionable than ‘Checkout broken.’ Include two redacted order IDs and the request timeline if available. State whether the customer was charged and which part is still unverified."
      }
    ]
  },
  {
    "id": 148,
    "topic": "QA Fundamentals & Manual Testing",
    "prompt": "How do you validate an order API response without testing through the UI?",
    "answer": [
      {
        "text": "Check the status, payload, and relationship between the request and response. Then fetch the order independently to verify the expected record was saved, and test an invalid request alongside the happy path."
      },
      {
        "text": "For a create-order request, a 201 and an ID are only the first checks. Read the order by its ID, assert items and total, and check duplicate submission behaviour against the API contract."
      }
    ]
  },
  {
    "id": 149,
    "topic": "QA Fundamentals & Manual Testing",
    "prompt": "How would you give a release recommendation when checkout testing is incomplete?",
    "answer": [
      {
        "text": "State what was tested, which important paths remain unverified, what the customer or business impact could be, and your recommendation. Name the decision owner and what evidence would change your recommendation."
      },
      {
        "text": "If duplicate charges are still possible and rollback takes hours, recommend holding the release. If the remaining gap is low impact and the feature can be disabled quickly, explain the conditions under which release could proceed and how the team will monitor it."
      }
    ]
  }
];

export const topics = [
  "Professional Experience & Project Discussion",
  "Playwright Fundamentals & Architecture",
  "Locators & Web Element Handling",
  "Handling Browser Events, Tabs & Pop-ups",
  "File Uploads & Downloads",
  "Assertions & Validation",
  "Synchronisation, Waits & Asynchronous Operations",
  "Playwright Test Runner, Fixtures & Hooks",
  "Parallel Execution & Test Execution Optimisation",
  "Debugging, Reporting & Flaky Test Management",
  "Playwright Framework Design & Page Object Model",
  "JavaScript Fundamentals for Playwright",
  "Practical Playwright Coding Scenarios",
  "API Automation & REST Assured",
  "Selenium Automation Framework & Cucumber BDD",
  "Git & Version Control",
  "CI/CD & Jenkins Integration",
  "Quality Assurance & Agile Methodology",
  "Emerging Technologies – AI & LLM Concepts",
  "QA Fundamentals & Manual Testing"
];

export const tracks = [
  {
    "id": "all",
    "name": "All questions",
    "numbers": null
  },
  {
    "id": "core",
    "name": "Core questions",
    "numbers": [
      1,
      10,
      14,
      17,
      19,
      20,
      28,
      33,
      38,
      41,
      44,
      48,
      52,
      60,
      66,
      71,
      74,
      79,
      98,
      108,
      124,
      133,
      135,
      136,
      139
    ]
  },
  {
    "id": "junior",
    "name": "Junior QA",
    "numbers": [
      1,
      10,
      134,
      135,
      136,
      14,
      17,
      19,
      20,
      38,
      41,
      44,
      33,
      43,
      48,
      98,
      108,
      122
    ]
  },
  {
    "id": "sdet",
    "name": "Automation Engineer or SDET",
    "numbers": [
      23,
      25,
      28,
      41,
      44,
      48,
      52,
      56,
      60,
      62,
      66,
      79,
      84,
      111,
      94,
      98,
      100,
      106,
      108,
      124,
      71,
      133
    ]
  },
  {
    "id": "lead",
    "name": "Senior or Lead QA",
    "numbers": [
      10,
      133,
      135,
      136,
      137,
      139,
      65,
      66,
      67,
      68,
      77,
      84,
      71,
      74,
      76,
      131,
      132
    ]
  },
  {
    "id": "fundamentals",
    "name": "QA Fundamentals",
    "numbers": [
      144,
      145,
      146,
      147,
      148,
      149,
      134,
      135,
      136,
      108,
      139
    ]
  }
];

export const mocks = [
  {
    "id": "junior",
    "name": "Junior QA",
    "questions": [
      {
        "id": 1,
        "minutes": 5,
        "prompt": "Give a concise overview of your QA experience or practice project.",
        "criteria": [
          "Names the product or project and personal scope",
          "gives one specific quality contribution",
          "backs it with an observed result or learning"
        ],
        "followup": "What would you improve if you repeated the project?"
      },
      {
        "id": 136,
        "minutes": 7,
        "prompt": "Which checks for a signup flow would you automate first?",
        "criteria": [
          "Identifies high-risk and repeated checks",
          "chooses UI and API coverage with a reason",
          "names one case that benefits from manual exploration"
        ],
        "followup": "How would you test duplicate registration?"
      },
      {
        "id": 44,
        "minutes": 8,
        "prompt": "A Save button is clickable, but the new record appears a second later. How do you synchronise the test?",
        "criteria": [
          "Distinguishes click readiness from save completion",
          "waits for an observable outcome",
          "describes how a timeout would help diagnose the failure"
        ],
        "followup": "What if the API returns success but the UI never updates?"
      },
      {
        "id": 108,
        "minutes": 8,
        "prompt": "A create-order endpoint returns HTTP 201. What else would you check?",
        "criteria": [
          "Checks key response fields and headers as applicable",
          "verifies the persisted record or side effect",
          "describes a negative test with an expected outcome"
        ],
        "followup": "How would you prove rejected requests leave no order?"
      }
    ]
  },
  {
    "id": "sdet",
    "name": "Automation Engineer or SDET",
    "questions": [
      {
        "id": 25,
        "minutes": 5,
        "prompt": "Two orders have identical Edit buttons. How do you target the right one?",
        "criteria": [
          "Scopes to a stable business key",
          "uses the child Edit control within the right row",
          "checks the edited record or resulting state"
        ],
        "followup": "How would you handle a paginated table?"
      },
      {
        "id": 98,
        "minutes": 7,
        "prompt": "Write a login smoke test for a test environment.",
        "criteria": [
          "Uses injected credentials and stable locators",
          "waits on the protected destination or user-visible state",
          "leaves session and data isolation clear"
        ],
        "followup": "How would you distinguish an invalid credential from an environment outage?"
      },
      {
        "id": 66,
        "minutes": 8,
        "prompt": "Parallel tests sometimes edit each other’s data. How would you fix that?",
        "criteria": [
          "Identifies the shared resource and reproduces the collision",
          "isolates data or accounts with run-safe IDs",
          "verifies cleanup and repeated concurrent runs"
        ],
        "followup": "How would your identifiers work across CI shards?"
      },
      {
        "id": 71,
        "minutes": 8,
        "prompt": "A browser test passes locally but fails only in CI. Talk through your diagnosis.",
        "criteria": [
          "Collects trace, logs and versions",
          "isolates one difference such as time zone, data or concurrency",
          "verifies the fix under the original CI conditions"
        ],
        "followup": "What would you do if the test only fails with four workers?"
      }
    ]
  },
  {
    "id": "lead",
    "name": "Senior or Lead QA",
    "questions": [
      {
        "id": 135,
        "minutes": 5,
        "prompt": "You have two hours before release and regression is incomplete. What do you do?",
        "criteria": [
          "Prioritises based on changed areas and business impact",
          "names coverage gaps and mitigation",
          "communicates a recommendation and who makes the release decision"
        ],
        "followup": "What would change if rollback were slow?"
      },
      {
        "id": 68,
        "minutes": 7,
        "prompt": "A suite has 50 upload scenarios and runs too slowly. How would you make it faster?",
        "criteria": [
          "Measures setup, case duration and failures",
          "retains critical UI coverage and moves contract checks to cheaper layers",
          "benchmarks changes against equivalent scope and stability"
        ],
        "followup": "Which upload cases would you keep in the browser and why?"
      },
      {
        "id": 74,
        "minutes": 8,
        "prompt": "A critical CI check fails intermittently and then passes on retry. How do you manage it?",
        "criteria": [
          "Tracks first-attempt failures and collects evidence",
          "assigns ownership and a time-bounded mitigation",
          "explains how critical coverage and re-entry are verified"
        ],
        "followup": "Who decides when the check can block releases again?"
      },
      {
        "id": 139,
        "minutes": 8,
        "prompt": "Leadership asks whether automation is improving release quality. How would you answer?",
        "criteria": [
          "Maps coverage to critical product risks",
          "reports reliability and feedback time along with defect signals",
          "defines a baseline and one follow-up decision"
        ],
        "followup": "What would you investigate if the pass rate rose while escaped defects increased?"
      }
    ]
  }
];

export const references = [
  {
    "text": "Playwright locators",
    "url": "https://playwright.dev/docs/locators"
  },
  {
    "text": "Auto-waiting and actionability",
    "url": "https://playwright.dev/docs/actionability"
  },
  {
    "text": "Playwright assertions",
    "url": "https://playwright.dev/docs/test-assertions"
  },
  {
    "text": "Tabs and popups",
    "url": "https://playwright.dev/docs/pages"
  },
  {
    "text": "Input actions and file uploads",
    "url": "https://playwright.dev/docs/input"
  },
  {
    "text": "Downloads",
    "url": "https://playwright.dev/docs/downloads"
  },
  {
    "text": "Fixtures",
    "url": "https://playwright.dev/docs/test-fixtures"
  },
  {
    "text": "Test configuration",
    "url": "https://playwright.dev/docs/test-configuration"
  },
  {
    "text": "Screenshots, video and trace options",
    "url": "https://playwright.dev/docs/test-use-options"
  },
  {
    "text": "Parallel execution",
    "url": "https://playwright.dev/docs/test-parallel"
  },
  {
    "text": "Sharding",
    "url": "https://playwright.dev/docs/test-sharding"
  },
  {
    "text": "Trace Viewer",
    "url": "https://playwright.dev/docs/trace-viewer-intro"
  },
  {
    "text": "Authentication",
    "url": "https://playwright.dev/docs/auth"
  },
  {
    "text": "JavaScript await",
    "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await"
  },
  {
    "text": "JavaScript Promise.allSettled()",
    "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled"
  },
  {
    "text": "Playwright API testing",
    "url": "https://playwright.dev/docs/api-testing"
  },
  {
    "text": "REST Assured usage",
    "url": "https://github.com/rest-assured/rest-assured/wiki/Usage"
  },
  {
    "text": "Cucumber reference",
    "url": "https://cucumber.io/docs/cucumber/api/"
  },
  {
    "text": "Git rebase",
    "url": "https://git-scm.com/docs/git-rebase"
  },
  {
    "text": "Playwright CI setup",
    "url": "https://playwright.dev/docs/ci-intro"
  },
  {
    "text": "Jenkins tests and artifacts",
    "url": "https://www.jenkins.io/doc/pipeline/tour/tests-and-artifacts/"
  },
  {
    "text": "Jenkins Credentials Binding",
    "url": "https://www.jenkins.io/doc/pipeline/steps/credentials-binding/"
  },
  {
    "text": "Model Context Protocol architecture",
    "url": "https://modelcontextprotocol.io/docs/learn/architecture"
  }
];
