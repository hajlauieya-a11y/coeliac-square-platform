import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";

const getVendorSectionStatus = (items) => {
  if (items.some((item) => item.vendorStatus === "refused")) {
    return "refused";
  }

  if (items.length > 0 && items.every((item) => item.vendorStatus === "confirmed")) {
    return "confirmed";
  }

  return "pending";
};

export const createOrder = async (req, res) => {
  try {
    const { contact, shippingAddress, deliveryMethod } = req.body;

    if (!contact || !shippingAddress) {
      return res.status(400).json({ message: "Missing checkout information" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    for (const item of cart.items) {
      if (!item.product || !item.product.isActive) {
        return res.status(400).json({ message: "One product in your cart is no longer available" });
      }

      if (item.qty > item.product.stock) {
        return res.status(400).json({
          message: `${item.product.name} only has ${item.product.stock} item(s) left`
        });
      }
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      seller: item.product.seller,
      name: item.product.name,
      price: item.product.price,
      qty: item.qty,
      image: item.product.image
    }));

    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const shippingCost = deliveryMethod === "express" ? 8.9 : 4.9;
    const taxes = subtotal * 0.2;
    const total = subtotal + shippingCost + taxes;

    const order = await Order.create({
      user: req.user._id,
      contact,
      shippingAddress,
      deliveryMethod,
      items: orderItems,
      subtotal,
      shippingCost,
      taxes,
      total
    });

    for (const item of cart.items) {
      item.product.stock -= item.qty;
      await item.product.save();
    }

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();

    const formattedOrders = orders.map((order) => {
      const sellerGroups = {};

      order.items.forEach((item) => {
        const sellerKey = item.seller?.toString() || "unknown";

        if (!sellerGroups[sellerKey]) {
          sellerGroups[sellerKey] = [];
        }

        sellerGroups[sellerKey].push(item);
      });

      const vendorSections = Object.entries(sellerGroups).map(([seller, items]) => ({
        seller,
        status: getVendorSectionStatus(items),
        items
      }));

      return {
        ...order,
        vendorSections
      };
    });

    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "items.seller": req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    const vendorOrders = orders.map((order) => {
      const items = order.items.filter(
        (item) => item.seller?.toString() === req.user._id.toString()
      );

      const vendorSubtotal = items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      return {
        ...order,
        items,
        vendorSubtotal,
        vendorSectionStatus: getVendorSectionStatus(items)
      };
    });

    res.json(vendorOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVendorOrderItemStatus = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "refused"].includes(status)) {
      return res.status(400).json({ message: "Invalid vendor order status" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const item = order.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: "Order item not found" });
    }

    if (item.seller?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own order items" });
    }

    item.vendorStatus = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
