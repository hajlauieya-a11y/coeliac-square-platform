import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import "../../../index.css";

const CATEGORIES = [
  "All Products",
  "SNACKS",
  "TREATS",
  "BREAKFAST",
  "PASTRIES"
];

export default function MarketplaceHome() {
  const [activeCat, setActiveCat] = useState("All Products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM BACKEND (FULLY DYNAMIC)
  useEffect(() => {
    setLoading(true);

    const url =
      activeCat === "All Products"
        ? "http://localhost:5000/api/products"
        : `http://localhost:5000/api/products?category=${activeCat}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, [activeCat]);

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading products...</h2>;
  }

  return (
    <div className="cs-app">
      <Header />

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-content">
          <div className="cs-hero-eyebrow">THE BOUTIQUE</div>
          <h1 className="cs-hero-title">Curated Artisanal Gluten-Free</h1>
          <p className="cs-hero-text">
            Experience a hand-selected collection of the world's finest
            boutique ingredients.
          </p>
          <button className="cs-btn-primary">Explore Arrivals</button>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <div className="cs-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cs-cat-pill ${activeCat === cat ? "active" : ""}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <section className="cs-section">
        <h2 className="cs-section-title" style={{ marginBottom: 24 }}>
          Artisan Collection
        </h2>

        <div className="cs-products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}