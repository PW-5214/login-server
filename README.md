# Login Server

## Description

`Login Server` is a **Node.js web application** that provides user **signup** and **login** functionality using **MongoDB** as the database. It includes:

- User registration with input validation (name, email, password, date of birth)
- Password hashing using `bcrypt`
- User login with authentication
- HTML login form for web-based authentication
- Deployment-ready for platforms like **Render.com**

This project is ideal for learning **Node.js**, **Express**, **MongoDB**, **API design**, and **frontend integration**.

---

## Features

1. **Signup API** (`POST /user/signup`)

   - Validates input fields
   - Hashes password before storing
   - Prevents duplicate email registration

2. **Login API** (`POST /user/signin`)

   - Authenticates user using email and password
   - Responds with a welcome message

3. **HTML Login Form** (`GET /login`)

   - Simple frontend form for user login
   - Submits data to `/user/signin`

4. **MongoDB Integration**

   - Users stored in MongoDB collection
   - Configured via environment variable `MONGODB_URI`

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/YOUR_USERNAME/login_server.git
cd login_server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the server:

```bash
nodemon server.js
```

5. Open browser:

```
http://localhost:3000/login
```

---

## Technologies Used

- Node.js
- Express.js
- MongoDB / Mongoose
- bcrypt (password hashing)
- Handlebars (hbs) for HTML rendering
- Render.com for deployment

---

## Project Structure

```
login_server/
│
├─ api/
│   └─ User.js          # Routes for signup and signin
├─ config/
│   └─ db.js            # MongoDB connection
├─ models/
│   └─ User.js          # User schema
├─ views/
│   ├─ login.hbs        # Login HTML form
│   └─ signup.hbs       # Optional signup form
├─ server.js            # Main server file
├─ package.json
└─ .env
```

---

## API Endpoints

1. **Signup**

```
POST /user/signup
Body (JSON):
{
  "name": "PRATHMESH",
  "email": "prathmesh12@gmail.com",
  "password": "Password@123",
  "dateofbirth": "2005-01-01"
}
```

2. **Signin**

```
POST /user/signin
Body (form-data or JSON):
{
  "email": "prathmesh12@gmail.com",
  "password": "Password@123"
}
```

---

## Notes

- Passwords are **securely hashed** using bcrypt.
- Make sure to **encode special characters** in your MongoDB URI.
- Works via **Postman** and **HTML login form**.

