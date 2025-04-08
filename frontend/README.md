cat <<EOL > README.md
# 🛒 ShoppyGlobe Backend

Backend for the **ShoppyGlobe** e-commerce app built with **Node.js**, **Express**, and **MongoDB** in **MVC structure** with JWT Authentication.

---

## 📂 Folder Structure
```
📦 shoppyglobe-backend
├── 📂 controllers
│   ├── authController.js
│   ├── cartController.js
│   └── productController.js
├── 📂 models
│   ├── cartModel.js
│   ├── productModel.js
│   └── userModel.js
├── 📂 routes
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   └── productRoutes.js
├── 📂 middleware
│   └── authMiddleware.js
├── 📂 utils
│   └── connectMongo.js
├── server.js
├── .env
├── package.json
└── README.md
```

---

## 🚀 How to Run

1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-username/shoppyglobe-backend.git
cd shoppyglobe-backend
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Set environment variables**
Create a `.env` file:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4️⃣ **Run the server**
```bash
npm run dev
```
Server will run on: [http://localhost:5000](http://localhost:5000)

---

## 🛠️ Technologies Used
- Node.js (ES Modules)
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- dotenv, bcryptjs, express-validator

---

## 📦 API Endpoints

### 🔐 Auth Routes
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and get JWT

### 📦 Product Routes
- `GET /api/products` – Get all products
- `GET /api/products/:id` – Get product by ID

### 🛒 Cart Routes *(Protected)*
- `POST /api/cart` – Add product to cart
- `PUT /api/cart/:id` – Update quantity of product in cart
- `DELETE /api/cart/:id` – Remove product from cart

---

## ⚠️ Error Handling & Validation
- Input validation using `express-validator`
- 404 & 500 level error responses
- Token validation for protected routes

---

## 🔐 Authentication
- Users register & login to receive JWT
- JWT sent in headers for protected requests

---

## 📸 MongoDB Screenshots
Include screenshots of:
- Product collection with sample data
- Cart collection with user-product mappings

---

## 🙌 Contributions
Contributions welcome!
```bash
git checkout -b feature-name
git commit -m "Added feature"
git push origin feature-name
```
Then create a **Pull Request**

---

## 📃 License
MIT
EOL
