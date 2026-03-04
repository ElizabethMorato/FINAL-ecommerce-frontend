import { createClient, getClients } from "./api.js";
import { ADMIN_CREDENTIALS } from "./config.js";

const SESSION_KEY = "ofihome_session";

// ── Sesión ────────────────────────────────────────────
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch { return null; }
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn() {
  return !!getSession();
}

export function isAdmin() {
  const s = getSession();
  return s?.role === "admin";
}

export function requireLogin(redirectTo = "login.html") {
  if (!isLoggedIn()) {
    window.location.href = redirectTo;
  }
}

export function requireAdmin(redirectTo = "../index.html") {
  if (!isAdmin()) {
    window.location.href = redirectTo;
  }
}

// ── Registro ──────────────────────────────────────────
export async function register({ name, lastname, email, telephone, password }) {
  // Verificar si email ya existe
  const clients = await getClients({ limit: 1000 });
  const exists = clients.find(c => c.email === email);
  if (exists) throw new Error("El email ya está registrado.");

  const client = await createClient({ name, lastname, email, telephone });
  // Guardamos password en localStorage (simulado, no va al backend)
  const users = getStoredUsers();
  users[email] = { password, clientId: client.id_key };
  localStorage.setItem("ofihome_users", JSON.stringify(users));

  saveSession({ ...client, role: "client", password });
  return client;
}

// ── Login ─────────────────────────────────────────────
export async function login(email, password) {
  // Admin hardcodeado
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    saveSession({ name: "Admin", lastname: "", email, role: "admin", id_key: 0 });
    return { role: "admin" };
  }

  const users = getStoredUsers();
  const stored = users[email];
  if (!stored || stored.password !== password) {
    throw new Error("Email o contraseña incorrectos.");
  }

  const clients = await getClients({ limit: 1000 });
  const client = clients.find(c => c.email === email);
  if (!client) throw new Error("Usuario no encontrado.");

  saveSession({ ...client, role: "client" });
  return client;
}

function getStoredUsers() {
  try { return JSON.parse(localStorage.getItem("ofihome_users")) || {}; }
  catch { return {}; }
}

// ── Actualizar header según sesión ────────────────────
export function updateHeaderAuth() {
  const session = getSession();
  const userBtn = document.getElementById("userBtn");
  const userLabel = document.getElementById("userLabel");
  const cartBtn = document.getElementById("cartBtn");

  if (!userBtn) return;

  if (session) {
    userBtn.title = session.name;
    if (userLabel) userLabel.textContent = session.name.split(" ")[0];
    userBtn.href = session.role === "admin" ? "./admin/index.html" : "./profile.html";
    userBtn.innerHTML = `<i class="bi bi-person-check-fill"></i>`;
    if (cartBtn) cartBtn.style.display = session.role === "admin" ? "none" : "";
  } else {
    userBtn.href = "./login.html";
    userBtn.innerHTML = `<i class="bi bi-person"></i>`;
  }
}
