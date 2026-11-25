import { questions, topics, tracks, mocks, references } from "./bank.js";
import { relatedGroups, shortAnswers } from "./answer-guide.js";

const el = id => document.getElementById(id);
const questionLabel = id => "Q" + String(id).padStart(3, "0");
const key = "qa-interview-practice.progress.v1";
const mockKey = "qa-interview-practice.mocks.v1";
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

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return Object.fromEntries(Object.entries(saved ?? {}).filter(
      ([id, grade]) => byId.has(Number(id)) && gradeValues.includes(grade)
    ));
  } catch {
    return {};
  }
}

const progress = readProgress();
const mockHistory = readMockHistory();
let selectedTrack = tracks[0];
let reviewOnly = false;
let currentId = questions[0].id;
let visibleQuestions = [];
let answerVisible = false;
let storageAvailable = true;
let quickSession = null;
let attempt = null;
let timerInterval = 0;
let timed = true;

const searchInput = el("search");
const topicSelect = el("topics");
const matchSelect = el("matches");
const questionCard = el("question");
const mockContent = el("mock-content");

function option(value, label) {
  const node = element("option", label);
  node.value = value;
  return node;
}

topicSelect.append(option("", "All topics"), ...topics.map(topic => option(topic, topic)));
el("mobile-track").append(...tracks.map(track => option(track.id, track.name)));
el("browse-track").append(...tracks.map(track => option(track.id, track.name)));
el("browse-topic").append(option("", "All topics"), ...topics.map(topic => option(topic, topic)));
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

function selectTrack(track) {
  selectedTrack = track;
  reviewOnly = false;
  searchInput.value = "";
  topicSelect.value = "";
  currentId = track.numbers?.[0] ?? questions[0].id;
  updateFilters();
}

function saveProgress() {
  try {
    localStorage.setItem(key, JSON.stringify(progress));
  } catch {
    storageAvailable = false;
  }
  renderProgress();
}

function record(grade) {
  progress[currentId] = grade;
  if (quickSession) quickSession.grades.set(currentId, grade);
  saveProgress();
  // A resolved review item remains in view until the learner presses Next.
  if (reviewOnly && grade !== "review") el("next").disabled = false;
  for (const control of questionCard.querySelectorAll("[data-grade]")) {
    control.setAttribute("aria-pressed", String(control.dataset.grade === grade));
  }
}

function startQuickPractice() {
  const pool = selectedTrack.numbers ?? questions.map(question => question.id);
  const review = pool.filter(id => progress[id] === "review");
  const unseen = pool.filter(id => !progress[id]);
  const skipped = pool.filter(id => progress[id] === "skipped");
  const ids = [...new Set([...review.slice(0, 3), ...unseen.slice(0, 2), ...review, ...unseen, ...skipped, ...pool])].slice(0, 5);
  quickSession = { ids, grades: new Map(), previousId: currentId, finished: false };
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
  el("quick-status").textContent = active ? "10-minute practice · " + selectedTrack.name : "";
  el("filters").hidden = active;
  el("result-bar").hidden = active && quickSession.finished;
  for (const control of el("tracks").children) control.disabled = active;
  el("review-queue").disabled = active;
}

function renderProgress() {
  const ids = selectedTrack.numbers ?? questions.map(question => question.id);
  const seen = ids.filter(id => progress[id]).length;
  const review = ids.filter(id => progress[id] === "review").length;
  const percent = Math.round(seen * 100 / ids.length);
  el("percentage").textContent = percent + "%";
  el("progress").max = ids.length;
  el("progress").value = seen;
  const scope = seen + " of " + ids.length + " questions marked";
  el("progress-summary").textContent = storageAvailable ? scope : scope + ". Progress is available for this session.";
  for (const id of ["review-queue", "mobile-review"]) {
    el(id).textContent = "Review marked questions (" + review + ")";
    el(id).setAttribute("aria-pressed", String(reviewOnly));
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
    return (!reviewOnly || progress[question.id] === "review") &&
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

function renderBrowse() {
  const track = tracks.find(track => track.id === el("browse-track").value);
  const topic = el("browse-topic").value;
  const status = el("browse-status").value;
  const query = el("browse-search").value;
  const results = questions.filter(question =>
    (!track?.numbers || track.numbers.includes(question.id)) &&
    (!topic || question.topic === topic) &&
    (!status || (progress[question.id] ?? "new") === status) &&
    matchesSearch(question, query)
  );
  el("browse-count").textContent = results.length + (results.length === 1 ? " question" : " questions");
  const groups = [];
  for (const name of topics) {
    const matches = results.filter(question => question.topic === name);
    if (!matches.length) continue;
    const group = element("section", undefined, "browse-group");
    const list = element("ul");
    for (const question of matches) {
      const row = element("li");
      const mark = gradeValues.indexOf(progress[question.id]);
      const link = studyLink(question.id);
      link.prepend(element("span", questionLabel(question.id) + " ", "browse-id"));
      row.append(link, element("span", mark < 0 ? "Unseen" : grades[mark], "browse-mark"));
      list.append(row);
    }
    group.append(element("h2", name), list);
    groups.push(group);
  }
  el("browse-results").replaceChildren(...(groups.length ? groups : [
    element("p", "No questions match these filters. Try a different search or clear the filters."),
  ]));
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
  el("next").disabled = !quickSession && index >= count - 1 && !(reviewOnly && progress[currentId] !== "review");
  el("next").textContent = quickSession && index === count - 1 ? "See recap" : "Next →";

  if (!question || !count) {
    const heading = element("h2", reviewOnly ? "Nothing to review here" : "No matching questions");
    heading.tabIndex = -1;
    heading.id = "question-title";
    const description = reviewOnly ? "Questions marked Needs review appear here." : "Try another search or clear the filters.";
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
  questionCard.replaceChildren(meta, heading, reveal, answer);
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
    answer.append(actions);
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
  } else if (!quickSession && reviewOnly && progress[currentId] !== "review") {
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
for (const id of ["review-queue", "mobile-review"]) {
  el(id).addEventListener("click", () => {
    reviewOnly = !reviewOnly;
    topicSelect.value = "";
    searchInput.value = "";
    updateFilters();
  });
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
      for (const id of missedIds) progress[id] = "review";
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

function followLocation(focus = false) {
  const mockMode = location.hash === "#mocks";
  const labMode = location.hash === "#lab";
  const browseMode = location.hash === "#browse";
  const qMatch = location.hash.match(/^#q-(\d+)$/);
  el("practice").hidden = mockMode || labMode || browseMode;
  el("mocks").hidden = !mockMode;
  el("lab").hidden = !labMode;
  el("browse-panel").hidden = !browseMode;
  const activeNav = browseMode ? "browse" : mockMode ? "mocks" : labMode ? "lab" : "practice";
  for (const nav of document.querySelectorAll(".site-header nav a")) {
    if (nav.id === "nav-" + activeNav) nav.setAttribute("aria-current", "page");
    else nav.removeAttribute("aria-current");
  }
  if (mockMode) {
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
  } else if (labMode) {
    if (focus) {
      el("lab-heading").tabIndex = -1;
      el("lab-heading").focus();
    }
  } else if (qMatch && byId.has(Number(qMatch[1]))) {
    quickSession = null;
    selectedTrack = tracks[0];
    reviewOnly = false;
    searchInput.value = "";
    topicSelect.value = "";
    currentId = Number(qMatch[1]);
    updateFilters();
    if (focus) el("question-title").focus();
  } else if (focus) {
    el("practice-heading").tabIndex = -1;
    el("practice-heading").focus();
  }
}

document.querySelector(".skip-link").addEventListener("click", event => {
  event.preventDefault();
  el("main").focus();
});
window.addEventListener("hashchange", () => followLocation(true));
updateFilters();
followLocation();
