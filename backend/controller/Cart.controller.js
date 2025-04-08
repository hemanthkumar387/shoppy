import Cart from '../model/Cart.model.js';

// Add a product to the cart (or increase quantity if it already exists)
export async function addToCart(req, res) {
  const { title, coverImage, category, price, stock, quantity } = req.body;

  // Validate required fields
  if (!title || !coverImage || !category || !price || !stock) {
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!coverImage) missingFields.push("coverImage");
    if (!category) missingFields.push("category");
    if (!price) missingFields.push("price");
    if (!stock) missingFields.push("stock");
    return res.status(400).json({ message: "Fill all the required fields", missingFields });
  }

  try {
    // Check if the item already exists in the user's cart
    const existingItem = await Cart.findOne({
      userId: req.user.id,
      title,
    });

    // If item exists, increase its quantity
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      const updatedItem = await existingItem.save();
      return res.status(200).json({ message: "Item quantity updated", item: updatedItem });
    }

    // If item doesn't exist, create a new cart entry
    const newItem = new Cart({
      userId: req.user.id,
      title,
      coverImage,
      category,
      price,
      stock,
      quantity: quantity || 1,
    });

    const savedItem = await newItem.save();
    res.status(201).json({ message: "Item added to cart", item: savedItem });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
}

// Get all items in the current user's cart
export async function getCart(req, res) {
  try {
    const cartItems = await Cart.find({ userId: req.user.id });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  }
}

// Update the quantity of a specific cart item
export async function updateCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  // Validate quantity
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1." });
  }

  try {
    const updatedItem = await Cart.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    res.status(200).json({ message: "Cart item updated", item: updatedItem });
  } catch (error) {
    console.error("Error updating cart item:", error.message);
    res.status(500).json({ message: "Server error while updating cart item." });
  }
}

// Remove a specific item from the user's cart
export async function removeCartItem(req, res) {
  const { id } = req.params;

  try {
    const deletedItem = await Cart.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    res.status(200).json({ message: "Item removed from cart." });
  } catch (error) {
    console.error("Error deleting cart item:", error.message);
    res.status(500).json({ message: "Server error while deleting cart item." });
  }
}

// Clear all items from the current user's cart
export async function clearCart(req, res) {
  try {
    const userId = req.user.id;
    await Cart.deleteMany({ userId });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
}
