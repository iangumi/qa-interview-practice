# QA Interview Practice

[Open the practice site](https://iangumi.github.io/qa-interview-practice/)

An interactive study companion for QA and SDET interviews. It includes 143 questions and answers, three role-based paths, a 25-question core set, and three scored mock interviews.

- Search by question, topic, or question ID.
- Reveal answers after attempting them. Mark questions as understood, needing review, or skipped.
- Start a five-question practice session from the selected study path and get a recap.
- Use timed or untimed mocks and grade each answer against three criteria.
- Revisit completed mock scores and add questions with missed rubric items to review.
- [Run the flaky save lab](lab/) with a starter test and reference solution.
- Study progress and completed mock scores are saved in the current browser.

## Run locally

The site uses static HTML, CSS, and native JavaScript modules. No install or build step is needed. Serve the repository root over HTTP:

```sh
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Contribute

The question bank, study paths, and mock rubrics are in `bank.js`. Keep existing question IDs stable so links and saved progress continue to work. For new answers, explain the principle first and label examples that depend on a specific tool or environment. Please describe any corrections in a pull request or GitHub issue.
