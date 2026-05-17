import express from "express";
import { allowRoles, protect } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  getVendorProducts,
  updateProduct
} from "../controllers/marketplace/productController.js";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../controllers/marketplace/cartController.js";
import {
  createOrder,
  getVendorOrders,
  getMyOrders,
  getOrderById,
  updateVendorOrderItemStatus
} from "../controllers/marketplace/orderController.js";

const router = express.Router();

router.post("/products", protect, allowRoles("vendor", "admin"), createProduct);

router.get("/products", getProducts);
router.get("/vendor/products", protect, allowRoles("vendor"), getVendorProducts);
router.get("/vendor/orders", protect, allowRoles("vendor"), getVendorOrders);
router.patch(
  "/vendor/orders/:orderId/items/:itemId/status",
  protect,
  allowRoles("vendor"),
  updateVendorOrderItemStatus
);
router.get("/products/:id", getProductById);
router.patch("/products/:id", protect, allowRoles("vendor", "admin"), updateProduct);
router.delete("/products/:id", protect, allowRoles("vendor", "admin"), deleteProduct);

router.get("/cart", protect, getCart);
router.post("/cart/items", protect, addCartItem);
router.patch("/cart/items/:productId", protect, updateCartItem);
router.delete("/cart/items/:productId", protect, removeCartItem);
router.delete("/cart", protect, clearCart);

router.post("/orders", protect, createOrder);
router.get("/orders/me", protect, getMyOrders);
router.get("/orders/:id", protect, getOrderById);

export default router;
