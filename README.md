# 🛍️ ShoppyGlobe - Full Stack Shopping Cart Application

This is a full-stack e-commerce shopping cart application. The **frontend** is built using React, Redux, and Vite, while the **backend** is powered by Node.js, Express.js, and MongoDB Atlas.

---

## 🚀 Features

✅ Browse Products  
✅ Add to Cart  
✅ Remove from Cart  
✅ Update Quantity  
✅ Checkout Functionality  
✅ User Registration & Login (JWT Auth)  
✅ Protected Routes  
✅ MongoDB Atlas Integration  

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- React.js
- Vite
- React Router
- React Toastify
- CSS

### 🔧 Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- nodemon (Development Server)
- ThunderClient (API Testing)

---

## 📁 Project Structure

\`\`\`
📦 shoppyglobe
├── 📂 frontend
│   ├── 📂 src
│   │   ├── 📂 components
│   │   │   ├── Cart, CartItem, Checkout, Header, Home, NotFound, ProductDetails, ProductItem, ProductList, Login, Register 
│   │   ├── 📂 utils (useFetchProducts.js)
│   │   ├── App.jsx, main.jsx, index.css
│   ├── package.json
│   └── vite.config.js
├── 📂 backend
│   ├── 📂 routes (Shoppy.routes.js)
│   ├── 📂 models (Product.Model.js, Cart.Model.js, User.Model.js)
│   ├── 📂 controllers (Product.controller.js, Cart.controller.js, User.controller.js)
│   ├── server.js
│   └── .env
\`\`\`

---

## 🔌 MongoDB Atlas

This project uses **MongoDB Atlas** to store:
- Products
- Cart Items
- Registered Users

Collections:
- \`products\`: \{ title, coverImage, description, price, stock, rating, category, discountPercentage, brand, weight, dimensions, warrantyInformation, availabilityStatus, reviews \}
- \`cart\`: \{ userId, productId, title, coverImage, category, price, stock, quantity \}
- \`users\`: \{ email, password \}

---

## 🔐 API Routes

### Product Routes
- \`POST /product\` – Add products
- \`GET /products\` – Fetch all products
- \`GET /products/:id\` – Get product by ID

### Cart Routes (Protected)
- \`POST /cart\` – Add product to cart
- \`PUT /cart/:id\` – Update cart item quantity
- \`DELETE /cart/:id\` – Remove item from cart
- \`DELETE /cart\` – Remove all item from cart

### Auth Routes
- \`POST /register\` – Register user
- \`POST /login\` – Login user & return JWT

---

## 🚀 Running the Project

### 1️⃣ Clone the repo
\`\`\`bash
git clone https://github.com/hemanthkumar387/ShoppyGlobe.git
cd shoppyglobe
\`\`\`

### 2️⃣ Setup Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
# Visit: http://localhost:5173
\`\`\`

### 3️⃣ Setup Backend
\`\`\`bash
cd backend
npm install
npm start
# Backend runs on: http://localhost:5000
\`\`\`

---

## 🌐 Usage Instructions

🛒 **Add Product** – Click "Add to Cart"  
🔁 **Update Quantity** – Use increment/decrement buttons  
❌ **Remove Product** – Click "Remove"  
✅ **Checkout** – Click "Checkout"  
🔐 **Register/Login** – Access cart routes only when authenticated  

---

## 🧪 API Testing

All API routes were tested using **ThunderClient** (VS Code extension).  
Authentication headers were used for protected cart routes.

---

## 📌 Notes

- MongoDB Atlas is used as a cloud database.
- JWT-based authentication secures sensitive routes.
- Make sure both frontend and backend servers are running for full functionality.

---
