# 🛒 E-Commerce Application

A full-stack eCommerce platform built with modern web technologies, enabling users to browse, search, and purchase products seamlessly.

---

## 🚀 Features

- **User Authentication**: Sign up, login, and profile management(not yet).
- **Product Management**: Add, edit, delete products or their status. (Admin only).
- **Shopping Cart**: Add products to the cart and proceed to checkout.
- **Payment Gateway Integration**: Secure payments with Stripe / ~~Razorpay~~ (razorpay is no longer supported as of their policy updates)
- **Order Management**: View and track order history.

---

## 🛠️ Tech Stack

### Frontend:
- ReactJs
- TailwindCSS, PostCSS
- ContextAPI

### Backend:
- NodeJs and ExpressJs
- MongoDB

---

## 📦 Installation
- Node installation is required [v20.11.1 stable] or minimum 16th version.
- Start by forking the project and then clone it using `npm clone https://github.com/V1sh4lC/eCommerce.git`
- Change current directory to `cd eCommerce`.
- Then `npm i` to install all the dependencies.

### Prerequisites:
- Node.js
- npm/yarn
- MongoDB Atlas/Shell

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-app.git
   cd ecommerce-app
   npm install
   ```
2. Set up env vars (for BE):
   ```bash
   PORT=5000
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-jwt-secret
   STRIPE_SECRET_KEY=your-stripe-key
   ```
3. Run the app
   ```bash
   npm run dev
   npm run srv - (dev server for backend)
   ```

---

## 🖼️ Screenshots:

### Homepage
<img src="https://i.imgur.com/5ywfT5k.jpeg" alt="homepage"/>
<hr />

### Product page
<img src="https://i.imgur.com/dph1U2M.jpeg" alt="products"/>
<hr />

### Cart
<img src="https://i.imgur.com/Cxx3qNp.jpeg" alt="cart"/>
<hr />

### Checkout page
<img src="https://i.imgur.com/pd2Y8q2.jpeg" alt="checkout"/>
<hr />

### Admin
<img src="https://i.imgur.com/OyUeWGX.jpeg" alt="checkout"/>
<hr />
<br />

## 🛡️ Security
- JWT-based authentication
- Data validation on both client and server sides

<br />

## 👤 Author
Vishal Chauhan : [GitHub Profile](https://github.com/V1sh4lC)

<br />

## 📧 Contact
Feel free to reach out for questions regarding projects or collaborations:

- Email: vishalmessi550@gmail.com
- Twitter: <a href="https://x.com/vishalc02447756" target="_blank">X</a>
