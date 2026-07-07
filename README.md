# 🍺 Brew Bliss

A full-stack React (MERN) project, with a fully built-out backend and frontend.

`React` `Scss` `React-Slick` `Node.js` `Express` `MongoDB` `JWT` `bcrypt`

---

Beer Shop is a MERN-stack e-commerce project bringing together a range of features — authentication/registration, protected passwords, response caching, multi-language (English/Georgian) and multi-currency (USD/GEL) support, and a fully responsive design.

## 📖 Table of Contents
- ✨ Features
- 🛠 Tech Stack
- 🚀 Getting Started
- 🔑 Test Users
- ⚙️ .env Configuration

## ✨ Features

### 🎨 Design & UI
The project is fully styled with **Scss**, and **React-Slick** carousels are used to showcase products/content.

### 🗄️ Database
The project's database is hosted on **MongoDB**.

### 🔐 Auth & Security
Registration/login logic is implemented with **JSON Web Tokens (JWT)**. Users are stored in a dedicated collection, with their passwords protected via **bcrypt**.

### ⚡ Performance
The project uses a **caching** strategy for efficient use of time, along with **App Scale** techniques to support a scalable, responsive structure.

### 📱 Responsiveness
The site is fully **mobile responsive**.

### 🌍 Localization & Currency
The site supports both **English and Georgian**, as well as **USD and GEL** currencies.

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React · Scss · React-Slick |
| Backend | Node.js · Express · MongoDB |
| Security | JWT · bcrypt |
| Performance | Caching · App Scale |

## 🔑 Test Users

| Email | Password |
|---|---|
| globjanidze78@gmail.com | Giorgi0712 |
| saba@gmail.com | Saba123 |

## ⚙️ .env Configuration

Create a `.env` file with the following variables:

```
CONNECTION_STRING=mongodb+srv://giorgi:giorgi0712@cluster0.gzgnuhp.mongodb.net/beerDB
JWT_SECRET_KEY=your_jwt_secret
JWT_RESET_PASS_SECRET_KEY=your_jwt_reset_secret
BCRYPT_PEPPER=your_bcrypt_pepper
MAIL_SENDER_EMAIL=brewbliss.provider@gmail.com
MAIL_SENDER_PASS=zupd bjxh xaaf wean
```

> ⚠️ Replace any missing values with your own secret keys/passwords.

## 🚀 Getting Started

**1 · Install dependencies**

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

**2 · Set up the .env file**

Create a `.env` file in the backend directory using the variables listed above.

**3 · Run the project**

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

---

Made with 🍺
