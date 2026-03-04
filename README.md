# 🛒 OfiHome — Frontend

> Tu espacio de trabajo ideal

**OfiHome** es una tienda online de muebles y accesorios para el hogar y la oficina. Este repositorio contiene el frontend completo del e-commerce, desarrollado con HTML, CSS y JavaScript vanilla, conectado a una API REST en FastAPI desplegada en Render.

---

## 🌐 Demo en vivo

| Servicio | URL |
|----------|-----|
| 🛍️ Tienda | [https://ofihome.onrender.com](https://ofihome.onrender.com) |
| ⚙️ API Backend | [https://final-ecommerce-backend-v4w1.onrender.com](https://final-ecommerce-backend-v4w1.onrender.com) |
| 📖 Documentación API | [https://final-ecommerce-backend-v4w1.onrender.com/docs](https://final-ecommerce-backend-v4w1.onrender.com/docs) |


## 🎯 Visión del proyecto

OfiHome nació con la idea de ofrecer una experiencia de compra simple, moderna y segura para personas que buscan equipar su hogar u oficina con productos de calidad. La plataforma permite explorar un catálogo de productos, gestionar un carrito de compras, completar pedidos con distintos métodos de entrega y pago, y acceder a un panel de administración completo.

---

## ✨ Funcionalidades

### 🛍️ Tienda
- Página de inicio con productos destacados y categorías
- Catálogo completo con filtros por categoría, precio y disponibilidad
- Ordenamiento por precio, nombre y stock
- Página de detalle de producto con galería y reseñas
- Carrito de compras persistente (localStorage)
- Indicador de stock bajo y productos sin stock

### 🔐 Autenticación
- Registro de nuevos clientes
- Login con sesión persistente
- Panel de perfil con historial de pedidos
- Acceso de administrador protegido

### 💳 Checkout
- Formulario de datos personales y dirección de entrega
- 3 métodos de entrega: Drive-thru, Retiro en tienda, Envío a domicilio
- 2 métodos de pago: Tarjeta de crédito, Efectivo
- Envío gratis en compras mayores a $100.000
- Confirmación de pedido con número de orden y factura

### ⚙️ Panel de administración
- Dashboard con métricas: productos, pedidos, clientes, ingresos
- Gestión completa de productos (crear, editar, eliminar)
- Gestión de categorías
- Listado y seguimiento de pedidos con cambio de estado
- Listado de clientes

---

## 🗂️ Estructura del proyecto

```
ofihome-frontend/
├── index.html              # Página de inicio
├── products.html           # Catálogo de productos
├── product-detail.html     # Detalle de producto
├── cart.html               # Carrito de compras
├── checkout.html           # Finalizar compra
├── login.html              # Ingreso y registro
├── profile.html            # Perfil del usuario
├── admin/
│   ├── index.html          # Dashboard admin
│   ├── products.html       # Gestión de productos
│   ├── orders.html         # Gestión de pedidos
│   ├── clients.html        # Listado de clientes
│   └── categories.html     # Gestión de categorías
├── js/
│   ├── api.js              # Cliente HTTP - todos los endpoints
│   ├── auth.js             # Autenticación y sesión
│   ├── cart.js             # Lógica del carrito
│   ├── config.js           # URL base de la API y constantes
│   ├── header.js           # Componente de navegación
│   └── utils.js            # Funciones utilitarias
├── css/
│   └── styles.css          # Estilos globales
├── imagen/                 # Assets de imágenes
└── _headers                # Headers para Render Static Site
```

---

## 🛠️ Tecnologías

- **HTML5** — Estructura semántica
- **CSS3** — Diseño responsivo y animaciones
- **JavaScript ES6+** — Módulos, async/await, fetch API
- **Bootstrap Icons** — Iconografía
- **LocalStorage** — Persistencia del carrito y sesión

---

## 🔗 Backend

El frontend consume una API REST desarrollada en **FastAPI + PostgreSQL** desplegada en Render.

Repositorio del backend: [ElizabethMorato/FINAL-ecommerce-backend](https://github.com/ElizabethMorato/FINAL-ecommerce-backend)

### Endpoints principales utilizados

| Recurso | Endpoints |
|---------|-----------|
| Productos | `GET /products`, `GET /products/{id}` |
| Categorías | `GET /categories` |
| Clientes | `GET /clients`, `POST /clients` |
| Pedidos | `GET /orders`, `POST /orders` |
| Detalles de pedido | `POST /order_details` |
| Facturas | `POST /bills` |
| Direcciones | `POST /addresses` |
| Reseñas | `GET /reviews`, `POST /reviews` |

---

## 🚀 Correr en local

1. Cloná el repositorio
```bash
git clone https://github.com/ElizabethMorato/FINAL-ecommerce-frontend
```

2. Abrí la carpeta en VSCode

3. Instalá la extensión **Live Server** en VSCode

4. Hacé clic derecho en `index.html` → **Open with Live Server**

5. Asegurate de tener el backend corriendo (Docker o Render)

> Para usar el backend local, cambiá en `js/config.js`:
> ```javascript
> export const API_BASE_URL = "http://localhost:8000";
> ```

---

## 👤 Acceso de administrador

Para acceder al panel de administración, ingresá con las credenciales de admin desde la página de login.

> Las credenciales de acceso son proporcionadas por el administrador del sistema.

---

## 📦 Categorías disponibles

| ID | Categoría |
|----|-----------|
| 1 | Sillas |
| 2 | Escritorios |
| 3 | Estantes |
| 4 | Organizadores |
| 5 | Accesorios |

---

## 📄 Licencia

Proyecto académico — Uso educativo.
