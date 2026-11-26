import { radarConfig } from "./radar-config.js";

const storageKey = "qa-interview-practice.radar-session.v1";
let memorySession = null;
let refreshing;
export const radarConfigured = Boolean(radarConfig.url && radarConfig.publishableKey);
const base = radarConfig.url.replace(/\/$/, "");

function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return memorySession;
  }
}

function saveSession(value) {
  memorySession = value;
  try {
    if (value) localStorage.setItem(storageKey, JSON.stringify(value));
    else localStorage.removeItem(storageKey);
  } catch {
    // Signing in still works for the open page when storage is unavailable.
  }
}

async function request(path, body, accessToken) {
  const headers = { apikey: radarConfig.publishableKey, "Content-Type": "application/json" };
  if (accessToken) headers.Authorization = "Bearer " + accessToken;
  const response = await fetch(base + path, {
    method: "POST", headers, ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    cache: "no-store",
  });
  if (!response.ok) {
    const error = new Error("Radar request failed");
    error.status = response.status;
    throw error;
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function storeTokens(data) {
  if (!data?.access_token || !data.refresh_token) throw new Error("Missing account session");
  const session = {
    accessToken: data.access_token, refreshToken: data.refresh_token,
    expiresAt: Date.now() + Number(data.expires_in) * 1000,
  };
  saveSession(session);
  return session;
}

async function getAccessToken() {
  const session = getStoredSession();
  if (!session) return null;
  if (session.expiresAt > Date.now() + 30_000) return session.accessToken;
  if (!refreshing) {
    const refresh = async () => {
      const active = getStoredSession();
      if (!active) return null;
      if (active.expiresAt > Date.now() + 30_000) return active.accessToken;
      try {
        const data = await request("/auth/v1/token?grant_type=refresh_token", { refresh_token: active.refreshToken });
        return storeTokens(data).accessToken;
      } catch (error) {
        if (![400, 401, 403].includes(error.status)) throw error;
        saveSession(null);
        return null;
      }
    };
    refreshing = (navigator.locks ? navigator.locks.request(storageKey, refresh) : refresh())
      .finally(() => { refreshing = undefined; });
  }
  return refreshing;
}

export async function sendRadarLink(email) {
  await request("/auth/v1/otp", { email, create_user: true });
}

export async function verifyRadarLink(tokenHash) {
  storeTokens(await request("/auth/v1/verify", { token_hash: tokenHash, type: "email" }));
}

export async function radarSignOut() {
  const session = getStoredSession();
  try {
    if (session) {
      const token = await getAccessToken();
      if (token) await request("/auth/v1/logout?scope=local", undefined, token);
    }
  } finally {
    saveSession(null);
  }
}

export async function fetchRadarSummary(role) {
  return request("/rest/v1/rpc/interview_radar_summary", { p_role: role || null });
}

export async function fetchMyReports() {
  const token = await getAccessToken();
  return token ? request("/rest/v1/rpc/interview_radar_mine", {}, token) : null;
}

export async function setRadarReport(question, report, role) {
  const token = await getAccessToken();
  if (!token) {
    const error = new Error("Please sign in again");
    error.status = 401;
    throw error;
  }
  await request("/rest/v1/rpc/interview_radar_set", {
    p_question: question, p_report: report, p_role: role || null,
  }, token);
}
