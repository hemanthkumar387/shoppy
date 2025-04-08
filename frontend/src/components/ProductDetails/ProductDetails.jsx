import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ProductDetails.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const { id } = useParams(); // Get product ID from the route
  const [product, setProduct] = useState(null); // Store product details
  const [loading, setLoading] = useState(true); // Show loading indicator
  const [error, setError] = useState(null); // Handle errors
  const [buttonText, setButtonText] = useState("Add to Cart"); // Dynamic button label
  const navigate = useNavigate(); // To redirect user

  // Utility function to check if the JWT token has expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return Date.now() >= payload.exp * 1000; // Compare expiry with current time
    } catch (e) {
      return true;
    }
  };

  // Fetch product details when component mounts or when the ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data); // Set product data
      } catch (err) {
        setError(err.message); // Set error message if any
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProduct();
  }, [id]);

  // Handle adding product to the cart
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    // If no token or token is expired, redirect to login
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      toast.info("Please register or login to continue", { autoClose: 2000 });
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: product.title,
          coverImage: product.coverImage,
          category: product.category,
          price: product.price,
          stock: product.stock,
          quantity: 1,
        }),
      });

      // If session expired, redirect to login
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        toast.info("Session expired, please login again", { autoClose: 2000 });
        navigate("/login");
        return;
      }

      if (!response.ok) throw new Error("Failed to add to cart");

      // Show success toast and update button text temporarily
      toast.success(`${product.title} added to cart!`);
      setButtonText("Added ✅");
      setTimeout(() => setButtonText("Add to Cart"), 2000);
    } catch (err) {
      toast.error("Failed to add item to cart!");
      console.error(err.message);
    }
  };

  // Function to render star rating based on float rating value
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Whole stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Optional half star
    const emptyStars = 5 - (fullStars + halfStar); // Remaining empty stars
    return (
      <div className="star-rating">
        {"★".repeat(fullStars)}
        {halfStar ? "✩" : ""}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  // Show loading or error UI
  if (loading) return <h2 className="product-detail-loading">Loading...</h2>;
  if (error) return <h2 className="product-detail-error">Error: {error}</h2>;

  return (
    <div className="product-detail">
      {/* Product image */}
      <div className="product-image-container">
        <img
          src={product.coverImage}
          alt={product.title}
          className="product-detail-thumbnail"
        />
      </div>

      {/* Product information */}
      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.title}</h1>

        {/* Rating display */}
        <div className="product-rating">
          {renderStars(product.rating)}
          <span>({product.rating} / 5)</span>
        </div>

        {/* Price and details */}
        <p className="product-detail-price">${product.price}</p>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-category">Brand: {product.brand}</p>
        <p className="product-category">Weight: {product.weight}g</p>
        <p className="product-category">
          Dimensions: {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth} mm
        </p>
        <p className="product-category">Warranty: {product.warrantyInformation}</p>
        <p className="product-category">Availability: {product.availabilityStatus}</p>
        <p className="product-category">Stock: {product.stock}</p>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className={`add-to-cart-btn ${buttonText === "Added ✅" ? "added" : ""}`}
          disabled={product.stock === 0}
        >
          {buttonText}
        </button>

        {/* Customer Reviews section */}
        <div className="product-reviews">
          <h3>Customer Reviews:</h3>
          {product.reviews?.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p><strong>{review.reviewerName}</strong> ({review.rating} ★)</p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
