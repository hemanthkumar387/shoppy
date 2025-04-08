import Product from '../model/Product.model.js'

// Add a new product to the database
export function Products(req, res) {
  const {
    title,
    description,
    coverImage,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    weight,
    dimensions,
    warrantyInformation,
    availabilityStatus,
    reviews
  } = req.body;

  // Create a new Product document
  const newProduct = new Product({
    title,
    description,
    coverImage,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    weight,
    dimensions,
    warrantyInformation,
    availabilityStatus,
    reviews
  });

  // Save the product to MongoDB
  newProduct.save()
    .then(data => {
      if (!data) {
        return res.status(400).json({ message: "Something went wrong" });
      }
      res.send(data); // Send the saved product as a response
    })
    .catch(err =>
      res.status(500).json({
        message: "Failed to create the product. Please check the input data and try again.",
        error: err.message
      })
    );
}

// Fetch all products from the database
export function fetchProducts(req, res) {
  Product.find()
    .then(data => {
      if (!data) {
        return res.status(400).json({ message: "Something went wrong" });
      }

      res.send(data); // Send all product documents as response
    })
    .catch(err =>
      res.status(404).json({ message: "No data found", error: err.message })
    );
}

// Fetch a single product by its ID
export function fetchProductById(req, res) {
  const { id } = req.params; // Get product ID from URL parameters

  Product.findById(id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product); // Send the matched product document
    })
    .catch(err => {
      res.status(500).json({
        message: "Error fetching product by ID",
        error: err.message
      });
    });
}
