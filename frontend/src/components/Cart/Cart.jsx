import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../CartItem/CartItem"; // Component to display individual cart items
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const navigate = useNavigate(); // Hook for navigation

  // Helper function to check if the JWT token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return Date.now() >= payload.exp * 1000; // Check if current time >= token expiry
    } catch (e) {
      console.warn("Error decoding token", e);
      return true; // If error decoding, assume token is invalid
    }
  };

  // Function to fetch cart items from the backend
  const fetchCartAgain = async () => {
    const token = localStorage.getItem("token");

    // Redirect to login if token is missing or expired
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send token for auth
        },
      });

      // If unauthorized, clear token and redirect
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();

      // If backend explicitly says token is invalid
      if (data.message === "Token is not valid or expired") {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      // Safely update cart items if valid data received
      if (Array.isArray(data)) {
        setCartItems(data);
      } else if (Array.isArray(data.cart)) {
        setCartItems(data.cart);
      } else {
        setCartItems([]); // fallback: empty cart
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setCartItems([]); // fallback on error
    }
  };

  // Fetch cart items when component loads
  useEffect(() => {
    fetchCartAgain();
  }, []);

  // Calculate total quantity of items
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  // Calculate total price of items
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.quantity * item.price || 0),
    0
  );

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      {/* If cart is empty */}
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <div className="cart-content">
          {/* List of cart items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                fetchCartAgain={fetchCartAgain} // Pass refresh function to child
              />
            ))}
          </div>

          {/* Summary section */}
          <div className="cart-summary">
            <h3 className="cart-summary-title">Order Summary</h3>
            <p className="cart-total-items">
              Total Items: <strong>{totalQuantity}</strong>
            </p>
            <p className="cart-total-price">
              Total Price: <strong>${totalPrice.toFixed(2)}</strong>
            </p>
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Back to shopping button */}
      <Link to="/">
        <button className="back-to-shopping-btn">Back to Shopping</button>
      </Link>
    </div>
  );
}

export default Cart;
