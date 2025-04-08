import mongoose from "mongoose";
// A sub-schema to define the structure of each review
const reviewSchema = new mongoose.Schema({
  rating: Number,             // Rating given by the user
  comment: String,            // Review comment text
  reviewerName: String,       // Name of the reviewer
  reviewerEmail: String       // Email of the reviewer
});

const productSchema = new mongoose.Schema({
  // Product title/name
  title: {
    type: String,
    required: true,           // Title is mandatory
  },
  // Description of the product
  description: {
    type: String,
    required: true,
  },
  // Image URL or path for the product cover
  coverImage: {
    type: String,
    required: true,
  },
  // Product category 
  category: {
    type: String,
    required: true,
  },
  // Product price
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: Number, // Optional discount percentage (e.g., 10%)
  rating: Number, // Average rating of the product (e.g., 4.2)
  // Number of items in stock
  stock: {
    type: Number,
    required: true,
  },
  brand: String, // Brand name of the product
  weight: Number, // Weight of the product (in grams, kg, etc.)
  // Dimensions of the product
  dimensions: {
    width: Number,            // Width of the product
    height: Number,           // Height of the product
    depth: Number             // Depth of the product
  },
  warrantyInformation: String, // Warranty information (e.g., "1 year warranty")
  availabilityStatus: String, // Status like "In Stock", "Out of Stock", "Preorder"
  reviews: [reviewSchema]  // Array of reviews for the product
});

// Create a Mongoose model named "products" using the schema above
const Product = mongoose.model("products", productSchema);

export default Product;
