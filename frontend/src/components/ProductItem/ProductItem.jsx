import { Link } from "react-router-dom";
import "./ProductItem.css";

// ProductItem Component - Displays individual product details
function ProductItem({ product }) {


  if (!product) return null;

  const { _id, title, price, coverImage } = product;
  
  return (
    <div className="product-item"> {/* Container for the product */}
      <img className="product-img" src={coverImage} alt={title} /> {/* Product image */}
      <h3 className="product-title">{title}</h3> {/* Product title */}
      <p className="product-price">₹{price}</p> {/* Product price */}
      <Link className="product-link" to={`/product/${_id}`}> {/* Link to the product details page */}
        View Details
      </Link>
    </div>
  );
}

export default ProductItem;
