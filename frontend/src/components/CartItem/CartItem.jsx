import "./CartItem.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Functional component to render each cart item
function CartItem({ item, fetchCartAgain }) {
  const navigate = useNavigate();

  // Helper function to check if the JWT token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() >= payload.exp * 1000;
    } catch (e) {
      return true; // If any error occurs, consider token expired
    }
  };

  // Retrieves the token from localStorage or redirects to register page if token is missing or expired
  const getTokenOrRedirect = () => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/register"); // Redirect to register page
      return null;
    }
    return token;
  };

  // Handles the quantity input change event
  const handleQuantityChange = async (e) => {
    const newQuantity = Number(e.target.value);
    const token = getTokenOrRedirect();
    if (!token) return;

    // Prevent quantity below 1
    if (newQuantity < 1) {
      toast.warn("Quantity must be at least 1", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    // Update quantity only if it is within available stock
    if (newQuantity <= item.stock) {
      try {
        const res = await fetch(`http://localhost:5000/api/cart/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });

        if (!res.ok) throw new Error("Failed to update quantity");

        fetchCartAgain(); // Refresh cart items
      } catch (err) {
        toast.error("Error updating quantity", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } else {
      // If requested quantity exceeds available stock
      toast.warn(`Only ${item.stock} items available in stock!`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  // Handles the removal of an item from the cart
  const handleRemoveItem = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/cart/${item._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove item");

      toast.error(`${item.title} removed from cart!`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      fetchCartAgain(); // Refresh cart items after deletion
    } catch (err) {
      toast.error("Error removing item", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // JSX to render each cart item
  return (
    <div className="cart-item">
      {/* Product Image */}
      <img className="cart-item-image" src={item.coverImage} alt={item.title} />

      {/* Product Details */}
      <div className="cart-item-details">
        {/* Title and Price */}
        <p className="cart-item-title">
          {item.title} - <span className="cart-item-price">${item.price.toFixed(2)}</span>
        </p>
        {/* Category */}
        <p className="cart-item-category">{item.category.toUpperCase()}</p>
        {/* Quantity Input */}
        <input
          className="cart-item-quantity"
          type="number"
          value={item.quantity}
          min="1"
          onChange={handleQuantityChange}
        />
      </div>
      <div className="cart-item-actions">
        {/* Remove Button */}
        <button className="cart-item-remove" onClick={handleRemoveItem}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
