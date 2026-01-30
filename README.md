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

Browse available books
View book details (title, author, price, description)
Add / remove books from cart
Update book quantity in cart
Order summary and checkout flow
Responsive design (mobile & desktop)

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
Ordres List<br>
Sample Response:<br>
```
[{_id,[{title, category,...},{title,...},...],[{},{},...],...}...]
```

## Contact
For bugs or feature request, please reach out to prafullacharde00715@gmail.com
