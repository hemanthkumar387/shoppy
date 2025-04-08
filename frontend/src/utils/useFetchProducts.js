import { useState, useEffect } from "react";

// Custom hook to fetch product data
const useFetchProducts = () => {
  // State to store the fetched products
  const [products, setProducts] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors during fetching
  const [error, setError] = useState(null);

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Function to fetch product data from the API
    const fetchProducts = async () => {
      try {
        // Fetch data from the API
        const response = await fetch("http://localhost:5000/api/products",{
          method: "GET",
        });
        // Check if the response is not okay
        if (!response.ok) throw new Error("Failed to fetch products");
        // Convert response to JSON format
        const data = await response.json();
        // Update state with fetched products
        setProducts(data);
      } catch (err) {
        // Set error message if fetching fails
        setError(err.message);
      } finally {
        // Set loading to false after fetching completes
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once

  // Return fetched data, loading state, and error state
  return { products, loading, error };
};

export default useFetchProducts;
