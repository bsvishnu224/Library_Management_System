#  Library Management System - Backend Assignment

## Project Overview

The Library Management System is a backend REST API that helps manage books, members, and borrowing activities in a library.

The system supports two roles:

###  Librarian

* Add books
* Update books
* Delete books
* View all members
* Delete members

###  Member

* Register and Login
* View books
* Borrow books
* Return books
* View borrowed books

---

##  Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt
* dotenv
* cors
* nodemon

---

##  Project Structure

```text
library-management-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── memberController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Borrow.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── memberRoutes.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

##  Installation Steps

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Library_Management_System.git
cd Library_Management_System
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the Project

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

##  Authentication Flow

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

After successful login, a JWT token is returned.

For protected routes:

```text
Authorization: Bearer YOUR_TOKEN
```

---

##  API Endpoints

### Authentication APIs

| Method | Endpoint           | Access |
| ------ | ------------------ | ------ |
| POST   | /api/auth/register | Public |
| POST   | /api/auth/login    | Public |

---

### Book APIs

| Method | Endpoint              | Access        |
| ------ | --------------------- | ------------- |
| POST   | /api/books            | Librarian     |
| GET    | /api/books            | Authenticated |
| GET    | /api/books/:id        | Authenticated |
| PUT    | /api/books/:id        | Librarian     |
| DELETE | /api/books/:id        | Librarian     |
| POST   | /api/books/:id/borrow | Member        |
| POST   | /api/books/:id/return | Member        |

---

### Member APIs

| Method | Endpoint              | Access    |
| ------ | --------------------- | --------- |
| GET    | /api/members          | Librarian |
| DELETE | /api/members/:id      | Librarian |
| GET    | /api/members/me/books | Member    |

---

##  Optional Features Implemented

### Pagination

```http
GET /api/books?page=1&limit=10
```

### Search Books

```http
GET /api/books?search=node
```

### Category Filter

```http
GET /api/books?category=Programming
```

---

##  API Testing

All APIs were tested using Postman.

---


---

##  Author

**Vishnu Vardhan Reddy**

Backend Developer | Node.js | Express.js | MongoDB

---

## ✅ Assignment Outcome

* Secure JWT Authentication
* Role-Based Access Control
* CRUD APIs for Books
* Member Management APIs
* Borrow and Return Functionality
* Database Integration
* API Documentation
* Deployed Backend Service
