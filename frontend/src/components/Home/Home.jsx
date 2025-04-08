import { useState } from "react";
import useFetchProducts from "../../utils/useFetchProducts";
import ProductList from "../ProductList/ProductList";
import "./Home.css";

function Home() {
  // Fetch products using the custom hook
  const { products, loading, error } = useFetchProducts();
  // State for storing the search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Show loading message while data is being fetched
  if (loading) return <h2 className="loading">Loading...</h2>;
  // Show error message if fetching fails
  if (error) return <h2 className="error">Error: {error}</h2>;

  // Filter products based on the search term
  const filteredProducts = (products || []).filter((product) => 
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Scrolling text container to display product names */}
      <div className="scrolling-text-container">
        <div className="scrolling-text">
          {filteredProducts.map((product) => (
            <span key={product._id} className="scrolling-item">
              {product.title} {/* Display each product title */}
            </span>
          ))}
        </div>
      </div>

      {/* Search input field to filter products */}
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}  // Update state on input change
        className="search-bar"
      />
      
      {/* Display filtered products in the ProductList component */}
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default Home;