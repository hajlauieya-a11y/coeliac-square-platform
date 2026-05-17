import express from "express";
import { products } from "../../../data/products.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { category } = req.query;

  if (category && category !== "All Products") {
    return res.json(products.filter(p => p.category === category));
  }

  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) return res.status(404).json({ message: "Not found" });

  res.json(product);
});
export default router

