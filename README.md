# Bookify - Restaurant Management System 🍽️

Bookify is a comprehensive, full-stack web application designed to digitize and streamline restaurant operations. It features a robust Monorepo architecture integrating a powerful Node.js backend with a sleek, responsive Angular frontend.

Current Deployment: [Live Demo](https://bookify-restaurant-system.onrender.com) (Frontend managed elsewhere)

## 🚀 Key Features

### 🌟 Core Modules
*   **Reservations System:** 
    *   **Smart Availability:** Real-time checking of table availability based on date, time, and party size.
    *   **Management:** complete CRUD with an intuitive modal interface for editing and cancelling bookings.
    *   **Visual Status:** Clear indicators for confirmed, completed, and cancelled reservations.
*   **Table Management:** 
    *   Visual representation of restaurant floor.
    *   Status tracking (Available, Occupied, Reserved).
*   **Kitchen Display System (KDS):** Real-time order visualization for kitchen staff with high-contrast UI and "Late Order" alerts.
*   **Point of Sale (POS):** Efficient order taking interface for waiters.

### 💻 Frontend (Angular 18+)
*   **Modern UI/UX:** Built with a custom design system using SCSS, featuring glassmorphism effects, smooth transitions, and a consistent color palette.
*   **Refined Components:**
    *   **Modals:** Reusable, animated modal system for forms and confirmations.
    *   **Icons:** Integrated Lucide Icons for a clean, professional look.
    *   **Interactive Header:** Profile dropdown and quick actions.
*   **Role-Based Access Control (RBAC):** Distinct views/permissions for Managers, Waiters, and Chefs.

### 🔙 Backend (Node.js & Express)
*   **Architecture:** RESTful API with distinct layers (Controllers, Services, Routes).
*   **Database:** MySQL relational database managed via Prisma ORM.
*   **Security:** JWT-based authentication and secure password hashing.
*   **Scalability:** Modular structure allowing easy addition of new features.

## 🛠️ Tech Stack

*   **Frontend:** Angular (Standalone Components, Signals), SCSS, Lucide Icons.
*   **Backend:** Node.js, Express, TypeScript.
*   **data Access:** Prisma ORM, MySQL.
*   **DevOps:** Monorepo structure, deployed on Render.

## 📦 Project Structure

```bash
Bookify/
├── restaurant-backend/  # Node.js Express API
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   └── routes/      # Endpoint definitions
│   └── prisma/          # Database schema
│
└── restaurant-frontend/ # Angular Application
    ├── src/app/
    │   ├── core/        # Singleton services (Auth, API)
    │   ├── features/    # Feature modules (Auth, Admin, Orders)
    │   └── shared/      # Reusable components (Modal, etc.)
```

## ⚡ Getting Started

### Prerequisites
*   Node.js (v18+)
*   MySQL Database (Local or Remote)

### 1. Setup Backend
```bash
cd restaurant-backend
npm install
# Configure .env with your DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npm run dev
```

### 2. Setup Frontend
```bash
cd restaurant-frontend
npm install
# Configure environment.ts
ng serve
```

## 👥 Roles & Credentials (Demo)

*   **Manager:** Admin access to all modules (Tables, Reservations, Employees).
*   **Waiter:** Access to Order creation and Table views.
*   **Kitchen:** Access to Active Orders view.

---
<div align="center">
  Made with ❤️ by <strong>Carlos Gallegos</strong>
  <br>
  <a href="https://github.com/carlosstgg">
    <img src="https://img.shields.io/badge/GitHub-Profile-black?style=flat-square&logo=github" alt="GitHub">
  </a>
</div>
