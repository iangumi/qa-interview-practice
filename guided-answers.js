export const guidedAnswers = {
  71: {
    example: "I’d collect the failing trace, logs, and environment details, then compare them with a passing run. If the failure happens only with four workers, I’d look for shared records or accounts and reproduce the collision at that concurrency. After isolating the data, I’d repeat the original CI job with the same browser and worker settings and check first-attempt results.",
    criteria: [
      ["Gather concrete evidence", "Name the trace, the first failing assertion, and at least one runner or browser detail you would compare with a passing run."],
      ["Isolate one plausible cause", "State a hypothesis and a check that could disprove it. For example, rerun with unique accounts at the original worker count."],
      ["Verify under the original CI conditions", "Repeat the original job with the same worker count, browser, and environment. Look at first-attempt failures as well as final outcomes."],
    ],
  },
  108: {
    example: "For a create-order API, I’d assert the documented status, content type, and meaningful fields such as the order ID and total. I’d then fetch the order by ID to check that it was saved correctly. I’d also test an invalid request and verify it creates no order.",
    criteria: [
      ["Check the response contract", "Name the expected status and a relevant header or schema requirement. For example, expect 201 and a JSON response."],
      ["Assert meaningful data", "Use a concrete business expectation, such as the correct order amount or line items, in addition to checking that an ID exists."],
      ["Verify persisted state independently", "Read the order by its returned ID and check the stored data. For an invalid request, check that the documented rejection leaves no order."],
    ],
  },
  135: {
    example: "I’d review the changes, integrations, and recent incidents, then prioritise critical flows. For a checkout change I’d run a smoke purchase, check payment and order rules through the API, and explore retry behaviour. Before release I’d report which risks are covered, which remain open, and the recommendation I’d give the release owner.",
    criteria: [
      ["Prioritise by change and business risk", "Name at least one changed area, what it could break, and why that flow goes first."],
      ["Choose complementary checks", "Describe what to run at the UI or API layer and where exploratory testing would add coverage."],
      ["Communicate remaining release risk", "State what was skipped and how that affects your go, hold, or conditional release recommendation."],
    ],
  },
};
