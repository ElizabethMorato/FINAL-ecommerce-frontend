const CART_KEY_PREFIX = "ofihome_cart_";

function getCartKey() {
  try {
    const session = JSON.parse(localStorage.getItem("ofihome_session"));
    return session?.id_key != null ? `${CART_KEY_PREFIX}${session.id_key}` : null;
  } catch { return null; }
}

export function getCart() {
  const key = getCartKey();
  if (!key) return [];
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  const key = getCartKey();
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(cart));
  updateCartBadge();
  renderMiniCart();
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id_key === product.id_key);
  if (idx >= 0) {
    cart[idx].qty = Math.min(cart[idx].qty + qty, product.stock);
  } else {
    cart.push({ ...product, qty });
  }
  saveCart(cart);
}

export function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id_key !== productId));
}

export function updateQty(productId, qty) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id_key === productId);
  if (idx >= 0) {
    if (qty <= 0) { cart.splice(idx, 1); }
    else { cart[idx].qty = qty; }
  }
  saveCart(cart);
}

export function clearCart() {
  const key = getCartKey();
  if (key) localStorage.removeItem(key);
  updateCartBadge();
  renderMiniCart();
}

export function getCartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

export function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? "" : "none";
  }
}

// ── Mini carrito desplegable ───────────────────────────
export function renderMiniCart() {
  const el = document.getElementById("miniCart");
  if (!el) return;
  const cart = getCart();

  if (cart.length === 0) {
    el.innerHTML = `
      <div class="mini-cart-empty">
        <i class="bi bi-bag-x" style="font-size:32px;color:#aaa"></i>
        <p>Tu carrito está vacío</p>
      </div>`;
    return;
  }

  const subtotal = getCartTotal();
  const basePath = "./";

  const itemsHtml = cart.map(i => {
    const imgUrl = i.image_url ? i.image_url.split(",")[0].trim() : "";
    const colorHtml = i.color ? `<div style="font-size:11px;color:#888;margin-top:1px;">Color: ${i.color}</div>` : "";
    return `
    <div style="display:flex;gap:10px;padding:10px 14px;align-items:center;border-bottom:1px solid #f5f5f5;">
      <a href="${basePath}product-detail.html?id=${i.id_key}" style="flex-shrink:0;">
        ${imgUrl ? `<img src="${imgUrl}" alt="${i.name}" onerror="this.style.visibility='hidden'"
             style="width:50px;height:50px;object-fit:cover;border-radius:8px;border:1px solid #eee;">` 
          : `<div style="width:50px;height:50px;border-radius:8px;background:#f5f5f5;"></div>`}
      </a>
      <div style="flex:1;min-width:0;">
        <a href="${basePath}product-detail.html?id=${i.id_key}" style="text-decoration:none;color:inherit;">
          <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${i.name}</div>
        </a>
        ${colorHtml}
        <div style="display:flex;align-items:center;gap:5px;margin-top:5px;">
          <button data-mc-minus="${i.id_key}" data-qty="${i.qty}"
            style="width:22px;height:22px;border:1px solid #ddd;border-radius:4px;background:#fff;cursor:pointer;font-size:13px;">−</button>
          <span style="font-size:13px;font-weight:600;min-width:18px;text-align:center;">${i.qty}</span>
          <button data-mc-plus="${i.id_key}" data-qty="${i.qty}" data-stock="${i.stock}"
            style="width:22px;height:22px;border:1px solid #ddd;border-radius:4px;background:#fff;cursor:pointer;font-size:13px;">+</button>
          <span style="font-size:12px;color:#888;margin-left:4px;">$${(i.price * i.qty).toLocaleString("es-AR")}</span>
        </div>
      </div>
      <button data-mc-remove="${i.id_key}"
        style="background:none;border:none;color:#bbb;cursor:pointer;padding:4px;font-size:15px;flex-shrink:0;">
        <i class="bi bi-trash3"></i>
      </button>
    </div>`;
  }).join("");

  el.innerHTML = `
    <div style="max-height:240px;overflow-y:auto;" id="miniCartItems">${itemsHtml}</div>
    <div style="padding:12px 14px;border-top:1px solid #eee;">
      <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:14px;">
        <span style="color:#666;">Subtotal</span>
        <strong>$${subtotal.toLocaleString("es-AR")}</strong>
      </div>
      <a href="${basePath}cart.html" style="display:block;text-align:center;padding:9px;border:1.5px solid #000;border-radius:9px;font-size:13px;font-weight:600;text-decoration:none;color:#000;margin-bottom:8px;">Ver carrito</a>
      <a href="${basePath}checkout.html" style="display:block;text-align:center;padding:9px;background:#000;border-radius:9px;font-size:13px;font-weight:600;text-decoration:none;color:#fff;">Comprar ahora</a>
    </div>`;

  el.querySelectorAll("[data-mc-minus]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.mcMinus);
      const qty = parseInt(btn.dataset.qty);
      updateQty(id, qty - 1);
    });
  });
  el.querySelectorAll("[data-mc-plus]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.mcPlus);
      const qty = parseInt(btn.dataset.qty);
      const stock = parseInt(btn.dataset.stock);
      if (qty < stock) updateQty(id, qty + 1);
    });
  });
  el.querySelectorAll("[data-mc-remove]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeFromCart(parseInt(btn.dataset.mcRemove));
    });
  });
}

export function toggleMiniCart() {
  const panel = document.getElementById("miniCartPanel");
  if (!panel) return;
  panel.classList.toggle("open");
}

export function initCart() {
  updateCartBadge();
  renderMiniCart();

  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMiniCart();
    });
  }

  document.addEventListener("click", (e) => {
    const panel = document.getElementById("miniCartPanel");
    const cartBtn = document.getElementById("cartBtn");
    if (panel && !panel.contains(e.target) && cartBtn && !cartBtn.contains(e.target)) {
      panel.classList.remove("open");
    }
  });
}
