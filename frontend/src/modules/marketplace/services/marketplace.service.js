import API from "../../api";

export const getProducts = (category) => {
  const params = category && category !== "All Products" ? { category } : {};
  return API.get("/marketplace/products", { params });
};

export const getProductById = (id) => {
  return API.get(`/marketplace/products/${id}`);
};

export const createProduct = (productData) => {
  return API.post("/marketplace/products", productData);
};

export const getVendorProducts = () => {
  return API.get("/marketplace/vendor/products");
};

export const updateProduct = (id, productData) => {
  return API.patch(`/marketplace/products/${id}`, productData);
};

export const deleteProduct = (id) => {
  return API.delete(`/marketplace/products/${id}`);
};

export const getVendorOrders = () => {
  return API.get("/marketplace/vendor/orders");
};

export const updateVendorOrderItemStatus = (orderId, itemId, status) => {
  return API.patch(`/marketplace/vendor/orders/${orderId}/items/${itemId}/status`, {
    status
  });
};
export const getCart = () => {
  return API.get("/marketplace/cart");
};

export const addCartItem = (productId, qty = 1) => {
  return API.post("/marketplace/cart/items", { productId, qty });
};

export const updateCartItem = (productId, qty) => {
  return API.patch(`/marketplace/cart/items/${productId}`, { qty });
};

export const removeCartItem = (productId) => {
  return API.delete(`/marketplace/cart/items/${productId}`);
};

export const clearBackendCart = () => {
  return API.delete("/marketplace/cart");
};

export const createOrder = (orderData) => {
  return API.post("/marketplace/orders", orderData);
};

export const getMyOrders = () => {
  return API.get("/marketplace/orders/me");
};
