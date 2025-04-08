import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CheckOut.css";

function Checkout() {
  const navigate = useNavigate();

  // State to hold user input from the form
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // State to hold form validation errors
  const [errors, setErrors] = useState({});
  // State to track whether the order was successfully placed
  const [orderPlaced, setOrderPlaced] = useState(false);
  // State to store total cart price
  const [totalPrice, setTotalPrice] = useState(0);

  // Utility function to check if token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() >= payload.exp * 1000;
    } catch (e) {
      return true; // If parsing fails, treat token as expired
    }
  };

  // Fetch total cart amount from backend
  const fetchTotalAmount = async () => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login if no or invalid token
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login"); // Redirect if unauthorized
        return;
      }

      const data = await res.json();
      const cartItems = Array.isArray(data) ? data : data.cart;

      if (Array.isArray(cartItems)) {
        // Calculate total price of all cart items
        const total = cartItems.reduce((sum, item) => {
          return sum + (item.price || 0) * (item.quantity || 1);
        }, 0);
        setTotalPrice(total);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Run once on component mount to fetch total price
  useEffect(() => {
    fetchTotalAmount();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation before placing order
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.match(/^\d{6}$/)) newErrors.pincode = "Enter a valid 6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Clear cart after successful order
  const clearCartBackend = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch("http://localhost:5000/api/cart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setOrderPlaced(true); // Show success message
      await clearCartBackend(); // Clear cart on backend
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      {/* If order is placed, show success message */}
      {orderPlaced ? (
        <div className="order-success">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Your order has been placed. Thank you for shopping with us!</p>
          <Link to="/">
            <button className="back-to-shopping-btn">Back to Shopping</button>
          </Link>
        </div>
      ) : (
        // Checkout form
        <div className="checkout-form">
          <h2>Delivery Address</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              {errors.fullName && <p className="form-error">{errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              {errors.phone && <p className="form-error">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required />
              {errors.address && <p className="form-error">{errors.address}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                {errors.city && <p className="form-error">{errors.city}</p>}
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                {errors.state && <p className="form-error">{errors.state}</p>}
              </div>
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
              {errors.pincode && <p className="form-error">{errors.pincode}</p>}
            </div>

            {/* Display order summary */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              <p>Total Amount: <strong>${totalPrice.toFixed(2)}</strong></p>
            </div>

            <button type="submit" className="place-order-btn">Place Order</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Checkout;
