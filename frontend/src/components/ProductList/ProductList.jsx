import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";

// ProductList component that receives an array of products as a prop
function ProductList({ products = [] }) {
  // Categorizing products based on their category type
  const categories = {
    Beauty: products.filter((product) =>
      Array.isArray(product.category)
        ? product.category.some(cat => cat.toLowerCase() === "beauty")
        : product.category?.toLowerCase() === "beauty"
    ),
    Fragrances: products.filter((product) =>
      Array.isArray(product.category)
        ? product.category.some(cat => cat.toLowerCase() === "fragrances")
        : product.category?.toLowerCase() === "fragrances"
    ),
    Furniture: products.filter((product) =>
      Array.isArray(product.category)
        ? product.category.some(cat => cat.toLowerCase() === "furniture")
        : product.category?.toLowerCase() === "furniture"
    ),
    Groceries: products.filter((product) =>
      Array.isArray(product.category)
        ? product.category.some(cat => cat.toLowerCase() === "groceries")
        : product.category?.toLowerCase() === "groceries"
    ),
  };

  return (
    <div className="product-list"> {/* Main container for the product list */}
      {Object.entries(categories).map(([category, items]) => ( // Loop through the categories object
        <div key={category} className="category-section"> {/* Container for each category */}
          <h2 className="category-title">{category}</h2> {/* Display category name */}
          <div className="product-scroll">  {/* Container for scrolling products in each category */}
            {items.length > 0 ? (
              // If there are products in the category, display them using the ProductItem component
              items.map((product) => <ProductItem key={product._id} product={product || []} />)
            ) : (
              // If no products are available, display a message
              <p>No products available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
