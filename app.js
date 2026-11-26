import { questions, topics, tracks, mocks, references } from "./bank.js";
import { relatedGroups, shortAnswers } from "./answer-guide.js";
import { guidedAnswers } from "./guided-answers.js";
import { initRadar, radarWidget, paintVote, recentQuestions, radarDate, radarMessage } from "./radar-ui.js";

const el = id => document.getElementById(id);
const questionLabel = id => "Q" + String(id).padStart(3, "0");
const key = "qa-interview-practice.progress.v1";
const mockKey = "qa-interview-practice.mocks.v1";
const reviewKey = "qa-interview-practice.review.v1";
const resumeKey = "qa-interview-practice.resume.v1";
const guidedKey = "qa-interview-practice.guided.v1";
const firstMockKey = "qa-interview-practice.first-mock.v1";
const day = 24 * 60 * 60 * 1000;
const reviewIntervals = [3, 7, 14, 30];
const grades = ["Got it", "Needs review", "Skipped"];
const gradeValues = ["got-it", "review", "skipped"];
const byId = new Map(questions.map(question => [question.id, question]));

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function button(label, action, className) {
  const control = element("button", label, className);
  control.type = "button";
  control.addEventListener("click", action);
  return control;
}

function readLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

const progress = Object.fromEntries(Object.entries(readLocal(key) ?? {}).filter(
  ([id, grade]) => byId.has(Number(id)) && gradeValues.includes(grade)
));
const schedule = Object.fromEntries(Object.entries(readLocal(reviewKey) ?? {}).filter(
  ([id, entry]) => byId.has(Number(id)) && Number.isFinite(entry?.at) && !Number.isNaN(new Date(entry.at).getTime()) &&
    Number.isInteger(entry.step) && entry.step >= 0 && entry.step < reviewIntervals.length
));
let resume = readLocal(resumeKey);
const mockHistory = readMockHistory();
const guidedResults = Object.fromEntries(Object.entries(readLocal(guidedKey) ?? {}).filter(
  ([id, score]) => Object.hasOwn(guidedAnswers, id) && Number.isInteger(score) && score >= 0 && score <= guidedAnswers[id].criteria.length
));
const savedFirstMockScores = readLocal(firstMockKey);
const firstMockScores = Object.fromEntries(mocks.flatMap(mock => {
  const stored = savedFirstMockScores?.[mock.id];
  const earliest = mockHistory.findLast(result => result.mockId === mock.id);
  const max = mock.questions.reduce((total, item) => total + item.criteria.length, 0);
  if (Number.isInteger(stored) && stored >= 0 && stored <= max) return [[mock.id, stored]];
  return earliest ? [[mock.id, countPoints(earliest.scores)]] : [];
}));
const guidedDrafts = new Map();
let selectedTrack = tracks[0];
let reviewFilter = "";
let currentId = questions[0].id;
let visibleQuestions = [];
let answerVisible = false;
let storageAvailable = true;
if (Object.keys(firstMockScores).length) saveLocal(firstMockKey, firstMockScores);
let quickSession = null;
let attempt = null;
let timerInterval = 0;
let timed = true;

const searchInput = el("search");
const topicSelect = el("topics");
const matchSelect = el("matches");
const questionCard = el("question");
const mockContent = el("mock-content");
const pathDescriptions = {
  fundamentals: "Test design, exploratory testing, API validation, and release decisions.",
  sql: "SQL queries, database checks, and checkout reconciliation.",
  junior: "Testing essentials, browser basics, and your first automation checks.",
  sdet: "Automation frameworks, Playwright, API testing, and CI.",
  lead: "Test strategy, release risk, and decisions about automation.",
};
for (const [id, description] of Object.entries(pathDescriptions)) {
  const track = tracks.find(item => item.id === id);
  const link = element("a", undefined, "home-path");
  link.href = "#start-" + id;
  link.append(element("strong", track.name), element("span", description));
  el("home-paths").append(link);
}

function option(value, label) {
  const node = element("option", label);
  node.value = value;
  return node;
}

topicSelect.append(option("", "All topics"), ...topics.map(topic => option(topic, topic)));
el("mobile-track").append(...tracks.map(track => option(track.id, track.name)));
el("browse-track").append(...tracks.map(track => option(track.id, track.name)));
el("browse-topic").append(option("", "All topics"), ...topics.map(topic => option(topic, topic)));
el("progress-track").append(...tracks.filter(track => track.id !== "all").map(track => option(track.id, track.name)));
const lastTrack = resumeTrack();
el("progress-track").value = lastTrack?.numbers ? lastTrack.id : "fundamentals";
el("progress-track").addEventListener("change", renderReadiness);
for (const track of tracks) {
  const control = button(track.name, () => selectTrack(track));
  control.dataset.track = track.id;
  el("tracks").append(control);
}
for (const reference of references) {
  const item = element("li");
  const link = element("a", reference.text);
  link.href = reference.url;
  item.append(link);
  el("references").append(item);
}

function selectTrack(track, id = track.numbers?.[0] ?? questions[0].id) {
  quickSession = null;
  el("quick-empty").textContent = "";
  selectedTrack = track;
  reviewFilter = "";
  searchInput.value = "";
  topicSelect.value = "";
  currentId = id;
  updateFilters();
}

function saveLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    storageAvailable = false;
  }
}

function saveProgress() {
  saveLocal(key, progress);
  saveLocal(reviewKey, schedule);
  renderProgress();
}

function isDue(id, now = Date.now()) {
  if (schedule[id]) return schedule[id].at <= now;
  return progress[id] === "review";
}

function recordSchedule(id, grade) {
  const now = Date.now();
  const previous = schedule[id];
  if (grade === "skipped") return;
  if (grade === "review") {
    schedule[id] = { at: now + day, step: 0 };
  } else if (!previous || previous.at <= now) {
    const step = previous && progress[id] === "got-it" ? Math.min(previous.step + 1, reviewIntervals.length - 1) : 0;
    schedule[id] = { at: now + day * reviewIntervals[step], step };
  }
}

function renderReviewDate() {
  const date = schedule[currentId]?.at;
  el("next-review-date").textContent = date ? (isDue(currentId) ? "Due for review" :
    "Next review " + new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })) : "";
}

function record(grade) {
  recordSchedule(currentId, grade);
  progress[currentId] = grade;
  if (quickSession) quickSession.grades.set(currentId, grade);
  saveProgress();
  // A resolved review item remains in view until the learner presses Next.
  if (reviewFilter && !matchesReview(currentId)) el("next").disabled = false;
  renderReviewDate();
  for (const control of questionCard.querySelectorAll("[data-grade]")) {
    control.setAttribute("aria-pressed", String(control.dataset.grade === grade));
  }
}

function startQuickPractice() {
  const pool = selectedTrack.numbers ?? questions.map(question => question.id);
  const review = pool.filter(id => isDue(id));
  const unseen = pool.filter(id => !progress[id]);
  const skipped = pool.filter(id => progress[id] === "skipped" && !schedule[id]);
  const ids = [...new Set([...review.slice(0, 3), ...unseen.slice(0, 2), ...review, ...unseen, ...skipped])].slice(0, 5);
  if (!ids.length) {
    el("quick-empty").textContent = "You’re caught up on this path. Browse the questions or choose another path.";
    return;
  }
  openQuickSession(ids);
}

function openQuickSession(ids, label = selectedTrack.name) {
  el("quick-empty").textContent = "";
  quickSession = { ids, label, grades: new Map(), previousId: currentId, finished: false };
  if (location.hash.startsWith("#q-")) history.replaceState(null, "", "#practice");
  currentId = ids[0];
  updateFilters();
  el("question-title").focus();
}

function endQuickPractice() {
  if (!quickSession) return;
  currentId = quickSession.previousId;
  quickSession = null;
  updateFilters();
  el("start-quick").focus();
}

function finishQuickPractice() {
  quickSession.finished = true;
  renderQuickSummary();
}

function renderQuickSummary() {
  const { ids, grades: marks } = quickSession;
  const heading = element("h2", "Practice recap");
  heading.id = "question-title";
  heading.tabIndex = -1;
  const counts = grade => ids.filter(id => marks.get(id) === grade).length;
  const untouched = ids.length - counts("got-it") - counts("review");
  questionCard.replaceChildren(heading, element("p",
    counts("got-it") + " got it · " + counts("review") + " to review · " + untouched + " skipped or unmarked"));
  const missed = ids.filter(id => marks.get(id) === "review");
  if (missed.length) {
    const list = element("ul", undefined, "study-links");
    for (const id of missed) {
      const item = element("li");
      item.append(studyLink(id));
      list.append(item);
    }
    questionCard.append(element("h3", "Questions to revisit"), list);
  }
  const actions = element("div", undefined, "card-actions");
  actions.append(button("Back to question bank", endQuickPractice, "primary"));
  questionCard.append(actions);
  renderQuickControls();
  el("question-controls").hidden = true;
  heading.focus();
}

function renderQuickControls() {
  const active = Boolean(quickSession);
  el("start-quick").hidden = active;
  el("finish-quick").hidden = !active || quickSession.finished;
  el("quick-status").hidden = !active;
  el("quick-status").textContent = active ? "10-minute practice · " + quickSession.label : "";
  el("filters").hidden = active;
  el("result-bar").hidden = active && quickSession.finished;
  for (const control of el("tracks").children) control.disabled = active;
  el("review-queue").disabled = active;
  el("due-queue").disabled = active;
}

function matchesReview(id) {
  if (reviewFilter === "due") return isDue(id);
  if (reviewFilter === "marked") return progress[id] === "review";
  return true;
}

function renderProgress() {
  const ids = selectedTrack.numbers ?? questions.map(question => question.id);
  const seen = ids.filter(id => progress[id]).length;
  const review = ids.filter(id => progress[id] === "review").length;
  const due = ids.filter(id => isDue(id)).length;
  const percent = Math.round(seen * 100 / ids.length);
  el("percentage").textContent = percent + "%";
  el("study-meter").max = ids.length;
  el("study-meter").value = seen;
  const scope = seen + " of " + ids.length + " questions marked";
  el("progress-summary").textContent = storageAvailable ? scope : scope + ". Progress is available for this session.";
  for (const id of ["review-queue", "mobile-review"]) {
    el(id).textContent = "Review marked questions (" + review + ")";
    el(id).setAttribute("aria-pressed", String(reviewFilter === "marked"));
  }
  for (const id of ["due-queue", "mobile-due"]) {
    el(id).textContent = "Due for review (" + due + ")";
    el(id).setAttribute("aria-pressed", String(reviewFilter === "due"));
  }
}

function updateFilters() {
  renderQuickControls();
  if (quickSession) {
    visibleQuestions = quickSession.ids.map(id => byId.get(id));
    answerVisible = false;
    renderQuestion();
    return;
  }
  const pool = selectedTrack.numbers?.map(id => byId.get(id)) ?? questions;
  visibleQuestions = pool.filter(question => {
    return matchesReview(question.id) &&
      (!topicSelect.value || question.topic === topicSelect.value) &&
      matchesSearch(question, searchInput.value);
  });
  if (!visibleQuestions.some(question => question.id === currentId)) {
    currentId = visibleQuestions[0]?.id;
  }
  for (const control of el("tracks").children) {
    control.setAttribute("aria-pressed", String(control.dataset.track === selectedTrack.id));
  }
  el("mobile-track").value = selectedTrack.id;
  answerVisible = false;
  renderProgress();
  renderQuestion();
}

function matchesSearch(question, query) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const haystack = [questionLabel(question.id), "q" + question.id, question.id, question.topic, question.prompt]
    .join(" ").toLowerCase();
  return terms.every(term => haystack.includes(term));
}

const browseFilters = ["browse-search", "browse-track", "browse-topic", "browse-status"];
for (const id of browseFilters) el(id).addEventListener(id === "browse-search" ? "input" : "change", renderBrowse);
el("browse-clear").addEventListener("click", () => {
  for (const id of browseFilters) el(id).value = id === "browse-track" ? "all" : "";
  renderBrowse();
  el("browse-search").focus();
});

function filteredBrowseQuestions() {
  const track = tracks.find(track => track.id === el("browse-track").value);
  const topic = el("browse-topic").value;
  const status = el("browse-status").value;
  const query = el("browse-search").value;
  return questions.filter(question =>
    (!track?.numbers || track.numbers.includes(question.id)) &&
    (!topic || question.topic === topic) &&
    (!status || (status === "due" ? isDue(question.id) : (progress[question.id] ?? "new") === status)) &&
    matchesSearch(question, query)
  );
}

function makeBrowseList(matches) {
  const list = element("ul");
  for (const question of matches) {
    const row = element("li");
    const mark = gradeValues.indexOf(progress[question.id]);
    const link = studyLink(question.id);
    link.prepend(element("span", questionLabel(question.id) + " ", "browse-id"));
    const content = element("div");
    content.append(link, element("span", mark < 0 ? "Unseen" : grades[mark], "browse-mark"));
    row.append(content, radarWidget(question.id));
    list.append(row);
  }
  return list;
}

const radarMode = () => location.hash === "#radar-recent";

function renderBrowse() {
  const mode = radarMode();
  const filtered = filteredBrowseQuestions();
  const results = mode ? recentQuestions(filtered) : filtered;
  const focusedVote = document.activeElement?.closest("#browse-results [data-radar-question]")?.dataset.radarQuestion;
  for (const link of document.querySelectorAll(".radar-switch a")) {
    if (link.hash === location.hash) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  el("radar-browse-note").hidden = !mode;
  el("browse-radar-practise").hidden = !mode || !results.length;
  el("browse-count").textContent = results.length + (results.length === 1 ? " question" : " questions");
  const groups = [];
  const sections = mode ? [["Questions I’ve been asked", results]] :
    topics.map(name => [name, results.filter(question => question.topic === name)]);
  for (const [name, matches] of sections.filter(([, rows]) => rows.length)) {
    const group = element("section", undefined, "browse-group");
    group.append(element("h2", name), makeBrowseList(matches));
    groups.push(group);
  }
  el("browse-results").replaceChildren(...(groups.length ? groups : [
    element("p", mode && filtered.length ? radarMessage() : "No questions match these filters. Try a different search or clear the filters."),
  ]));
  if (focusedVote) {
    el("browse-results").querySelector(`[data-radar-question="${focusedVote}"] button`)?.focus({ preventScroll: true });
  }
}

function practiseRadar(questions) {
  if (!questions.length) return;
  history.pushState(null, "", "#practice");
  selectTrack(tracks[0]);
  followLocation();
  openQuickSession(questions.slice(0, 5).map(question => question.id), "Interview Radar");
}

el("browse-radar-practise").addEventListener("click", () => practiseRadar(
  recentQuestions(filteredBrowseQuestions())
));
el("home-radar-practise").addEventListener("click", () => practiseRadar(recentQuestions(questions)));

function renderRadarHome() {
  const top = recentQuestions(questions).slice(0, 5);
  const list = element("ol", undefined, "study-links");
  for (const question of top) {
    const row = element("li");
    row.append(studyLink(question.id), element("small", radarDate(question.id), "radar-note"));
    list.append(row);
  }
  el("home-radar-results").replaceChildren(top.length ? list : element("p", radarMessage(), "radar-note"));
  el("home-radar-practise").hidden = !top.length;
}

function appendAnswerBlocks(target, blocks) {
  for (const block of blocks) {
    if (block.code === undefined) {
      target.append(element("p", block.text));
      continue;
    }
    const pre = element("pre");
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", "Code example");
    pre.append(element("code", block.code));
    target.append(pre);
  }
}

function renderAnswer(question, answer) {
  const short = shortAnswers[question.id];
  const [first, ...rest] = question.answer;
  const lead = short ?? first.text;
  const details = short || first.text === undefined ? question.answer : rest;
  if (lead) {
    answer.append(element("h3", short ? "30-second answer" : "Suggested answer"), element("p", lead));
  }
  if (details.length) {
    const disclosure = element("details", undefined, "answer-details");
    disclosure.append(element("summary", "Examples and explanation"));
    appendAnswerBlocks(disclosure, details);
    answer.append(disclosure);
  }
  const related = relatedGroups.find(group => group.includes(question.id));
  if (related && !quickSession) {
    const list = element("ul", undefined, "study-links");
    for (const id of related.filter(id => id !== question.id)) {
      const item = element("li");
      item.append(studyLink(id), id === related[0] ? " · Primary explanation" : "");
      list.append(item);
    }
    answer.append(element("h3", "Related questions"), list);
  }
}

function renderGuidedQuestion(id) {
  const guide = guidedAnswers[id];
  const section = element("section", undefined, "guided-panel");
  const state = guidedDrafts.get(id) ?? { text: "", previous: "", comparing: false, checked: [] };
  guidedDrafts.set(id, state);

  function render(focus = false) {
    const heading = element("h3", state.comparing ? "Compare your answer" : "Write a practice answer");
    heading.tabIndex = -1;
    section.replaceChildren(heading);
    if (!state.comparing) {
      if (state.previous) {
        const previous = element("details", undefined, "answer-details");
        previous.append(element("summary", "Read your previous attempt"), element("p", state.previous, "written-answer"));
        section.append(previous);
      }
      const label = element("label", "Your answer");
      const input = element("textarea");
      input.rows = 5;
      input.maxLength = 2000;
      input.id = "guided-answer-input";
      label.htmlFor = input.id;
      input.value = state.text;
      const compare = button("Compare with checklist", () => {
        state.comparing = true;
        render(true);
      }, "primary");
      compare.disabled = !state.text.trim();
      input.addEventListener("input", () => {
        state.text = input.value;
        compare.disabled = !input.value.trim();
      });
      const draft = element("div", undefined, "guided-draft");
      draft.append(label, input, element("small", "Your writing stays on this page. Only your self-check score is saved."));
      section.append(draft, compare);
    } else {
      section.append(element("h4", "Your attempt"), element("p", state.text.trim(), "written-answer"),
        element("h4", "Example answer"), element("p", guide.example));
      const checklist = element("fieldset", undefined, "rubric guided-rubric");
      checklist.append(element("legend", "Check what you covered"));
      const saved = element("p", undefined, "self-check-status");
      saved.setAttribute("role", "status");
      for (const [i, [title, detail]] of guide.criteria.entries()) {
        const row = element("label");
        const check = element("input");
        check.type = "checkbox";
        check.checked = Boolean(state.checked[i]);
        check.addEventListener("change", () => {
          state.checked[i] = check.checked;
          saved.textContent = "";
        });
        const item = element("span");
        item.append(element("strong", title), element("small", detail));
        row.append(check, item);
        checklist.append(row);
      }
      function saveSelfCheck() {
        const score = state.checked.filter(Boolean).length;
        guidedResults[id] = score;
        saveLocal(guidedKey, guidedResults);
        saved.textContent = (storageAvailable ? "Self-check saved" : "Self-check for this visit") + " · " +
          score + "/" + guide.criteria.length;
      }
      const actions = element("div", undefined, "card-actions");
      actions.append(button("Save self-check", saveSelfCheck, "primary"), button("Try again", () => {
        saveSelfCheck();
        state.previous = state.text.trim();
        state.text = "";
        state.comparing = false;
        state.checked = [];
        render(true);
      }));
      section.append(checklist, actions, saved);
    }
    if (focus) heading.focus();
  }
  render();
  const disclosure = element("details", undefined, "guided-practice");
  disclosure.open = state.comparing || Boolean(state.text || state.previous);
  disclosure.append(element("summary", "Try a guided answer"), section);
  return disclosure;
}

function renderQuestion(focus = false) {
  questionCard.setAttribute("aria-labelledby", "question-title");
  const question = byId.get(currentId);
  const index = visibleQuestions.findIndex(row => row.id === currentId);
  const count = visibleQuestions.length;
  el("result-label").textContent = count ? "Question " + (index + 1) + " of " + count : "No matching questions";
  matchSelect.replaceChildren(...visibleQuestions.map(row => option(row.id, questionLabel(row.id) + " · " + row.prompt)));
  matchSelect.value = currentId ?? "";
  matchSelect.hidden = count < 2 || Boolean(quickSession);
  el("question-controls").hidden = count === 0;
  el("previous").disabled = index <= 0;
  el("next").disabled = !quickSession && index >= count - 1 && !(reviewFilter && !matchesReview(currentId));
  el("next").textContent = quickSession && index === count - 1 ? "See recap" : "Next →";

  if (!question || !count) {
    const heading = element("h2", reviewFilter ? "Nothing to review here" : "No matching questions");
    heading.tabIndex = -1;
    heading.id = "question-title";
    const description = reviewFilter === "due" ? "Questions appear here when their next review is due." :
      reviewFilter === "marked" ? "Questions marked Needs review appear here." : "Try another search or clear the filters.";
    questionCard.replaceChildren(heading, element("p", description), button("Clear filters", () => selectTrack(tracks[0])));
    return;
  }
  const heading = element("h2", question.prompt);
  heading.id = "question-title";
  heading.tabIndex = -1;
  const number = quickSession ? element("span", questionLabel(question.id)) : studyLink(question.id, true);
  const meta = element("p", undefined, "question-meta");
  const id = element("span");
  id.append(number);
  meta.append(id, element("strong", question.topic));
  const reveal = button(answerVisible ? "Hide answer" : "Reveal answer", () => {
    answerVisible = !answerVisible;
    renderQuestion();
    el("reveal-answer").focus();
  }, "primary reveal");
  reveal.id = "reveal-answer";
  reveal.setAttribute("aria-expanded", String(answerVisible));
  reveal.setAttribute("aria-controls", "answer-content");
  const answer = element("div", undefined, "answer");
  answer.id = "answer-content";
  answer.hidden = !answerVisible;
  questionCard.replaceChildren(meta, heading, radarWidget(question.id), reveal, answer);
  if (guidedAnswers[question.id]) questionCard.append(renderGuidedQuestion(question.id));
  if (answerVisible) {
    renderAnswer(question, answer);
    const actions = element("div", undefined, "card-actions");
    for (const [i, label] of grades.entries()) {
      const grade = gradeValues[i];
      const control = button(label, () => record(grade));
      control.dataset.grade = grade;
      control.setAttribute("aria-pressed", String(progress[question.id] === grade));
      actions.append(control);
    }
    const date = element("p", undefined, "review-date");
    date.id = "next-review-date";
    date.setAttribute("role", "status");
    answer.append(actions, date);
    renderReviewDate();
  }
  if (location.hash && !el("practice").hidden && !quickSession && !reviewFilter) {
    resume = { trackId: selectedTrack.id, id: question.id };
    saveLocal(resumeKey, resume);
  }
  if (focus) heading.focus();
}

function visitQuestion(id) {
  currentId = id;
  if (!quickSession && location.hash.startsWith("#q-")) {
    history.replaceState(null, "", "#q-" + id);
  }
  answerVisible = false;
  renderQuestion(true);
}

function moveQuestion(offset) {
  const index = visibleQuestions.findIndex(row => row.id === currentId);
  const nextQuestion = visibleQuestions[index + offset];
  if (quickSession && !nextQuestion && offset > 0) {
    finishQuickPractice();
  } else if (!quickSession && reviewFilter && !matchesReview(currentId)) {
    currentId = nextQuestion?.id;
    updateFilters();
    el("question-title").focus();
  } else if (nextQuestion) {
    visitQuestion(nextQuestion.id);
  }
}

searchInput.addEventListener("input", updateFilters);
topicSelect.addEventListener("change", updateFilters);
matchSelect.addEventListener("change", () => visitQuestion(Number(matchSelect.value)));
el("previous").addEventListener("click", () => moveQuestion(-1));
el("next").addEventListener("click", () => moveQuestion(1));
el("start-quick").addEventListener("click", startQuickPractice);
el("finish-quick").addEventListener("click", finishQuickPractice);
el("mobile-track").addEventListener("change", event => selectTrack(tracks.find(track => track.id === event.target.value)));
function openReview(filter) {
  if (location.hash.startsWith("#q-")) history.replaceState(null, "", "#practice");
  reviewFilter = reviewFilter === filter ? "" : filter;
  topicSelect.value = "";
  searchInput.value = "";
  currentId = undefined;
  updateFilters();
}

for (const [id, filter] of [["review-queue", "marked"], ["mobile-review", "marked"], ["due-queue", "due"], ["mobile-due", "due"]]) {
  el(id).addEventListener("click", () => openReview(filter));
}

function studyLink(id, numberOnly = false) {
  const link = element("a", numberOnly ? questionLabel(id) : byId.get(id).prompt);
  link.href = "#q-" + id;
  if (numberOnly) link.setAttribute("aria-label", "Link to " + questionLabel(id));
  return link;
}

function readMockHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(mockKey));
    if (!Array.isArray(saved)) return [];
    return saved.filter(entry => {
      const mock = mocks.find(item => item.id === entry?.mockId);
      return mock && typeof entry.completedAt === "number" && !Number.isNaN(new Date(entry.completedAt).getTime()) &&
        Array.isArray(entry.scores) && entry.scores.length === mock.questions.length &&
        entry.scores.every((row, i) => Array.isArray(row) && row.length === mock.questions[i].criteria.length &&
          row.every(score => typeof score === "boolean"));
    }).slice(0, 20);
  } catch {
    return [];
  }
}

function saveMock() {
  const result = {
    mockId: attempt.mock.id,
    completedAt: Date.now(),
    scores: attempt.answers.map(answer => [...answer.scores]),
  };
  attempt.result = result;
  if (!Object.hasOwn(firstMockScores, result.mockId)) {
    firstMockScores[result.mockId] = countPoints(result.scores);
    saveLocal(firstMockKey, firstMockScores);
  }
  mockHistory.unshift(result);
  mockHistory.splice(20);
  try {
    localStorage.setItem(mockKey, JSON.stringify(mockHistory));
  } catch {
    // Results remain available for the open visit when browser storage is blocked.
  }
}

function countPoints(scores) {
  return scores.flat().filter(Boolean).length;
}

function showMockPicker() {
  const list = element("div", undefined, "mock-selector");
  for (const [index, mock] of mocks.entries()) {
    const row = element("div", undefined, "mock-option");
    const text = element("div");
    text.append(element("h2", mock.name), element("p", "Mock " + (index + 1) + " · " + mock.questions.length + " prompts"));
    const start = button("Start mock", () => startMock(mock), "primary");
    start.setAttribute("aria-label", "Start " + mock.name + " mock");
    row.append(text, start);
    list.append(row);
  }
  const toggle = element("label", undefined, "timer-toggle");
  const checkbox = element("input");
  checkbox.type = "checkbox";
  checkbox.checked = timed;
  checkbox.addEventListener("change", () => { timed = checkbox.checked; });
  toggle.append(checkbox, "Use a 30-minute timer");
  mockContent.replaceChildren(list, toggle);
  if (mockHistory.length) {
    const history = element("div", undefined, "mock-history");
    const entries = element("ul", undefined, "mock-selector");
    const formatDate = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });
    for (const result of mockHistory) {
      const mock = mocks.find(item => item.id === result.mockId);
      const row = element("li", undefined, "mock-option");
      const label = element("div");
      label.append(element("h3", mock.name), element("p", formatDate.format(result.completedAt) + " · " +
        countPoints(result.scores) + "/" + result.scores.flat().length));
      const view = button("View score", () => {
        attempt = { mock, result, finished: true };
        renderMockSummary(true);
      });
      view.setAttribute("aria-label", "View " + mock.name + " score from " + formatDate.format(result.completedAt));
      row.append(label, view);
      entries.append(row);
    }
    history.append(element("h2", "Past attempts"), entries);
    mockContent.append(history);
  }
}

function updateTimer() {
  const timer = el("mock-timer");
  const seconds = Math.max(0, Math.ceil((attempt.deadline - Date.now()) / 1000));
  const label = seconds ? Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0") : "Time is up";
  if (timer) timer.textContent = label;
  if (!seconds) window.clearInterval(timerInterval);
}

function startMock(mock) {
  window.clearInterval(timerInterval);
  attempt = {
    mock, index: 0, deadline: timed ? Date.now() + 30 * 60 * 1000 : null, finished: false,
    answers: mock.questions.map(() => ({ stage: 0, notes: "", scores: [false, false, false] })),
  };
  if (timed) timerInterval = window.setInterval(updateTimer, 1000);
  renderMock(true);
}

function renderMock(focus = false) {
  if (!attempt) {
    showMockPicker();
    return;
  }
  const { mock, index, deadline, answers } = attempt;
  if (attempt.finished) {
    renderMockSummary(focus);
    return;
  }
  const item = mock.questions[index];
  const answer = answers[index];
  const status = element("div", undefined, "mock-status");
  status.append(element("p", mock.name + " · Question " + (index + 1) + " of " + mock.questions.length));
  if (deadline) {
    const timer = element("span", undefined, "timer");
    timer.id = "mock-timer";
    timer.setAttribute("role", "timer");
    timer.setAttribute("aria-label", "Time remaining");
    status.append(timer);
  }
  const card = element("article", undefined, "question-card");
  const heading = element("h2", item.prompt);
  heading.tabIndex = -1;
  card.append(element("p", questionLabel(item.id) + " · " + item.minutes + " min suggested", "question-meta"), heading);
  let stageHeading = heading;
  if (answer.stage >= 1) {
    const detail = element("div", undefined, "answer");
    stageHeading = element("h3", "Follow-up");
    stageHeading.tabIndex = -1;
    detail.append(stageHeading, element("p", item.followup));
    card.append(detail);
  }
  const notes = element("label", undefined, "mock-notes");
  notes.append(element("span", "Notes (optional)"));
  const input = element("textarea");
  input.rows = 3;
  input.maxLength = 1500;
  input.value = answer.notes;
  input.addEventListener("input", () => { answer.notes = input.value; });
  notes.append(input, element("small", "Notes stay in this open mock and are cleared when you reload."));
  card.append(notes);
  if (answer.stage === 2) {
    const field = element("fieldset", undefined, "rubric");
    const legend = element("legend", "Award one point for each item you covered");
    legend.tabIndex = -1;
    stageHeading = legend;
    field.append(legend);
    for (const [i, score] of item.criteria.entries()) {
      const label = element("label");
      const checkbox = element("input");
      checkbox.type = "checkbox";
      checkbox.checked = answer.scores[i];
      checkbox.addEventListener("change", () => { answer.scores[i] = checkbox.checked; });
      const sentence = score.charAt(0).toUpperCase() + score.slice(1);
      label.append(checkbox, sentence + ".");
      field.append(label);
    }
    card.append(field);
  } else {
    card.append(button(answer.stage === 0 ? "Show follow-up" : "Reveal rubric", () => {
      answer.stage++;
      renderMock(true);
    }, "primary reveal"));
  }
  const controls = element("div", undefined, "question-controls");
  const previous = button("← Previous", () => { attempt.index--; renderMock(true); });
  previous.disabled = index === 0;
  const last = index === mock.questions.length - 1;
  const next = button(last ? "See results" : "Next →", () => {
    if (last) {
      attempt.finished = true;
      window.clearInterval(timerInterval);
      saveMock();
    } else {
      attempt.index++;
    }
    renderMock(true);
  }, "primary");
  next.disabled = answer.stage < 2;
  controls.append(previous, next);
  mockContent.replaceChildren(status, card, controls);
  if (deadline) updateTimer();
  if (focus) stageHeading.focus();
}

function renderMockSummary(focus) {
  const { mock, result } = attempt;
  const { scores } = result;
  const card = element("article", undefined, "question-card mock-summary");
  const heading = element("h2", mock.name + " results");
  heading.tabIndex = -1;
  card.append(heading, element("p", countPoints(scores) + " / " + scores.flat().length, "mock-score"));
  const list = element("ol", undefined, "study-links");
  const missedIds = [];
  for (const [i, item] of mock.questions.entries()) {
    const row = element("li");
    const points = scores[i].filter(Boolean).length;
    row.append(studyLink(item.id), " · " + points + "/" + item.criteria.length);
    const missed = item.criteria.filter((_, index) => !scores[i][index]);
    if (missed.length) {
      missedIds.push(item.id);
      const criteria = element("ul");
      for (const criterion of missed) {
        criteria.append(element("li", criterion.charAt(0).toUpperCase() + criterion.slice(1) + "."));
      }
      row.append(criteria, element("p", "Practise aloud — " + item.followup));
    }
    list.append(row);
  }
  card.append(element("h3", missedIds.length ? "What to practise next" : "All rubric items covered"), list);
  if (missedIds.length) {
    const addToReview = button("Add missed questions to review", () => {
      for (const id of missedIds) {
        if (progress[id] !== "review") {
          progress[id] = "review";
          schedule[id] = { at: Date.now(), step: 0 };
        }
      }
      saveProgress();
      reviewStatus.textContent = "Questions added to your review queue.";
      addToReview.disabled = true;
    }, "primary");
    const reviewStatus = element("p", "", "review-status");
    reviewStatus.setAttribute("role", "status");
    card.append(addToReview, reviewStatus);
  }
  const controls = element("div", undefined, "question-controls");
  controls.append(button("Choose another mock", () => {
    attempt = null;
    renderMock();
    mockContent.querySelector("button").focus();
  }));
  mockContent.replaceChildren(card, controls);
  if (focus) heading.focus();
}

function resumeTrack() {
  return tracks.find(track => track.id === resume?.trackId && byId.has(resume.id) &&
    (!track.numbers || track.numbers.includes(resume.id)));
}

function renderHome() {
  renderRadarHome();
  const track = resumeTrack();
  el("continue-study").hidden = !track;
  el("resume-detail").hidden = !track;
  el("resume-detail").textContent = track ? track.name + " · " + questionLabel(resume.id) : "";
  const due = questions.filter(question => isDue(question.id)).length;
  el("home-due").hidden = due === 0;
  el("home-due").textContent = due + (due === 1 ? " question due for review" : " questions due for review");
}

function renderReadiness() {
  const track = tracks.find(track => track.id === el("progress-track").value);
  const ids = track.numbers;
  const due = ids.find(id => isDue(id));
  const unseen = ids.find(id => !progress[id]);
  const marked = ids.find(id => progress[id] === "review");
  const guide = ids.find(id => guidedAnswers[id] && !Object.hasOwn(guidedResults, id));
  const mock = mocks.find(mock => mock.id === track.id);
  const results = mockHistory.filter(result => result.mockId === mock?.id);
  const latest = results[0];
  const recurring = mock ? mock.questions.flatMap((item, q) =>
    item.criteria.map((criterion, c) => ({
      id: item.id,
      criterion,
      count: results.filter(result => !result.scores[q][c]).length,
    })).filter(item => item.count >= 2)
  ).sort((a, b) => b.count - a.count) : [];
  const next = element("article", undefined, "question-card readiness-card");
  next.append(element("h2", "Next practice"));
  if (recurring.length || due || guide || unseen || marked) {
    const id = recurring[0]?.id ?? due ?? guide ?? unseen ?? marked;
    const reason = recurring.length ? "Revisit a criterion missed in multiple mocks." :
      due ? "Answer a question due for review." : guide ? "Write an answer and compare it with the checklist." :
      unseen ? "Try an unseen question on this path." : "Revisit a question you marked for review.";
    const link = element("p");
    link.append(studyLink(id));
    next.append(element("p", reason), link);
  } else if (mock && !latest) {
    const link = element("a", "Take the " + mock.name + " mock");
    link.href = "#mocks";
    next.append(link);
  } else {
    const link = element("a", "Practise a hands-on QA lab");
    link.href = "#lab";
    next.append(link);
  }

  const topicCard = element("article", undefined, "question-card readiness-card");
  topicCard.append(element("h2", "Self-ratings by topic"));
  const topicList = element("ul", undefined, "topic-ratings");
  for (const topic of new Set(ids.map(id => byId.get(id).topic))) {
    const topicIds = ids.filter(id => byId.get(id).topic === topic);
    const confident = topicIds.filter(id => progress[id] === "got-it").length;
    const seen = topicIds.filter(id => progress[id]).length;
    const dueCount = topicIds.filter(id => isDue(id)).length;
    const row = element("li");
    row.append(element("strong", topic), element("span",
      confident + "/" + topicIds.length + " got it · " + seen + " rated · " + dueCount + " due"));
    topicList.append(row);
  }
  topicCard.append(topicList);

  const guidedCard = element("article", undefined, "question-card readiness-card");
  guidedCard.append(element("h2", "Guided answers"));
  const guidedList = element("ul", undefined, "study-links");
  for (const id of Object.keys(guidedAnswers).map(Number)) {
    const row = element("li");
    row.append(studyLink(id), Object.hasOwn(guidedResults, id) ?
      " · Self-check " + guidedResults[id] + "/" + guidedAnswers[id].criteria.length : "");
    guidedList.append(row);
  }
  guidedCard.append(guidedList);

  const mockCard = element("article", undefined, "question-card readiness-card");
  mockCard.append(element("h2", "Mock scores"));
  if (latest) {
    const max = latest.scores.flat().length;
    mockCard.append(element("p", "First recorded score " + firstMockScores[mock.id] + "/" + max +
      " · Latest score " + countPoints(latest.scores) + "/" + max));
    if (recurring.length) {
      const list = element("ul", undefined, "study-links");
      for (const item of recurring) {
        const row = element("li", item.criterion.charAt(0).toUpperCase() + item.criterion.slice(1) + " · Missed " + item.count + " times. ");
        const link = studyLink(item.id, true);
        row.append(link);
        list.append(row);
      }
      mockCard.append(element("h3", "Recurring missed criteria"), list);
    } else {
      mockCard.append(element("p", "No criteria missed more than once in your recent attempts."));
    }
  } else {
    mockCard.append(element("p", mock ? "Complete this path’s mock interview to see a baseline." :
      "Choose a role-based path for its mock scores."));
  }
  el("readiness-content").replaceChildren(next, topicCard, mockCard, guidedCard);
}

function followLocation(focus = false) {
  if (location.hash === "#radar-top") history.replaceState(null, "", "#radar-recent");
  const route = location.hash;
  const homeMode = route === "" || route === "#home";
  const mockMode = route === "#mocks";
  const labPanel = { "#lab": "flaky", "#lab-api": "api", "#lab-manual": "manual", "#lab-sql": "sql" }[route];
  const progressMode = route === "#progress";
  const browseMode = ["#browse", "#radar-recent"].includes(route);
  const qMatch = route.match(/^#q-(\d+)$/);
  const startTrack = route.startsWith("#start-") && tracks.find(track => track.id === route.slice(7));
  const returning = route === "#resume" && resumeTrack();
  el("home-panel").hidden = !homeMode;
  el("practice").hidden = homeMode || mockMode || Boolean(labPanel) || browseMode || progressMode;
  el("mocks").hidden = !mockMode;
  el("lab-panel").hidden = !labPanel;
  el("progress-panel").hidden = !progressMode;
  el("browse-panel").hidden = !browseMode;
  const activeNav = homeMode ? "home" : browseMode ? "browse" : mockMode ? "mocks" : labPanel ? "lab" : progressMode ? "progress" : "practice";
  for (const nav of document.querySelectorAll(".site-header nav a")) {
    if (nav.id === "nav-" + activeNav) nav.setAttribute("aria-current", "page");
    else nav.removeAttribute("aria-current");
  }
  if (homeMode) {
    renderHome();
    if (focus) {
      el("home-heading").tabIndex = -1;
      el("home-heading").focus();
    }
  } else if (mockMode) {
    renderMock();
    if (focus) {
      el("mock-heading").tabIndex = -1;
      el("mock-heading").focus();
    }
  } else if (browseMode) {
    renderBrowse();
    if (focus) {
      el("browse-heading").tabIndex = -1;
      el("browse-heading").focus();
    }
  } else if (progressMode) {
    renderReadiness();
    if (focus) {
      el("progress-page-heading").tabIndex = -1;
      el("progress-page-heading").focus();
    }
  } else if (labPanel) {
    for (const id of ["flaky", "api", "manual", "sql"]) el("lab-" + id + "-panel").hidden = id !== labPanel;
    for (const link of el("lab-panel").querySelectorAll(".lab-switch a")) {
      if (link.hash === route) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
    if (focus) {
      const heading = el(labPanel === "flaky" ? "lab-heading" : "lab-" + labPanel + "-heading");
      heading.tabIndex = -1;
      heading.focus();
    }
  } else if (startTrack || returning || route === "#due") {
    history.replaceState(null, "", "#practice");
    if (route === "#due") {
      quickSession = null;
      selectedTrack = tracks[0];
      reviewFilter = "";
      openReview("due");
    } else {
      selectTrack(returning || startTrack, returning ? resume.id : undefined);
    }
    if (focus) el("question-title").focus();
  } else if (qMatch && byId.has(Number(qMatch[1]))) {
    selectTrack(tracks[0], Number(qMatch[1]));
    if (focus) el("question-title").focus();
  } else {
    if (!quickSession && !reviewFilter) updateFilters();
    if (focus) {
      el("practice-heading").tabIndex = -1;
      el("practice-heading").focus();
    }
  }
}

document.querySelector(".skip-link").addEventListener("click", event => {
  event.preventDefault();
  el("main").focus();
});
window.addEventListener("hashchange", () => followLocation(true));
updateFilters();
initRadar(() => {
  renderRadarHome();
  if (!el("browse-panel").hidden) renderBrowse();
  const widget = questionCard.querySelector("[data-radar-question]");
  if (widget) {
    const focused = widget.contains(document.activeElement);
    paintVote(widget);
    if (focused) widget.querySelector("button")?.focus({ preventScroll: true });
  }
});
followLocation();
