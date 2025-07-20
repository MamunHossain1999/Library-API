# Library Management API

A RESTful Library Management System API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🎯 Project Objective

Develop a robust backend API for managing books and borrowing operations in a library system, implementing:

- Proper schema validation
- Business logic enforcement (e.g., book availability check during borrowing)
- MongoDB aggregation pipeline for summaries
- Use of Mongoose static/instance methods and middleware
- Filtering, sorting, and pagination features

---

## 📚 Features

### Book Management
- Create, Read, Update, Delete (CRUD) operations for books
- Validation for mandatory fields and unique ISBN
- Filtering by genre, sorting, and result limiting
- Tracks book availability based on copies

### Borrow Management
- Borrow books with quantity checks against availability
- Automatically update book availability status when copies run out
- Records borrow details with due dates
- Aggregated summary of total borrowed quantities per book

### Technical Highlights
- **Express.js** with **TypeScript** for type safety and clean structure
- **MongoDB** with **Mongoose** ODM for schema validation and data modeling
- Usage of Mongoose middleware (`pre`, `post`) and static/instance methods
- Error handling with clear and consistent API responses
- Filtering, sorting, and pagination support for listing endpoints

---

agula use kora hoyese atate
npm install express mongoose bcryptjs jsonwebtoken cookie-parser cors dotenv zod
npm install --save-dev typescript ts-node-dev @types/express @types/node @types/cookie-parser @types/jsonwebtoken
