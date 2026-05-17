import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearBackendCart
} from "../services/marketplace.service";

const CartContext = createContext();

const normalizeCart = (backendCart) => {
  if (!backendCart?.items) return [];

  return backendCart.items.map((item) => ({
    ...item.product,
    qty: item.qty
  }));
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setCart([]);
    setCartLoading(false);
    return;
  }

  getCart()
    .then((res) => {
      setCart(normalizeCart(res.data));
      setCartLoading(false);
    })
    .catch((err) => {
      console.error("Error loading cart:", err);
      setCart([]);
      setCartLoading(false);
    });
}, []);


 const addToCart = async (product, qty = 1) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please sign in before adding items to your cart.");
    return;
  }

  const res = await addCartItem(product._id, qty);
  setCart(normalizeCart(res.data));
};


  const increaseQty = async (id) => {
    const item = cart.find((p) => p._id === id);
    if (!item) return;

    const res = await updateCartItem(id, item.qty + 1);
    setCart(normalizeCart(res.data));
  };

  const decreaseQty = async (id) => {
    const item = cart.find((p) => p._id === id);
    if (!item) return;

    if (item.qty <= 1) {
      const res = await removeCartItem(id);
      setCart(normalizeCart(res.data));
      return;
    }

    const res = await updateCartItem(id, item.qty - 1);
    setCart(normalizeCart(res.data));
  };

  const removeFromCart = async (id) => {
    const res = await removeCartItem(id);
    setCart(normalizeCart(res.data));
  };

  const clearCart = async () => {
    await clearBackendCart();
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLoading,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
