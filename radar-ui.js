import { reportGroup } from "./radar-groups.js";
const key = "qa-interview-practice.radar-personal.v1";
let marks = readMarks();
let render = () => {};

function readMarks() {
  try {
    const values = Object.entries(JSON.parse(localStorage.getItem(key)) ?? {});
    return new Map(values.filter(([id, date]) => /^\d+$/.test(id) &&
      Number.isFinite(date) && !Number.isNaN(new Date(date).getTime()))
      .map(([id, date]) => [Number(id), date]));
  } catch {
    return new Map();
  }
}

export function recentQuestions(questions) {
  const found = new Map();
  for (const question of questions) {
    const group = reportGroup(question.id);
    if (marks.has(group) && (!found.has(group) || question.id === group)) found.set(group, question);
  }
  return [...found].sort(([a], [b]) => marks.get(b) - marks.get(a) || a - b).map(([, question]) => question);
}

export function radarMessage() {
  return "Mark a question you’ve been asked to add it to your Radar.";
}

export function radarDate(id) {
  const date = marks.get(reportGroup(id));
  return date === undefined ? "" : "Marked " + new Date(date).toLocaleDateString(undefined, {
    month: "short", day: "numeric",
  });
}

function toggle(id, control) {
  const group = reportGroup(id);
  const removing = marks.has(group);
  if (removing) marks.delete(group);
  else marks.set(group, Date.now());
  let saved = true;
  try {
    localStorage.setItem(key, JSON.stringify(Object.fromEntries(marks)));
  } catch {
    saved = false;
  }
  const scope = control.closest("#browse-panel") ?? control.closest("#question");
  render();
  const target = scope?.querySelector('[data-radar-question="' + id + '"]');
  if (!removing) target?.classList.add("radar-hit");
  if (target) target.querySelector("button")?.focus({ preventScroll: true });
  else scope?.querySelector('[aria-current="page"]')?.focus({ preventScroll: true });
  document.getElementById("radar-announcement").textContent = removing
    ? "Removed from your Radar."
    : "🎯 On your Radar!" + (saved ? "" : " This visit only.");
}

export function paintVote(container) {
  const id = Number(container.dataset.radarQuestion);
  const marked = marks.has(reportGroup(id));
  const vote = document.createElement("button");
  vote.type = "button";
  vote.className = "radar-vote";
  vote.textContent = marked ? "🎯 On my Radar · Undo" : "🎯 I got asked this!";
  vote.setAttribute("aria-pressed", String(marked));
  vote.setAttribute("aria-label", vote.textContent + " · Q" + String(id).padStart(3, "0"));
  vote.addEventListener("click", () => toggle(id, vote));
  container.replaceChildren(vote);
  if (marked) {
    const caption = document.createElement("small");
    caption.textContent = radarDate(id);
    container.append(caption);
  }
}

export function radarWidget(id) {
  const node = document.createElement("div");
  node.className = "radar-widget";
  node.dataset.radarQuestion = id;
  paintVote(node);
  return node;
}

export function initRadar(onChange) {
  render = onChange;
  window.addEventListener("storage", event => {
    if (event.key !== key && event.key !== null) return;
    marks = readMarks();
    render();
  });
}
