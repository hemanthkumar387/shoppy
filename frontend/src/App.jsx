import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";

// Lazy loading components for better performance (code splitting)
const ProductDetail = lazy(() => import("./components/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Checkout = lazy(() => import("./components/CheckOut/CheckOut")); // Added Checkout Page
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/Register/Register"));

function App() {


  return (
    <Router> {/* Wrapping the app with Router to enable routing */}
      <Header /> {/* Common header component displayed on all pages */}
      <ToastContainer /> {/* Enables toast notifications throughout the app */}
      <Suspense fallback={<div>Loading...</div>}> {/* Shows fallback content while lazy-loaded components load */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} /> {/* Dynamic route for product details */}
          <Route path="/cart" element={<Cart />} /> {/* Shopping cart route */}
          <Route path="/checkout" element={<Checkout />} /> {/* Checkout page route */}
          <Route path="*" element={<NotFound />} /> {/* Handles any undefined routes (404 Not Found) */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
