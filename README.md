# STudentJS

# 🎓 Student Record Management System API

A secure and scalable RESTful API for managing student records and admin users using Node.js, Express, and MongoDB.

---

## 📚 Overview

This API allows institutions to:

- Manage admin registration and login (with JWT authentication)
- Create, read, update, and delete student records
- Authenticate and protect routes with tokens
- Easily expand and customize for additional features

---

## 🚀 Features

- 🔐 **JWT-based Authentication**
- 🧂 **Password Hashing with bcrypt**
- ✅ **CRUD operations for Students**
- ✅ **CRUD operations for Admins**
- 🛡️ **Secure Route Protection**
- 📏 **Input Validation via Mongoose**
- 📁 **Modular Code Structure**

---

## 🧩 Folder Structure

student-api/
├── controllers/
│ └── authController.js
├── models/
│ ├── Admin.js
│ └── Student.js
├── routes/
│ └── authRoutes.js
├── middleware/
│ └── authMiddleware.js
├── .env
├── server.js
└── package.json



---

## 🔗 API Endpoints

### 👤 Admin Routes

| Method | Endpoint              | Description                 | Protected |
|--------|-----------------------|-----------------------------|-----------|
| POST   | `/api/admin/register` | Register new admin          | ❌        |
| POST   | `/api/admin/login`    | Login and get JWT token     | ❌        |
| GET    | `/api/admin`          | Get all admins              | ✅        |
| GET    | `/api/admin/:id`      | Get admin by ID             | ✅        |
| PUT    | `/api/admin/:id`      | Update admin by ID          | ✅        |
| DELETE | `/api/admin/:id`      | Delete admin by ID          | ✅        |

---

### 🎓 Student Routes

| Method | Endpoint              | Description                  | Protected |
|--------|-----------------------|------------------------------|-----------|
| POST   | `/api/student`        | Add a new student            | ✅        |
| GET    | `/api/student`        | Get all students             | ✅        |
| GET    | `/api/student/:id`    | Get student by ID            | ✅        |
| PUT    | `/api/student/:id`    | Update student by ID         | ✅        |
| DELETE | `/api/student/:id`    | Delete student by ID         | ✅        |

> ✅ Protected routes require a valid JWT token in the `Authorization` header:  
> `Authorization: Bearer <token>`

---

## 📦 Dependencies

| Package        | Purpose                            |
|----------------|------------------------------------|
| express        | Web framework                      |
| mongoose       | MongoDB object modeling            |
| bcryptjs       | Password hashing                   |
| jsonwebtoken   | JWT authentication                 |
| dotenv         | Environment variables              |
| nodemon        | Auto-restart for development       |

---

## 🔐 Environment Setup

Create a `.env` file in the root with the following:

```env
MONGO_URI=mongodb://localhost:27017/studentdb
JWT_SECRET=yourSecretKey
PORT=5000


POST /api/admin/register
{
  "username": "admin01",
  "email": "admin01@example.com",
  "password": "12345678"
}


POST /api/admin/login
{
  "username": "admin01",
  "password": "12345678"
}


POST /api/student
{
  "name": "John Doe",
  "age": 22,
  "email": "satobore@gmail.com",
  "course": "Computer Science"
  "password": "cholo12"
}


📬 Testing (Thunder Client / Postman)
First, register or login as an admin to get your JWT token.


Add the token to your request headers:

Authorization: Bearer <your_token>

Test any of the protected endpoints.

