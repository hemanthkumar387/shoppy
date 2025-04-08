import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa"; // FontAwesome icons
import "./Header.css"; // Styles for the header

function Header() {
  // State to hold the count of items in the cart
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate(); // For programmatic navigation

  // Utility function to check if the JWT token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode payload
      return Date.now() >= payload.exp * 1000; // Compare expiry with current time
    } catch (e) {
      return true; // If decoding fails, consider token invalid
    }
  };

  // Fetch the cart item count from backend
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");

    // If token is not present or expired, redirect to home page
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token"); // Clean up
      navigate("/"); // Redirect
      return;
    }

    try {
      // Make a GET request to fetch cart items
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send token in header
        },
      });

      // If token is invalid, remove and redirect to login
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();

      // Extract the cart array depending on API response format
      const cartItems = Array.isArray(data) ? data : data.cart;

      // Calculate total quantity of items in the cart
      if (Array.isArray(cartItems)) {
        const totalQty = cartItems.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );
        setCartCount(totalQty); // Update the cart count state
      }
    } catch (err) {
      console.error("Error fetching cart count:", err); // Log any errors
    }
  };

  // Call fetchCartCount when component mounts
  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <nav className="header-container">
      {/* Home Link with shopping bag icon */}
      <Link to="/" className="header-link text-link">
        <FaShoppingBag size={24} /> ShoppyGlobe
      </Link>

      {/* Cart Link with cart icon and dynamic badge */}
      <Link to="/cart" className="header-link text-link">
        <FaShoppingCart size={24} /> Cart
        {/* Show badge only if there are items in the cart */}
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>
    </nav>
  );
}

export default Header;
