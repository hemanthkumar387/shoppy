import mongoose from "mongoose";

// Define the user schema structure
const userSchema = new mongoose.Schema({
  // Email field: required and must be unique
  email: {
    type: String,
    required: true,     // Email is mandatory
    unique: true,       // No two users can have the same email
  },

  // Password field: required
  password: {
    type: String,
    required: true,     // Password is mandatory
  },
});

// Create the User model from the schema
const userModel = mongoose.model("User", userSchema);

// Export the model to be used in controllers/routes
export default userModel;
