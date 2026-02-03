# Book Shop App

A modern Book Shop / Online Book Store application that allows users to browse books, view details, add books to cart, and place orders. The app focuses on a clean UI, smooth user experience, and scalable architecture.
Built with React frontend, Express/Node backend, MongoDB database.

---

## Demo Link

[Live Demo](https://book-shop-app-sable.vercel.app/)

---

## Quick Start

```
git clone https://github.com/PrafulC7/book_shop_app.git
cd <book_shop_app>
npm install
npm run dev

```

---

## Technologies

- React JS
- React Router
- Node JS
- Express
- MongoDB

---

## Demo Video
Watch a walkthrough (5-7 minutes) of all the major features of this app:
[Loom Video](https://www.loom.com/share/d6dacc5039f7430e9a65a2495bcf32d4)

---

## Features

### 📖 Book Management
- Display a list of available books
- View detailed information for each book
- Search books by title or author
- Filter books by category

### 🛒 Cart & Orders
- Add books to the cart
- Update book quantities in the cart
- Remove books from the cart
- Place orders successfully
- Clear cart after order placement

### 👤 User Experience
- Display responsive UI across devices
- Show loading indicators during API calls
- Handle errors gracefully with messages
- Maintain clean and intuitive navigation

---

## ⚙️ Environment Setup

This project uses environment variables for configuration.

### 📄 Create a `.env` file in the root directory
```
env
PORT=3000
MONGO_URI=mongodb+srv://neoGStudent:neoGStudentBD@neog.acigu1h.mongodb.net/?retryWrites=true&w=majority&appName=neoG
```
---
## API Reference
### **GET /api/categories**<br>
List All Categories<br>
Sample Response:<br>
```
[{_id, category, imageUrl,...},{_id,category,...}...]
```
### **GET /api/categories/:id**<br>
Category books<br>
Sample Response:<br>
```
[{_id, title, category, imgUrl, rating, price, description...},{_id,title,...}...]
```
### **GET /api/books**<br>
List all books<br>
Sample Response:<br>
```
[{_id, title, category, imgUrl, rating, price, description...},{_id,title,...}...]
```
### **GET /api/books/:id**<br>
Book Details<br>
Sample Response:<br>
```
[{_id, title, category, imgUrl, rating, price, description...}]
```
### **GET /api/wishlist**<br>
Wishlist<br>
Sample Response:<br>
```
[{_id, title, category, imgUrl, rating, price, description...},{_id,title,...}...]
```
### **GET /api/cart**<br>
Cart<br>
Sample Response:<br>
```
[{_id, title, category, imgUrl, rating, price, description...},{_id,title,...}...]
```
### **GET /api/orders**<br>
Orders List<br>
Sample Response:<br>
```
[{_id,[{title, category,...},{title,...},...],[{},{},...],...}...]
```

## Contact
For bugs or feature request, please reach out to prafullacharde00715@gmail.com
