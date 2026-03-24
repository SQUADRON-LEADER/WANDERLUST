<img width="269" height="58" alt="image" src="https://github.com/user-attachments/assets/32405a02-4f29-44d7-9fa2-84295fb2e60f" />

# 🌍 Wanderlust

A full-stack travel listing and booking web application built using modern web technologies. Wanderlust allows users to explore destinations, create listings, and experience seamless travel planning with authentication, RESTful APIs, and dynamic UI rendering.

---

## 🚀 Overview

Wanderlust is a feature-rich platform inspired by real-world travel apps. It enables users to browse destinations, create their own listings, and interact with the system through a robust backend built on RESTful architecture.

The project follows MVC architecture and integrates authentication, authorization, and database management.

---

## 🧠 Key Features

* 🔐 User Authentication & Authorization (Login / Register)
* 🏡 Create, Edit, Delete Listings
* 🖼️ Image Upload Support
* 📍 Location-based Listings
* 💬 Reviews & Ratings System
* ⚡ RESTful API Design
* 🎨 EJS Templating for dynamic UI
* 🧾 Flash messages & validations

---

## 🏗️ Tech Stack

### 🌐 Frontend

* HTML5
* CSS3
* Bootstrap
* EJS (Embedded JavaScript Templates)

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB
* Mongoose ODM

### 🔐 Authentication

* Passport.js
* Express-session

---

## 📁 Project Structure

```
WANDERLUST/
│── models/          # Mongoose schemas
│── routes/          # Express routes
│── controllers/     # Business logic
│── views/           # EJS templates
│── public/          # Static files (CSS, JS)
│── utils/           # Helper functions
│── app.js           # Entry point
│── package.json     # Dependencies
```

---

## 🔌 RESTful API Design

Wanderlust follows REST principles:

| Method | Route         | Description        |
| ------ | ------------- | ------------------ |
| GET    | /listings     | Get all listings   |
| GET    | /listings/:id | Get single listing |
| POST   | /listings     | Create new listing |
| PUT    | /listings/:id | Update listing     |
| DELETE | /listings/:id | Delete listing     |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/SQUADRON-LEADER/WANDERLUST.git
cd WANDERLUST
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection
SESSION_SECRET=your_secret
```

### 4️⃣ Run the application

```
npm start
```

---

## 📸 Screenshots

> Add your screenshots here

* Home Page
* Listings Page
* Create Listing
* Login/Register

---

## ⚙️ Future Enhancements

* 🌐 Deployment on cloud (Render / AWS)
* 📱 Mobile responsive improvements
* 🔎 Advanced search & filters
* 💳 Payment integration

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**, one of the most permissive and widely used open-source licenses. It allows anyone to use, modify, distribute, and even sell this software, provided that proper credit is given to the original author.

---

### 📜 MIT License (Full Text)

```
MIT License

Copyright (c) 2026 SQUADRON-LEADER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```



---

## 💡 Author

Developed with ❤️ by SQUADRON-LEADER

---

## ⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
