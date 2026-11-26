# QA Interview Practice

[Open the practice site](https://iangumi.github.io/qa-interview-practice/)

An interactive study companion for QA and SDET interviews. It includes 161 questions and answers, QA Fundamentals and SQL & Database Testing paths, three role-based paths, a 25-question core set, and three scored mock interviews.

- Browse questions by topic and filter by study path, review status, or search term.
- Reveal answers after attempting them. Mark questions as understood, needing review, or skipped.
- Practise short spoken answers for the core set, then expand the explanation or explore related questions.
- Start a five-question practice session from the selected study path and get a recap.
- Resume the last question and study path from the homepage.
- Review missed questions after one day. Successful reviews are scheduled at intervals of up to 30 days.
- Write and self-check guided answers for CI-only failures, API assertions, and regression planning.
- Use timed or untimed mocks, answer the follow-up, then reveal the rubric. Optional notes stay in the open mock.
- Revisit completed mock scores and add questions with missed rubric items to review.
- [Run the flaky save lab](lab/) with a starter test and reference solution.
- [Run the API persistence lab](lab/api/) or practise a manual checkout release case on the site.
- [Run the SQL checkout lab](lab/sql/) to reconcile orders, payment attempts, and API responses in SQLite.
- Use Progress to see self-ratings by topic, first and latest mock scores, and a suggested next task.
- Study progress and completed mock scores are saved in the current browser.
- Use My Interviews to save questions by session, practise them, and export questions with optional suggested answers to PDF. Sessions stay in the current browser.

## Run locally

The site uses static HTML, CSS, and native JavaScript modules. No install or build step is needed. Serve the repository root over HTTP:

```sh
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Contribute

The question bank, study paths, and mock rubrics are in `bank.js`. Short answers and related-question groups are in `answer-guide.js`. Keep existing question IDs stable so links and saved progress continue to work. For new answers, explain the principle first and label examples that depend on a specific tool or environment. Please describe any corrections in a pull request or GitHub issue.
