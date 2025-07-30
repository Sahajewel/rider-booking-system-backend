# 🚖 Ride Booking API

A role-based backend API system for booking rides — inspired by platforms like **Uber** and **Pathao** — built using **Node.js, Express.js, MongoDB, and Mongoose**.

This system handles **rider requests**, **driver assignments**, and **admin-level operations** with full authentication, authorization, ride status management, and proper validation.

---

## 🧑‍💻 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (access + refresh)
- **Validation:** Zod
- **Authorization:** Role-based middleware
- **Password Security:** bcrypt

---

## 📦 Features Overview

### 🔐 Authentication & Authorization
- Secure login & registration with **JWT**
- Role-based access control for:
  - `Admin`
  - `Rider`
  - `Driver`

---

### 👤 Rider Features
- Request a ride (with pickup & dropoff location)
- Cancel a ride (before acceptance)
- View ride history
- View single ride details

---

### 🚗 Driver Features
- Accept / Reject ride requests
- Update ride status through lifecycle:
  - **Accepted → Picked Up → In Transit → Completed**
- View earnings history
- Set online/offline availability

---

### 🛡️ Admin Features
- Approve/suspend drivers
- Block/unblock riders & drivers
- View all users, drivers, and ride logs
- Manage system integrity

---

### 📊 Ride Lifecycle Status
Handled using strict enums and timestamps:

- `REQUESTED` → `PENDING` → `ACCEPTED` → `PICKED_UP` → `IN_TRANSIT` → `COMPLETED` → `CANCELLED`

Timestamps:
- `requestedAt`, `acceptedAt`, `pickUpAt`, `inTransitAt`, `completedAt`, `cancelledAt`

---

## 🔐 Role-Based Routes

| Role | Endpoints |
|------|-----------|
| Rider | `/rides/request`, `/rides/my`, `/rides/:id`, `/rides/cancel/:id` |
| Driver | `/rides/pending`, `/rides/accept/:id`, `/rides/update-status/:id` |
| Admin | `/admin/drivers`, `/admin/approve-driver/:id`, `/admin/block-user/:id` |

---

## 🧪 Testing & Documentation

- All routes tested with **Postman**
- Includes headers for:
  - `Authorization: Bearer <token>`
- Response codes used:
  - `200` – Success  
  - `201` – Created  
  - `400` – Bad Request  
  - `403` – Forbidden  
  - `404` – Not Found  

---

## 🗃 Folder Structure

src/
├── modules/
│ ├── auth/
│ ├── user/
│ ├── rider/
│ ├── driver/
│ ├── ride/
├── middlewares/
├── utils/
├── config/
├── app.ts
├── server.ts



- Modular design for scalability
- Each module has:
  - `controller`, `service`, `model`, `validation`, `routes`

---

## 📜 Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ride-booking-api.git
   cd ride-booking-api
npm install

npm run dev
