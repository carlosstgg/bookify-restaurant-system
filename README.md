# Bookify - Restaurant Management System 🍽️

Bookify is a modern, full-stack web application designed to streamline restaurant operations. It features a robust Monorepo architecture integrating a powerful Node.js backend with a sleek Angular frontend.

## 🚀 Key Features

### FRONTEND (Angular 18+)
*   **Kitchen Display System (KDS):** Real-time order visualization for kitchen staff with high-contrast UI and "Late Order" alerts.
*   **Point of Sale (POS):** Efficient order taking interface with menu categorization and cart management.
*   **Inventory Management:** Track ingredient stock levels, unit costs, and low-stock alerts.
*   **Recipe Integration:** Automatic deduction of ingredients from inventory when menu items are sold.
*   **Role-Based Access Control (RBAC):** Distinct views and permissions for Managers, Chefs, Cashiers, and Waiters.
*   **Dashboard:** Real-time analytics on revenue, active orders, and inventory health.

### BACKEND (Node.js & Express)
*   **RESTful API:** Structured and scalable API endpoints.
*   **Prisma ORM:** Type-safe database interactions with MySQL.
*   **Authentication:** Secure JWT-based authentication system.
*   **Database:** Relational schema supporting complex relationships (Orders -> Items -> Recipes -> Inventory).

## 🛠️ Tech Stack

*   **Frontend:** Angular (Standalone Components, Signals), SCSS, Lucide Icons.
*   **Backend:** Node.js, Express, TypeScript.
*   **Database:** MySQL, Prisma ORM.
*   **Tools:** Git (Monorepo), npm.

## 📦 Project Structure

```bash
Bookify/
├── restaurant-backend/  # Node.js API
├── restaurant-frontend/ # Angular App
└── README.md            # You are here
```

## ⚡ Getting Started

### Prerequisites
*   Node.js (v18+)
*   MySQL Database

### 1. Setup Backend
```bash
cd restaurant-backend
npm install
# Configure .env with your DATABASE_URL
npx prisma migrate dev
npm run dev
```

### 2. Setup Frontend
```bash
cd restaurant-frontend
npm install
npm start
```

## 👥 Roles & Credentials (Demo)

*   **Manager:** Admin access to all modules.
*   **Chef:** Access to KDS and Inventory.
*   **Waiter/Cashier:** Access to POS and Tables.

---
Built by Carlos Gallegos.
