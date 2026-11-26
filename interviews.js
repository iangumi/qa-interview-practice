import { questions } from "./bank.js";

const key = "qa-interview-practice.interviews.v1";
const legacyKey = "qa-interview-practice.radar-personal.v1";
const ids = new Set(questions.map(question => question.id));
let state = load() ?? migrate();
let onChange = () => {};
let pendingId = null;
let inMemoryOnly = false;

function read(key) {
  try { return JSON.parse(localStorage.getItem(key)); }
  catch { return null; }
}

function load() {
  const saved = read(key);
  if (!Array.isArray(saved?.sessions)) return null;
  const sessions = saved.sessions.filter(item =>
    typeof item?.id === "string" && typeof item.name === "string" && Array.isArray(item.questions)
  ).map(item => ({ ...item, questions: [...new Set(item.questions.filter(id => ids.has(id)))] }));
  return { sessions, active: sessions.some(item => item.id === saved.active) ? saved.active : sessions[0]?.id };
}

function store() {
  try { localStorage.setItem(key, JSON.stringify(state)); }
  catch { inMemoryOnly = true; }
}

function migrate() {
  const saved = Object.entries(read(legacyKey) ?? {}).filter(([id, time]) =>
    ids.has(Number(id)) && Number.isFinite(time)
  ).sort((a, b) => b[1] - a[1]).map(([id]) => Number(id));
  if (!saved.length) return { sessions: [], active: null };
  return { active: "previous-radar", sessions: [
    { id: "previous-radar", name: "Saved Radar questions", date: "", company: "", questions: [...new Set(saved)] },
  ] };
}

function sync() {
  if (!inMemoryOnly) state = load() ?? state;
}

export function interviewSessions() {
  return state.sessions;
}

export function activeInterview() {
  return state.sessions.find(item => item.id === state.active);
}

export function selectInterview(id) {
  sync();
  if (!state.sessions.some(item => item.id === id)) return;
  state.active = id;
  store();
  onChange();
}

function announce(message) {
  document.getElementById("interview-announcement").textContent =
    message + (inMemoryOnly ? " Browser storage is unavailable. Changes are for this visit only." : "");
}

export function openInterviewForm(id = null) {
  pendingId = id;
  const form = document.getElementById("interview-form");
  form.reset();
  const now = new Date();
  form.elements.date.value = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  document.getElementById("interview-dialog").showModal();
  form.elements.title.focus();
}

function toggleQuestion(id, button) {
  sync();
  const session = activeInterview();
  if (!session) {
    openInterviewForm(id);
    return;
  }
  const removing = session.questions.includes(id);
  if (removing) session.questions = session.questions.filter(questionId => questionId !== id);
  else session.questions.push(id);
  store();
  const scope = button.closest("#browse-panel, #question");
  onChange();
  const target = scope?.querySelector('[data-interview-question="' + id + '"] button');
  if (!removing) target?.classList.add("interview-hit");
  target?.focus({ preventScroll: true });
  announce(removing ? "Question removed from " + session.name + "." : "🎯 Saved to " + session.name + ".");
}

export function paintInterviewButton(container) {
  const id = Number(container.dataset.interviewQuestion);
  const saved = activeInterview()?.questions.includes(id) ?? false;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "interview-save";
  button.textContent = saved ? "✓ Saved" : "Save Question";
  button.setAttribute("aria-pressed", String(saved));
  button.setAttribute("aria-label", (saved ? "Saved. Remove question" : "Save Question") + " Q" + String(id).padStart(3, "0"));
  button.title = saved ? "Remove from active interview" : "Save to active interview";
  button.addEventListener("click", () => toggleQuestion(id, button));
  container.replaceChildren(button);
}

export function interviewButton(id) {
  const node = document.createElement("div");
  node.className = "interview-widget";
  node.dataset.interviewQuestion = id;
  paintInterviewButton(node);
  return node;
}

export function initInterviews(render) {
  onChange = render;
  if (state.active === "previous-radar" && !load()) store();
  const dialog = document.getElementById("interview-dialog");
  const form = document.getElementById("interview-form");
  document.getElementById("interview-cancel").addEventListener("click", () => dialog.close());
  form.elements.title.addEventListener("input", () => form.elements.title.setCustomValidity(""));
  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = form.elements.title.value.trim();
    if (!name) {
      form.elements.title.setCustomValidity("Enter a name for this interview.");
      form.elements.title.reportValidity();
      return;
    }
    sync();
    const id = crypto.randomUUID();
    const questionId = pendingId;
    state.sessions.unshift({
      id, name, date: form.elements.date.value, company: form.elements.company.value.trim(),
      questions: questionId === null ? [] : [questionId],
    });
    state.active = id;
    store();
    dialog.close();
    onChange();
    if (questionId !== null) {
      const panel = document.querySelector("#browse-panel:not([hidden]), #practice:not([hidden])");
      panel?.querySelector('[data-interview-question="' + questionId + '"] button')?.focus({ preventScroll: true });
    }
    announce(questionId === null ? "Interview created." : "🎯 Interview created and question saved.");
  });
  window.addEventListener("storage", event => {
    if (event.key !== key && event.key !== null) return;
    state = load() ?? { sessions: [], active: null };
    onChange();
  });
}
