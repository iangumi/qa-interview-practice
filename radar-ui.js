import { reportGroup, reportRoles } from "./radar-groups.js";
import {
  radarConfigured, fetchRadarSummary, fetchMyReports, sendRadarLink,
  verifyRadarLink, setRadarReport, radarSignOut,
} from "./radar-api.js";

const byId = id => document.getElementById(id);
const empty = new Map();
let summaries = new Map();
let mine = new Set();
let signedIn = false;
let availability = radarConfigured ? "loading" : "pending";
let selectedRole = "";
let refreshSequence = 0;
let render = () => {};
let questionId;
let opener;
let busy = false;
let confirmToken;

export function radarRows(role = "") {
  return summaries.get(role) ?? empty;
}

export function rankQuestions(questions, mode, role = "") {
  const rows = radarRows(role);
  const ranked = new Map();
  for (const question of questions) {
    const group = reportGroup(question.id);
    if (rows.has(group) && (!ranked.has(group) || question.id === group)) ranked.set(group, question);
  }
  return [...ranked].sort(([left], [right]) => {
    const a = rows.get(left);
    const b = rows.get(right);
    const byCount = b.reports - a.reports;
    const byDate = b.last_reported.localeCompare(a.last_reported);
    return (mode === "recent" ? byDate || byCount : byCount || byDate) || left - right;
  }).map(([, question]) => question);
}

export function radarMessage() {
  return {
    pending: "Community reporting is awaiting setup.",
    loading: "Loading community reports…",
    offline: "Community reports are temporarily unavailable.",
    ready: "Collecting reports. Questions appear after five people report them.",
  }[availability];
}

export function radarCount(id, role = "", withDate = false) {
  const row = radarRows(role).get(reportGroup(id));
  if (!row) return "";
  const when = new Date(row.last_reported + "T00:00:00Z").toLocaleDateString(undefined, {
    month: "short", day: "numeric", timeZone: "UTC",
  });
  return row.reports + " reports in 90 days" + (withDate ? " · Latest " + when : "");
}

export function paintVote(container) {
  const id = Number(container.dataset.radarQuestion);
  const reported = mine.has(reportGroup(id));
  const vote = document.createElement("button");
  vote.type = "button";
  vote.className = "radar-vote";
  vote.disabled = !radarConfigured;
  vote.textContent = reported ? "🎯 On the radar! · Undo" : "🎯 I got asked this!";
  vote.setAttribute("aria-label", vote.textContent + " · Q" + String(id).padStart(3, "0"));
  vote.addEventListener("click", () => openReport(id, vote));
  const caption = document.createElement("small");
  caption.textContent = radarCount(id, container.dataset.radarRole, true) ||
    (radarConfigured ? (availability === "ready" ? "Collecting reports" : radarMessage()) : "Reporting setup pending");
  container.replaceChildren(vote, caption);
}

export function radarWidget(id, role = "") {
  const node = document.createElement("div");
  node.className = "radar-widget";
  node.dataset.radarQuestion = id;
  node.dataset.radarRole = role;
  paintVote(node);
  return node;
}

async function refresh() {
  if (!radarConfigured) return;
  const sequence = ++refreshSequence;
  const role = selectedRole;
  const results = await Promise.allSettled([
    fetchRadarSummary(""), role ? fetchRadarSummary(role) : Promise.resolve(null), fetchMyReports(),
  ]);
  if (sequence !== refreshSequence) return;
  const [all, filtered, own] = results;
  const asMap = rows => new Map(rows.filter(row => row.reports >= 5).map(row => [row.group_id, row]));
  if (all.status === "fulfilled") summaries.set("", asMap(all.value));
  else summaries.delete("");
  if (role && filtered.status === "fulfilled") summaries.set(role, asMap(filtered.value));
  else if (role) summaries.delete(role);
  availability = all.status === "fulfilled" && filtered.status === "fulfilled" ? "ready" : "offline";
  if (own.status === "fulfilled") {
    signedIn = own.value !== null;
    mine = new Set((own.value ?? []).map(row => row.group_id));
  } else if ([401, 403].includes(own.reason?.status)) {
    signedIn = false;
    mine = new Set();
  }
  byId("radar-logout").hidden = !signedIn;
  byId("radar-retry").hidden = availability !== "offline";
  render();
}

export function setRadarRole(role) {
  if (role === selectedRole) return;
  selectedRole = role;
  if (role && !summaries.has(role) && radarConfigured) availability = "loading";
  render();
  void refresh();
}

function showStep(step) {
  for (const name of ["report", "email", "confirm"]) byId("radar-" + name + "-form").hidden = name !== step;
  byId("radar-dialog-status").textContent = "";
  byId("radar-dialog-title").textContent = {
    report: "🎯 Put it on the radar",
    email: "Verify your email",
    confirm: "Finish signing in",
  }[step];
}

function openReport(id, control) {
  questionId = id;
  opener = control;
  byId("radar-recent-check").checked = false;
  byId("radar-report-role").value = "";
  const reported = mine.has(reportGroup(id));
  byId("radar-report-inputs").hidden = reported;
  byId("radar-recent-check").required = !reported;
  byId("radar-submit-report").textContent = reported ? "Undo report" : "Report question";
  byId("radar-report-context").textContent = "Question Q" + String(id).padStart(3, "0");
  showStep("report");
  byId("radar-dialog").showModal();
}

async function submit(form, action, errorMessage) {
  if (busy) return;
  const submit = form.querySelector("button[type=submit]");
  busy = true;
  submit.disabled = true;
  try {
    await action();
  } catch (error) {
    byId("radar-dialog-status").textContent = error.status === 429 ? "Please wait before trying again. There’s a limit on new reports and verification emails." : errorMessage;
  } finally {
    submit.disabled = false;
    busy = false;
  }
}

export function initRadar(onChange) {
  render = onChange;
  if (!radarConfigured) return;
  for (const [value, label] of reportRoles) {
    const option = new Option(label, value);
    byId("radar-report-role").add(option);
  }
  const dialog = byId("radar-dialog");
  byId("radar-close").addEventListener("click", () => { if (!busy) dialog.close(); });
  dialog.addEventListener("cancel", event => { if (busy) event.preventDefault(); });
  dialog.addEventListener("close", () => { if (opener?.isConnected) opener.focus(); });
  byId("radar-retry").addEventListener("click", refresh);
  byId("radar-logout").addEventListener("click", async () => {
    try { await radarSignOut(); } catch { /* Local sign-out still completes. */ }
    signedIn = false;
    mine = new Set();
    await refresh();
    byId("radar-announcement").textContent = "Signed out of Interview Radar.";
  });
  byId("radar-report-form").addEventListener("submit", event => {
    event.preventDefault();
    if (!signedIn) {
      showStep("email");
      byId("radar-email").focus();
      return;
    }
    return submit(event.currentTarget, async () => {
      const id = questionId;
      const reporting = !mine.has(reportGroup(id));
      try {
        await setRadarReport(id, reporting, byId("radar-report-role").value);
      } catch (error) {
        if ([401, 403].includes(error.status)) {
          showStep("email");
          byId("radar-email").focus();
          return;
        }
        throw error;
      }
      const group = reportGroup(id);
      if (reporting) mine.add(group);
      else mine.delete(group);
      dialog.close();
      await refresh();
      const target = [...document.querySelectorAll("[data-radar-question]")].find(node =>
        node.dataset.radarQuestion === String(id) && node.getClientRects().length);
      target?.querySelector("button")?.focus();
      if (reporting) target?.classList.add("radar-hit");
      byId("radar-announcement").textContent = reporting ? "🎯 On the radar! Your report was saved." : "Your report was removed.";
    }, "Could not update your report. Try again.");
  });
  byId("radar-email-form").addEventListener("submit", event => {
    event.preventDefault();
    return submit(event.currentTarget, async () => {
      await sendRadarLink(byId("radar-email").value.trim());
      try { sessionStorage.setItem("interview-radar-return", JSON.stringify({ id: questionId, route: location.hash })); } catch {}
      byId("radar-dialog-status").textContent = "Check your inbox for a sign-in link. You’ll confirm the report after signing in.";
    }, "Could not send the sign-in link. Try again.");
  });
  byId("radar-confirm-form").addEventListener("submit", event => {
    event.preventDefault();
    return submit(event.currentTarget, async () => {
      await verifyRadarLink(confirmToken);
      confirmToken = undefined;
      dialog.close();
      await refresh();
      byId("radar-announcement").textContent = "You’re signed in. Choose a question to report.";
    }, "This link is invalid or expired. Close this message and request a new link.");
  });
  const token = new URLSearchParams(location.hash.slice(1)).get("radar-confirm");
  if (token) {
    confirmToken = token;
    let previous;
    try {
      previous = JSON.parse(sessionStorage.getItem("interview-radar-return"));
      sessionStorage.removeItem("interview-radar-return");
    } catch {}
    const route = ["#browse", "#radar-top", "#radar-recent"].includes(previous?.route)
      ? previous.route : Number.isInteger(previous?.id) ? "#q-" + previous.id : "#browse";
    history.replaceState(null, "", route);
    showStep("confirm");
    dialog.showModal();
  }
  void refresh();
}
