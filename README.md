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


---

## 🔐 Authentication Routes

| Method | Endpoint        | Description               |
|--------|-----------------|---------------------------|
| POST   | `/auth/register`| Register as Rider or Driver |
| POST   | `/auth/login`   | Login and get access token |

---

## 👤 User Routes

| Method | Endpoint        | Description               |
|--------|-----------------|---------------------------|
| GET    | `/users/profile`| View own profile (Protected) |

---

## 🚴 Rider Routes

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | `/rider/request`    | Request a new ride              |
| GET    | `/rider/my-rides`   | View ride history               |

---

## 🚕 Driver Routes

| Method | Endpoint                    | Description                                |
|--------|-----------------------------|--------------------------------------------|
| GET    | `/driver/available-rides`   | View available ride requests               |
| PATCH  | `/driver/accept/:rideId`    | Accept a ride                              |
| PATCH  | `/driver/status/:rideId`    | Update ride status (Picked/In Transit/etc) |
| GET    | `/driver/my-rides`          | View own ride history                      |

---

## 🛠️ Admin Routes

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/admin/drivers`             | View all registered drivers          |
| PATCH  | `/admin/approve/:driverId`   | Approve a driver                     |
| PATCH  | `/admin/block/:userId`       | Block a user                         |
| PATCH  | `/admin/unblock/:userId`     | Unblock a user                       |

---

## 🔐 Protected Routes

All routes (except registration and login) are protected using JWT tokens. Role-based guards ensure only specific roles can access their own routes.

---

## ⚙️ Environment Variables

Make sure to configure `.env`:


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


