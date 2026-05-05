// src/modules/marketplace/pages/checkout.jsx
import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    deliveryMethod: "standard"
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = formData.deliveryMethod === "express" ? 8.90 : 4.90;
  const taxes = subtotal * 0.20;
  const total = subtotal + shippingCost + taxes;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully 🎉");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h1 style={styles.emptyTitle}>Checkout</h1>
        <p style={styles.emptyText}>Your cart is empty</p>
        <button onClick={() => window.location.href = "/marketplace"} style={styles.emptyButton}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Colonne gauche - Formulaire */}
        <div style={styles.formColumn}>
          <h1 style={styles.mainTitle}>Where shall we send your curation?</h1>
          
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Contact Information</h2>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Shipping Address</h2>
              <div style={styles.formGroup}>
                <div style={styles.row}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={styles.inputHalf}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={styles.inputHalf}
                    required
                  />
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
              
              <div style={styles.row}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={styles.inputHalf}
                  required
                />
                <input
                  type="text"
                  name="postcode"
                  placeholder="Postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  style={styles.inputHalf}
                  required
                />
              </div>
            </div>

            {/* Delivery Method */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Delivery Method</h2>
              <div style={styles.deliveryOptions}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="standard"
                    checked={formData.deliveryMethod === "standard"}
                    onChange={handleInputChange}
                    style={styles.radio}
                  />
                  <div style={styles.radioContent}>
                    <div>
                      <div style={styles.deliveryName}>Standard Sanctuary Delivery</div>
                      <div style={styles.deliveryNote}>3-5 business days</div>
                    </div>
                    <div style={styles.deliveryPrice}>£4.90</div>
                  </div>
                </label>
                
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="express"
                    checked={formData.deliveryMethod === "express"}
                    onChange={handleInputChange}
                    style={styles.radio}
                  />
                  <div style={styles.radioContent}>
                    <div>
                      <div style={styles.deliveryName}>Express Curated Shipping</div>
                      <div style={styles.deliveryNote}>Next business day</div>
                    </div>
                    <div style={styles.deliveryPrice}>£8.90</div>
                  </div>
                </label>
              </div>
            </div>

            <div style={styles.returnLink}>
              <a href="/cart" style={styles.returnLinkAnchor}>RETURN TO CART</a>
            </div>
          </form>
        </div>

        {/* Colonne droite - Résumé */}
        <div style={styles.summaryColumn}>
          <h2 style={styles.summaryTitle}>Your Curation</h2>
          
          <div style={styles.itemsList}>
            {cart.map((item, index) => (
              <div key={item.id} style={{...styles.cartItem, borderBottom: index === cart.length - 1 ? "none" : "1px solid #eee"}}>
                <div>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemMeta}>
                    {item.weight || "450G"} / {item.variant || "GLUTEN-FREE"}
                  </div>
                </div>
                <div style={styles.itemPrice}>£{(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div style={styles.priceBreakdown}>
            <div style={styles.priceRow}>
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.priceRow}>
              <span>Shipping</span>
              <span>£{shippingCost.toFixed(2)}</span>
            </div>
            <div style={styles.priceRow}>
              <span>Taxes</span>
              <span>£{taxes.toFixed(2)}</span>
            </div>
            <div style={styles.totalRow}>
              <span>TOTAL TO PAY</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>

          <button onClick={handleSubmit} style={styles.checkoutButton}>
            Secure Checkout
          </button>

          <div style={styles.secureNote}>
            <span>🔒</span> Encryption powered by Square Systems.
          </div>
          
          <div style={styles.returnLinkBottom}>
            <a href="/cart" style={styles.returnLinkAnchor}>RETURN TO CART</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tous les styles sont définis ici - DESIGN EXACT DE L'IMAGE
const styles = {
  page: {
    backgroundColor: "#f5f3ef",
    minHeight: "100vh",
    padding: "40px 80px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    gap: "60px",
    flexWrap: "wrap",
  },
  formColumn: {
    flex: 1,
    minWidth: "320px",
    backgroundColor: "transparent",
    padding: "0",
  },
  summaryColumn: {
    width: "340px",
    backgroundColor: "transparent",
    padding: "0",
    alignSelf: "flex-start",
  },
  mainTitle: {
    fontSize: "22px",
    fontWeight: "500",
    marginBottom: "32px",
    color: "#1a1a1a",
    letterSpacing: "-0.2px",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "18px",
    color: "#1a1a1a",
    letterSpacing: "0.3px",
  },
  summaryTitle: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "20px",
    color: "#1a1a1a",
    borderBottom: "1px solid #eee",
    paddingBottom: "12px",
  },
  section: {
    marginBottom: "32px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "500",
    marginBottom: "8px",
    color: "#666",
    letterSpacing: "0.3px",
  },
  input: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    outline: "none",
    fontFamily: "inherit",
  },
  inputHalf: {
    width: "100%",
    padding: "10px 0",
    border: "none",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    outline: "none",
    fontFamily: "inherit",
  },
  row: {
    display: "flex",
    gap: "20px",
  },
  deliveryOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "flex-start",
    cursor: "pointer",
  },
  radio: {
    width: "16px",
    height: "16px",
    marginRight: "14px",
    marginTop: "2px",
    cursor: "pointer",
    accentColor: "#000",
  },
  radioContent: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  deliveryName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: "4px",
  },
  deliveryNote: {
    fontSize: "12px",
    color: "#999",
  },
  deliveryPrice: {
    fontWeight: "500",
    color: "#1a1a1a",
    fontSize: "14px",
  },
  returnLink: {
    marginTop: "40px",
  },
  returnLinkBottom: {
    marginTop: "20px",
    textAlign: "center",
  },
  returnLinkAnchor: {
    color: "#999",
    textDecoration: "none",
    fontSize: "11px",
    letterSpacing: "0.5px",
  },
  itemsList: {
    marginBottom: "20px",
    borderBottom: "1px solid #eee",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
  },
  itemName: {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "4px",
    color: "#1a1a1a",
  },
  itemMeta: {
    fontSize: "10px",
    color: "#aaa",
    letterSpacing: "0.3px",
  },
  itemPrice: {
    fontSize: "14px",
    fontWeight: "500",
    marginLeft: "16px",
    color: "#1a1a1a",
  },
  priceBreakdown: {
    paddingTop: "8px",
    marginBottom: "24px",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#666",
    marginBottom: "10px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: "14px",
    paddingTop: "14px",
    borderTop: "1px solid #eee",
  },
  checkoutButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: "0",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "1px",
    cursor: "pointer",
    marginBottom: "12px",
    fontFamily: "inherit",
  },
  secureNote: {
    textAlign: "center",
    fontSize: "10px",
    color: "#aaa",
    letterSpacing: "0.3px",
  },
  emptyContainer: {
    padding: "60px 20px",
    textAlign: "center",
    backgroundColor: "#f5f3ef",
    minHeight: "100vh",
  },
  emptyTitle: {
    fontSize: "32px",
    marginBottom: "16px",
    color: "#333",
  },
  emptyText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "24px",
  },
  emptyButton: {
    padding: "12px 32px",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: "0",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "0.5px",
  },
};