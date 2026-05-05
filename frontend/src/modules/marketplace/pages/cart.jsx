import React from "react";
import { useCart } from "../../../context/CartContext";import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "15px 0",
              }}
            >
              {/* PRODUCT INFO */}
              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: "5px 0" }}>
                  {item.price} DT × {item.qty}
                </p>
              </div>

              {/* QTY CONTROLS */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              {/* REMOVE */}
              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <hr style={{ margin: "20px 0" }} />

          {/* TOTAL */}
          <h2>Total: {total.toFixed(2)} DT</h2>

          {/* ACTIONS */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button onClick={clearCart}>
              Clear Cart
            </button>

            <Link to="/checkout">
              <button style={{ background: "black", color: "white" }}>
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}