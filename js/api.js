import { API_BASE_URL } from "./config.js";

export async function request(path, { method = "GET", body, headers } = {}) {
  const url = `${API_BASE_URL}${path}`;
  const opts = {
    method,
    headers: {
      "Accept": "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(headers || {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(url, opts);
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    const msg = typeof data === "string" ? data : (data?.detail || JSON.stringify(data));
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return data;
}

// ── PRODUCTS ──────────────────────────────────────────
export const getProducts = ({ skip = 0, limit = 100 } = {}) =>
  request(`/products?skip=${skip}&limit=${limit}`);
export const getProduct = (id) => request(`/products/${id}`);
export const createProduct = (data) => request("/products", { method: "POST", body: data });
export const updateProduct = (id, data) => request(`/products/${id}`, { method: "PUT", body: data });
export const deleteProduct = (id) => request(`/products/${id}`, { method: "DELETE" });

// ── CATEGORIES ────────────────────────────────────────
export const getCategories = () => request("/categories?limit=100");
export const createCategory = (data) => request("/categories", { method: "POST", body: data });
export const deleteCategory = (id) => request(`/categories/${id}`, { method: "DELETE" });

// ── CLIENTS ───────────────────────────────────────────
export const getClients = ({ skip = 0, limit = 100 } = {}) =>
  request(`/clients?skip=${skip}&limit=${limit}`);
export const getClient = (id) => request(`/clients/${id}`);
export const createClient = (data) => request("/clients", { method: "POST", body: data });
export const updateClient = (id, data) => request(`/clients/${id}`, { method: "PUT", body: data });
export const deleteClient = (id) => request(`/clients/${id}`, { method: "DELETE" });

// ── ADDRESSES ─────────────────────────────────────────
export const getAddresses = () => request("/addresses?limit=1000");
export const createAddress = (data) => request("/addresses", { method: "POST", body: data });

// ── BILLS ─────────────────────────────────────────────
export const createBill = (data) => request("/bills", { method: "POST", body: data });
export const getBills = () => request("/bills?limit=1000");

// ── ORDERS ────────────────────────────────────────────
export const getOrders = ({ skip = 0, limit = 100 } = {}) =>
  request(`/orders?skip=${skip}&limit=${limit}`);
export const getOrder = (id) => request(`/orders/${id}`);
export const createOrder = (data) => request("/orders", { method: "POST", body: data });
export const updateOrder = (id, data) => request(`/orders/${id}`, { method: "PUT", body: data });

// ── ORDER DETAILS ─────────────────────────────────────
export const getOrderDetails = () => request("/order_details?limit=1000");
export const createOrderDetail = (data) => request("/order_details", { method: "POST", body: data });

// ── REVIEWS ───────────────────────────────────────────
export const getReviews = () => request("/reviews?limit=1000");
export const createReview = (data) => request("/reviews", { method: "POST", body: data });

// ── HEALTH ────────────────────────────────────────────
export const healthCheck = () => request("/health_check");
