import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../shared/components/layout/Header.jsx";
import Footer from "../../shared/components/layout/Footer.jsx";
import "../../../app/index.css";
import { getProductById } from "../services/marketplace.service";
import { useCart } from "../context/CartContext";


export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
  getProductById(id)
    .then((res) => setProduct(res.data))
    .catch((err) => console.error(err));
}, [id]);


  if (!product) {
    return <h2 style={{ padding: "40px" }}>Loading product...</h2>;
  }

  return (
    <div className="cs-app">
      <Header />

      <section className="cs-pdp">
        <div className="cs-pdp-img-wrap">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="cs-pdp-img"
            />
          ) : (
            <div className="cs-pdp-img" />
          )}
        </div>

        <div className="cs-pdp-info">
          <div className="cs-breadcrumb">
            THE BOUTIQUE /{" "}
            <span className="cs-orange">{product.category}</span>
          </div>

          <h1 className="cs-pdp-title">{product.name}</h1>

          <div className="cs-pdp-price">
            {product.price} {product.currency || "DT"}
          </div>

          <p className="cs-pdp-desc">{product.description}</p>

          <div className="cs-pdp-actions">
            <div className="cs-qty">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>

              <span>{qty}</span>

              <button onClick={() => setQty((prev) => prev + 1)}>
                +
              </button>
            </div>

            <button
                        className="cs-add-bag"
                        onClick={() => addToCart(product, qty)}
                      >
                        Add {qty} to Bag
                      </button>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}