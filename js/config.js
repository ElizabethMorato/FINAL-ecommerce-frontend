export const API_BASE_URL = "https://final-ecommerce-backend-v4w1.onrender.com";


// Admin hardcodeado (ya que el backend no tiene auth)
export const ADMIN_CREDENTIALS = {
  email: "admin@ofihome.com",
  password: "admin123"
};

// Categorías del e-commerce (se mapean a category_id del backend)
export const CATEGORIES = [
  { id: null, label: "Todos", icon: "bi-grid" },
  { id: 1, label: "Sillas", icon: "bi-arrow-up-square" },
  { id: 2, label: "Escritorios", icon: "bi-layout-text-window" },
  { id: 3, label: "Estantes", icon: "bi-bookshelf" },
  { id: 4, label: "Organizadores", icon: "bi-box" },
  { id: 5, label: "Accesorios", icon: "bi-lamp" },
];

export const DELIVERY_METHODS = {
  1: "Retiro en auto (Drive-thru)",
  2: "Retiro en tienda",
  3: "Entrega a domicilio",
};

export const ORDER_STATUS = {
  1: "Pendiente",
  2: "En progreso",
  3: "Entregado",
  4: "Cancelado",
};
