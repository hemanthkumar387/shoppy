// Importing controller functions for products, cart, and user-related operations
import { fetchProductById, fetchProducts, Products } from "../controller/Product.controller.js";
import { addToCart, getCart, updateCartItem, removeCartItem, clearCart } from "../controller/Cart.controller.js";
import { loginUser, User, authenticateUser } from "../controller/user.controller.js";

// Function to register all API routes
export function routes(app) {
    // Product Routes

    // Create a new product (Admin or internal use)
    app.post("/api/product", Products);

    // Fetch all products
    app.get("/api/products", fetchProducts);

    // Fetch product details by product ID
    app.get("/api/products/:id", fetchProductById);

    // Cart Routes (Authenticated)

    // Add a product to the user's cart
    app.post("/api/cart", authenticateUser, addToCart);

    // Get all items in the user's cart
    app.get("/api/cart", authenticateUser, getCart);

    // Update quantity or details of a cart item by its cart item ID
    app.put("/api/cart/:id", authenticateUser, updateCartItem);

    // Remove a specific item from the cart using its cart item ID
    app.delete("/api/cart/:id", authenticateUser, removeCartItem);

    // Clear the entire cart for the logged-in user
    app.delete("/api/cart", authenticateUser, clearCart);

    // User Authentication Routes

    // Register a new user
    app.post("/api/register", User);

    // Login an existing user
    app.post("/api/login", loginUser);
}
