import mongoose from "mongoose";
// Defines the structure of a single cart item
const cartItemSchema = new mongoose.Schema({
  // Reference to the user who owns this cart item
  userId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
    ref: "User",                          // References the "User" model
    required: true,                       // Mandatory field
  },
  // Title of the product added to the cart
  title: {
    type: String,
    required: true,
  },
  // URL or path to the cover image of the product
  coverImage: {
    type: String,
    required: true,
  },
  // Category of the product
  category: {
    type: String,
    required: true,
  },
  // Price of the product at the time it was added to the cart
  price: {
    type: Number,
    required: true,
  },
  // Number of units available in stock
  stock: {
    type: Number,
    required: true,
  },
  // Quantity of this product in the cart
  quantity: {
    type: Number,
    default: 1, // If not specified, default quantity is 1
  },
});

// Creating the "cart" collection model using the schema
const Cart = mongoose.model("cart", cartItemSchema);

export default Cart;
