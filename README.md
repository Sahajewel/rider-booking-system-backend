# 🚖 Ride Booking API

A role-based backend API system for booking rides — inspired by platforms like **Uber** and **Pathao** — built using **Typescript, Node.js, Express.js, MongoDB, and Mongoose**.

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
### 📘 Role-Based Access Control (RBAC)
This system follows strict role-based access across all routes to ensure that actions are performed by authorized users only.



| Endpoint                             | Rider 👤 | Driver 🚗 | Admin 🛡️ | Description                   |
| ------------------------------------ | :------: | :-------: | :-------: | ----------------------------- |
| **`POST /auth/register`**            |     ✅    |     ✅     |     ✅     | Register as user              |
| **`POST /auth/login`**               |     ✅    |     ✅     |     ✅     | Login with credentials        |
| **`POST /auth/logout`**              |     ✅    |     ✅     |     ✅     | Logout from session           |
| **`POST /auth/change-password`**     |     ✅    |     ✅     |     ✅     | Change current password       |
| **`GET /user/me`**                   |     ✅    |     ✅     |     ✅     | View own profile              |
| **`PUT /user/:id`**                  |     ✅    |     ✅     |     ✅     | Update own profile            |
| **`GET /user/`**                     |     ❌    |     ❌     |     ✅     | View all users                |
| **`GET /user/:id`**                  |     ❌    |     ❌     |     ✅     | View single user              |
| **`DELETE /user/:id`**               |     ❌    |     ❌     |     ✅     | Delete a user                 |
| **`PATCH /user/block/:id`**          |     ❌    |     ❌     |     ✅     | Block user                    |
| **`PATCH /user/unblock/:id`**        |     ❌    |     ❌     |     ✅     | Unblock user                  |
| **`PATCH /user/approve-driver/:id`** |     ❌    |     ❌     |     ✅     | Approve driver                |
| **`PATCH /user/suspend-driver/:id`** |     ❌    |     ❌     |     ✅     | Suspend driver                |
| **`POST /ride/request`**             |     ✅    |     ❌     |     ❌     | Request a new ride            |
| **`PATCH /ride/cancel/:id`**         |     ✅    |     ❌     |     ❌     | Cancel ride (if not accepted) |
| **`GET /ride/my-rides`**             |     ✅    |     ❌     |     ❌     | Rider’s ride history          |
| **`GET /ride/:id`**                  |     ✅    |     ❌     |     ❌     | View single ride              |
| **`PATCH /ride/accept/:id`**         |     ❌    |     ✅     |     ❌     | Accept a ride                 |
| **`PATCH /ride/reject/:id`**         |     ❌    |     ✅     |     ❌     | Reject a ride                 |
| **`PATCH /ride/:id/status`**         |     ❌    |     ✅     |     ❌     | Update ride status            |
| **`GET /driver/earnings`**           |     ❌    |     ✅     |     ❌     | View earnings summary         |
| **`PATCH /driver/availability`**     |     ❌    |     ✅     |     ❌     | Toggle online/offline         |
| **`POST /driver`**                   |     ❌    |     ❌     |     ✅     | Create driver (admin only)    |
| **`GET /driver`**                    |     ❌    |     ❌     |     ✅     | View all drivers              |
| **`GET /driver/:id`**                |     ❌    |     ❌     |     ✅     | View driver profile           |
| **`PUT /driver/:id`**                |     ❌    |     ❌     |     ✅     | Update driver                 |
| **`DELETE /driver/:id`**             |     ❌    |     ❌     |     ✅     | Delete driver                 |
| **`POST /rider`**                    |     ❌    |     ❌     |     ✅     | Create rider                  |
| **`GET /rider`**                     |     ❌    |     ❌     |     ✅     | View all riders               |
| **`GET /rider/:id`**                 |     ❌    |     ❌     |     ✅     | View rider                    |
| **`PUT /rider/:id`**                 |     ❌    |     ❌     |     ✅     | Update rider                  |
| **`DELETE /rider/:id`**              |     ❌    |     ❌     |     ✅     | Delete rider                  |
| **`GET /rider/my-rides`**            |     ✅    |     ❌     |     ❌     | Rider’s ride list             |

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



