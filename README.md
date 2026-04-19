# E-Commerce Inventory Management System

This project is a simple RESTful API for managing products in an inventory system. 

---

## 🚀 Features

* CRUD operations for products
* SQLite database with raw SQL queries
* JWT-based authentication
* Input validation
* Unit tests using Jest and Supertest

---

## 🧱 Tech Stack

* Node.js
* Express.js
* SQLite
* JSON Web Token (JWT)
* Jest & Supertest
* React (frontend - basic setup)

---

## 📦 Project Structure

```
E_Commerce_Inventory_Management_System/ 
│ 
├── backend/ 
│ ├── controllers/ 
│ ├── routes/ 
│ ├── middleware/ 
│ ├── database/ 
│ │ ├── db.js 
│ │ └── product.sql 
│ ├── test/ 
│ ├── app.js 
│ ├── server.js 
│ └── package.json 
│
├── frontend/ 
│ ├── public/ 
│ ├── src/ 
│ └── package.json 
│ 
├── .gitignore 
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/LucasEduardo08/E_Commerce_Inventory_Management_System.git
cd E_Commerce_Inventory_Management_System
```

---

### 2. Install dependencies

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the root:

```
JWT_SECRET=your_secret_key
ADMIN_USER=your_admin_name
ADMIN_PASS=your_password_name

```

---

### 4. Run the server

backend:
```bash
npx nodemon backend/server.js
```

---

## 🔐 Authentication

To access protected routes, you must first obtain a token.

### Generate Token

```http
POST /auth
```

Body:

```json
{
  "username": "your_admin_name",
  "password": "your_password_name"
}
```

Response:

```json
{
  "token": "your_jwt_token"
}
```

---

### Use Token

Include in request headers:

```
Authorization: Bearer your_jwt_token
```

---

## 📡 API Endpoints

### Products

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /api/products     | Get all products     |
| GET    | /api/products/:id | Get product by ID    |
| POST   | /api/products     | Create a new product |
| PUT    | /api/products/:id | Update a product     |
| DELETE | /api/products/:id | Delete a product     |

---

## 📄 Product Model

```
{
  id: integer (auto-generated),
  name: string,
  description: string,
  price: number (> 0),
  stock_quantity: integer (>= 0)
}
```

---

## 🧪 Running Tests

```bash
npm test
```

Tests cover:

* Authentication
* CRUD operations
* Protected routes

---

## ⚠️ Notes

* The authentication system is simplified for demonstration purposes.
* SQLite database is initialized automatically on server start.
* Implementing endpoint testing was difficult because I hadn't done it before in a JavaScript project, but I learned how.

---

## 👨‍💻 Author

Developed by Lucas Teles
