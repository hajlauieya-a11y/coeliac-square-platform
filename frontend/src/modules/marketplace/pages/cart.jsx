import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./cart.css";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <div className="cart-shell">
        <div className="cart-header">
          <h1 className="cart-title">Your Cart</h1>
          <span className="cart-count">
            {cart.length} item{cart.length === 1 ? "" : "s"}
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Link to="/marketplace" className="cart-empty-link">
              <button className="cart-btn cart-btn-primary">Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item._id} className="cart-row">
                  <div>
                    <h3 className="cart-product-name">{item.name}</h3>
                    <p className="cart-product-meta">
                      {item.price} DT x {item.qty}
                    </p>
                  </div>

                  <div className="cart-qty">
                    <button onClick={() => decreaseQty(item._id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>

                  <button
                    className="cart-remove"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <div className="cart-total-label">Total</div>
                <div className="cart-total">{total.toFixed(2)} DT</div>
              </div>

              <div className="cart-actions">
                <button className="cart-btn cart-btn-secondary" onClick={clearCart}>
                  Clear Cart
                </button>

                <Link to="/checkout" className="cart-checkout-link">
                  <button className="cart-btn cart-btn-primary">Checkout</button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
