import { questions, topics, tracks, mocks, references } from "./bank.js";

const el = id => document.getElementById(id);
const questionLabel = id => "Q" + String(id).padStart(3, "0");
const key = "qa-interview-practice.progress.v1";
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
let selectedTrack = tracks[0];
let reviewOnly = false;
let currentId = questions[0].id;
let visibleQuestions = [];
let answerVisible = false;
let storageAvailable = true;
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

function record(grade) {
  progress[currentId] = grade;
  try {
    localStorage.setItem(key, JSON.stringify(progress));
  } catch {
    storageAvailable = false;
  }

  // A resolved review item remains in view until the learner presses Next.
  renderProgress();
  if (reviewOnly && grade !== "review") el("next").disabled = false;
  for (const control of questionCard.querySelectorAll("[data-grade]")) {
    control.setAttribute("aria-pressed", String(control.dataset.grade === grade));
  }
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
  const pool = selectedTrack.numbers?.map(id => byId.get(id)) ?? questions;
  const terms = searchInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  visibleQuestions = pool.filter(question => {
    const haystack = [
      questionLabel(question.id), "q" + question.id, question.id, question.topic, question.prompt,
    ].join(" ").toLowerCase();
    return (!reviewOnly || progress[question.id] === "review") &&
      (!topicSelect.value || question.topic === topicSelect.value) &&
      terms.every(term => haystack.includes(term));
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

function renderQuestion(focus = false) {
  questionCard.setAttribute("aria-labelledby", "question-title");
  const question = byId.get(currentId);
  const index = visibleQuestions.findIndex(row => row.id === currentId);
  const count = visibleQuestions.length;
  el("result-label").textContent = count ? "Question " + (index + 1) + " of " + count : "No matching questions";
  matchSelect.replaceChildren(...visibleQuestions.map(row => option(row.id, questionLabel(row.id) + " · " + row.prompt)));
  matchSelect.value = currentId ?? "";
  matchSelect.hidden = count < 2;
  el("question-controls").hidden = count === 0;
  el("previous").disabled = index <= 0;
  el("next").disabled = index >= count - 1 && !(reviewOnly && progress[currentId] !== "review");

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
  const number = element("a", questionLabel(question.id));
  number.href = "#q-" + question.id;
  number.setAttribute("aria-label", "Link to " + questionLabel(question.id));
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
    for (const block of question.answer) {
      if (block.code !== undefined) {
        const pre = element("pre");
        pre.tabIndex = 0;
        pre.setAttribute("aria-label", "Code example");
        pre.append(element("code", block.code));
        answer.append(pre);
      } else {
        answer.append(element("p", block.text));
      }
    }
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
  if (location.hash.startsWith("#q-")) {
    history.replaceState(null, "", "#q-" + id);
  }
  answerVisible = false;
  renderQuestion(true);
}

function moveQuestion(offset) {
  const index = visibleQuestions.findIndex(row => row.id === currentId);
  const nextQuestion = visibleQuestions[index + offset];
  if (reviewOnly && progress[currentId] !== "review") {
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
el("mobile-track").addEventListener("change", event => selectTrack(tracks.find(track => track.id === event.target.value)));
for (const id of ["review-queue", "mobile-review"]) {
  el(id).addEventListener("click", () => {
    reviewOnly = !reviewOnly;
    topicSelect.value = "";
    searchInput.value = "";
    updateFilters();
  });
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
    answers: mock.questions.map(() => ({ revealed: false, scores: [false, false, false] })),
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
  if (answer.revealed) {
    const detail = element("div", undefined, "answer");
    detail.append(element("p", "Follow-up — " + item.followup));
    const field = element("fieldset", undefined, "rubric");
    field.append(element("legend", "Award one point for each item you covered"));
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
    detail.append(field);
    card.append(detail);
  } else {
    card.append(button("Reveal follow-up and rubric", () => {
      answer.revealed = true;
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
    } else {
      attempt.index++;
    }
    renderMock(true);
  }, "primary");
  controls.append(previous, next);
  mockContent.replaceChildren(status, card, controls);
  if (deadline) updateTimer();
  if (focus) heading.focus();
}

function renderMockSummary(focus) {
  const { mock, answers } = attempt;
  const points = answers.map(answer => answer.scores.filter(Boolean).length);
  const total = points.reduce((sum, score) => sum + score, 0);
  const card = element("article", undefined, "question-card mock-summary");
  const heading = element("h2", mock.name + " results");
  heading.tabIndex = -1;
  card.append(heading, element("p", total + " / " + (points.length * 3), "mock-score"));
  card.append(element("p", "Open any question to review its suggested answer."));
  const list = element("ol");
  for (const [i, item] of mock.questions.entries()) {
    const row = element("li");
    const link = element("a", byId.get(item.id).prompt);
    link.href = "#q-" + item.id;
    row.append(link, " · " + points[i] + "/3");
    list.append(row);
  }
  card.append(list);
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
  const qMatch = location.hash.match(/^#q-(\d+)$/);
  el("practice").hidden = mockMode;
  el("mocks").hidden = !mockMode;
  el(mockMode ? "nav-mocks" : "nav-practice").setAttribute("aria-current", "page");
  el(mockMode ? "nav-practice" : "nav-mocks").removeAttribute("aria-current");
  if (mockMode) {
    renderMock();
    if (focus) {
      el("mock-heading").tabIndex = -1;
      el("mock-heading").focus();
    }
  } else if (qMatch && byId.has(Number(qMatch[1]))) {
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
