import express from 'express';
import mongoose from 'mongoose';
import { routes } from './routes/Shoppy.routes.js';
import cors from 'cors';

// Create Express app
const app = new express();
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Middleware to handle Cross-Origin Resource Sharing
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb+srv://hemanthkumar1:Hemanth7873@hemanth.xrqb1.mongodb.net/");

const db = mongoose.connection;

// Logger middleware to log every request's method, URL, and status code
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});

// Event handler when the database connection is successfully established
db.on('open', () => {
  console.log('Database is Connected Successfully');
});

// Event handler for when the database connection is closed or failed
db.on('close', () => {
  console.log("Database Connection is Failed");
});

// Register application routes
routes(app);
