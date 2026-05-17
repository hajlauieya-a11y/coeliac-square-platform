import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({
  _id,
  category,
  name,
  description,
  price,
  currency = "DT",
  boxOf,
  image,
}) {
  const { addToCart } = useCart();

  const product = {
    _id,
    category,
    name,
    description,
    price,
    currency,
    boxOf,
    image,
  };

  return (
    <div className="cs-product-card">

      {/* Clickable area (go to product page) */}
      <Link
        to={`/product/${_id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {image ? (
          <img src={image} alt={name} className="cs-product-img" />
        ) : (
          <div className="cs-product-img" />
        )}

        <div className="cs-product-cat">{category}</div>
        <div className="cs-product-name">{name}</div>
        <div className="cs-product-desc">{description}</div>

        <div className="cs-product-price">
          {price} {currency}
          {boxOf && <small> / box of {boxOf}</small>}
        </div>
      </Link>

      {/* CART BUTTON (outside Link to avoid navigation bug) */}
      <button
        className="cs-add-cart-btn"
        onClick={() => addToCart(product)}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          cursor: "pointer",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}