import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./checkout.css";
import { createOrder } from "../services/marketplace.service";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    deliveryMethod: "standard",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = formData.deliveryMethod === "express" ? 8.9 : 4.9;
  const taxes = subtotal * 0.2;
  const total = subtotal + shippingCost + taxes;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await createOrder({
      contact: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode
      },
      deliveryMethod: formData.deliveryMethod
    });

    alert("Order placed successfully");
    clearCart();
  } catch (error) {
    alert(error.response?.data?.message || "Could not place order");
  }
};


  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Checkout</h1>
        <p>Your cart is empty</p>
        <button onClick={() => window.location.href = "/marketplace"}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h1 className="checkout-title">Where shall we send your curation?</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Contact Information</h2>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Shipping Address</h2>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="postcode"
                    placeholder="Postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Delivery Method</h2>
              <div className="delivery-options">
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="standard"
                    checked={formData.deliveryMethod === "standard"}
                    onChange={handleInputChange}
                  />
                  <div className="delivery-option-content">
                    <div className="delivery-text">
                      <strong>Standard Sanctuary Delivery</strong>
                      <span className="delivery-note">3-5 business days</span>
                    </div>
                    <div className="delivery-price">4.90 DT</div>
                  </div>
                </label>

                <label className="delivery-option">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="express"
                    checked={formData.deliveryMethod === "express"}
                    onChange={handleInputChange}
                  />
                  <div className="delivery-option-content">
                    <div className="delivery-text">
                      <strong>Express Curated Shipping</strong>
                      <span className="delivery-note">Next business day</span>
                    </div>
                    <div className="delivery-price">8.90 DT</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="return-link">
              <a href="/cart">RETURN TO CART</a>
            </div>
          </form>
        </div>

        <div className="checkout-summary-section">
          <h2 className="summary-title">Your Curation</h2>

          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={item._id || index} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">
                    {item.weight || "450G"} / {item.variant || "GLUTEN-FREE"}
                  </div>
                </div>
                <div className="cart-item-price">
                  {(item.price * item.qty).toFixed(2)} DT
                </div>
              </div>
            ))}
          </div>

          <div className="price-details">
            <div className="price-row">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} DT</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span>{shippingCost.toFixed(2)} DT</span>
            </div>
            <div className="price-row">
              <span>Taxes</span>
              <span>{taxes.toFixed(2)} DT</span>
            </div>
            <div className="price-row total">
              <span>TOTAL TO PAY</span>
              <span>{total.toFixed(2)} DT</span>
            </div>
          </div>

          <button onClick={handleSubmit} className="checkout-btn">
            Secure Checkout
          </button>

          <div className="secure-note">Encryption powered by Square Systems.</div>

          <div className="return-link return-link-bottom">
            <a href="/cart">RETURN TO CART</a>
          </div>
        </div>
      </div>
    </div>
  );
}
