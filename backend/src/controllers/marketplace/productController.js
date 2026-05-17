import Product from "../../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      seller: req.user.role === "vendor" ? req.user._id : req.body.seller
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user._id,
      isActive: true
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { isActive: true };

    if (category && category !== "All Products") {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      req.user.role === "vendor" &&
      product.seller?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "You can only edit your own products" });
    }

    const allowedUpdates = [
      "name",
      "description",
      "price",
      "currency",
      "category",
      "image",
      "weight",
      "variant",
      "stock"
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      req.user.role === "vendor" &&
      product.seller?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "You can only delete your own products" });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
