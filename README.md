# 🍺 Brew Bliss

A full-stack MERN e-commerce experience for craft beer enthusiasts, featuring secure authentication, multilingual support, multi-currency pricing, and a responsive shopping experience.

**Live Demo**

`React` `SCSS` `Node.js` `Express` `MongoDB` `JWT` `bcrypt` `React Slick`

---

Brew Bliss is a full-stack MERN e-commerce application where users can browse a beer catalog, manage their cart and wishlist, create accounts, and shop through a modern responsive interface. The application includes secure authentication, caching, localization, currency switching, and an optimized backend architecture.

---

# 📖 Table of Contents

- ✨ Features
- 🛠 Tech Stack
- 📁 Project Structure
- 🚀 Getting Started
- 🔑 Test Users
- ⚙️ Environment Variables

---

# ✨ Features

## 🛍️ Shopping Experience

Browse beers through a responsive storefront with filtering, sorting, detailed product pages, shopping cart functionality, and wishlist support.

---

## 🔐 Authentication & Security

- User registration & login
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- Secure user sessions

---

## 🌍 Localization

The application supports:

- 🇺🇸 English
- 🇬🇪 Georgian

Users can also switch between:

- USD
- GEL

with automatic price updates throughout the application.

---

## ⚡ Performance

Performance optimizations include:

- API response caching
- Optimized rendering
- App Scale responsive sizing
- Responsive layouts across all screen sizes

---

## 📱 Responsive Design

Designed to work seamlessly on both Desktop and Mobile

## 🗄️ Database

MongoDB stores:

- Products
- Users
- User favorites
- Shopping cart data

---

# 🛠 Tech Stack

| Layer | Technologies |
|--------|--------------|
| **Frontend** | React · SCSS · React Slick |
| **Backend** | Node.js · Express |
| **Database** | MongoDB |
| **Authentication** | JWT · bcrypt |
| **Performance** | Response Caching · App Scale |

---

# 📁 Project Structure

```
brew-bliss/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
└── frontend/
    └── src/
        ├── api/
        ├── assets/
        ├── components/
        ├── context/
        ├── hooks/
        ├── language/
        ├── pages/
        ├── routes/
        └── styles/
```

---

# 🚀 Getting Started

## 1 · Clone the repository

```bash
git clone https://github.com/yourusername/brew-bliss.git

cd brew-bliss
```

---

## 2 · Configure Environment Variables

Create a `.env` file inside the `backend` directory and copy the contents from:

```
env.example
```

---

## 3 · Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 4 · Run Development Server

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

---

# 🔑 Test Users

| Email | Password |
|-------|----------|
| globjanidze78@gmail.com | Giorgi0712 |
| saba@gmail.com | Saba123 |

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder and copy all variables from:

```
env.example
```

---

Made by **Giorgi Lobjanidze**
