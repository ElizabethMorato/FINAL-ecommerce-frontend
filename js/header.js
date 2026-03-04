import { updateHeaderAuth, getSession, clearSession } from "./auth.js";
import { initCart } from "./cart.js";

export function initPromoMarquee() {
  const track = document.getElementById("promoTrack");
  if (!track || track.dataset.ready === "1") return;
  track.dataset.ready = "1";
  const original = track.innerHTML.trim();
  track.innerHTML = original + original;
  let x = 0;
  function step() {
    x -= 0.7;
    const half = track.scrollWidth / 2;
    if (Math.abs(x) >= half) x = 0;
    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export function initSearchBar() {
  const searchBtn = document.getElementById("searchBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("searchInput");

  if (!searchBtn || !searchOverlay) return;

  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("open");
    setTimeout(() => searchInput?.focus(), 100);
  });

  searchClose?.addEventListener("click", () => searchOverlay.classList.remove("open"));

  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove("open");
  });

  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = searchInput.value.trim();
      if (q) window.location.href = `./products.html?search=${encodeURIComponent(q)}`;
    }
  });
}

export function initLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearSession();
    window.location.href = "./index.html";
  });
}

export function initHeader() {
  initPromoMarquee();
  updateHeaderAuth();
  initCart();
  initSearchBar();
  initLogout();
}
