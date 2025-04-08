// User.controller.js
import jwt from "jsonwebtoken"; // importing jwt
import userModel from "../model/User.model.js";

// Secret key for JWT signing and verification
const JWT_SECRET = "secretkey";

// User Registration
export async function User(req, res) {
  const { email, password } = req.body;

  try {
    // Check if user already exists with the given email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    // Create new user
    const newUser = new userModel({ email, password });
    const savedUser = await newUser.save();
    // Generate JWT token with 15 min expiration
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    // Send response with user info and token
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
      },
    });
  } catch (err) {
    // Handle registration errors
    res.status(500).json({ message: err.message });
  }
}

// User Login
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const existingUser = await userModel.findOne({ email });
    // Check if user exists and password matches
    if (!existingUser || existingUser.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate JWT token with 15 min expiration
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    // Send response with user info and token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
      },
    });
  } catch (error) {
    // Handle login errors
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  // Check if Authorization header is present and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  // Extract token from Bearer <token>
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach user info to request for further use
    req.user = decoded;
    next(); // Proceed to next middleware/controller
  } catch (err) {
    // If token is invalid or expired
    return res.status(403).json({ message: "Token is not valid or expired" });
  }
}
