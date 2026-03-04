// ── Toast ─────────────────────────────────────────────
export function toast(msg, type = "info", duration = 3500) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    document.body.appendChild(container);
  }
  const el = document.createElement("div");
  const icons = { success: "bi-check-circle-fill", error: "bi-x-circle-fill", info: "bi-info-circle-fill" };
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="bi ${icons[type] || icons.info}"></i> ${msg}`;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; setTimeout(() => el.remove(), 300); }, duration);
}

// ── Formato precio ─────────────────────────────────────
export function formatPrice(n) {
  return "$" + Number(n).toLocaleString("es-AR", { minimumFractionDigits: 2 });
}

// ── Stars HTML ─────────────────────────────────────────
export function starsHtml(rating) {
  const r = Math.round(rating * 2) / 2;
  let s = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= r) s += "★";
    else if (i - 0.5 === r) s += "½";
    else s += "☆";
  }
  return s;
}

// ── Fecha formateada ───────────────────────────────────
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Query params ───────────────────────────────────────
export function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}


// ── Imagen de producto ────────────────────────────────
const FALLBACK_IMG = "./imagen/kallax-estante-negro.avif";

export function getProductImage(product) {
  if (typeof product === "string") return product || FALLBACK_IMG;
  return product?.image_url || FALLBACK_IMG;
}

// ── Debounce ───────────────────────────────────────────
export function debounce(fn, ms = 300) {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// ── Loading state ──────────────────────────────────────
export function showLoading(el) {
  if (!el) return;
  el.innerHTML = `<div class="loading-spinner"></div>`;
}

export function showEmpty(el, title = "Sin resultados", msg = "") {
  if (!el) return;
  el.innerHTML = `
    <div class="empty-state">
      <i class="bi bi-inbox"></i>
      <h3>${title}</h3>
      ${msg ? `<p>${msg}</p>` : ""}
    </div>`;
}
