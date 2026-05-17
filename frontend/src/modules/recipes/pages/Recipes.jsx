import React, { useEffect, useState } from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import RecipeCard from "../components/RecipeCard.jsx";
import "../index.css";
import { getFeaturedRecipe, getRecipes } from "../services/recipe.service";

const FILTERS = ["All Recipes", "Vegan", "Dairy-Free", "Nut-Free", "Under 30 Mins"];

export default function Recipes() {
  const [activeFilter, setActiveFilter] = useState("All Recipes");
  const [activePage, setActivePage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getRecipes({ filter: activeFilter, search })
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [activeFilter, search]);

  useEffect(() => {
    getFeaturedRecipe()
      .then((res) => setFeaturedRecipe(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="rc-page">
      <Header />

      <section className="rc-hero">
        <div
          className="rc-hero-img"
          style={
            featuredRecipe?.image
              ? {
                  backgroundImage: `url(${featuredRecipe.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        />

        <div className="rc-hero-content">
          <span className="rc-hero-eyebrow">RECIPE OF THE MONTH</span>

          <h1>{featuredRecipe?.title || "Recipe of the Month"}</h1>

          <p>
            {featuredRecipe?.description ||
              "Discover our featured gluten-free recipe."}
          </p>

          <div className="rc-hero-meta">
            <span>{featuredRecipe?.time || "25 min"}</span>
            <span>{featuredRecipe?.level || "Beginner"}</span>
          </div>

          <button className="rc-btn-primary">View Recipe</button>
        </div>
      </section>

      <section className="rc-filterbar">
        <div className="rc-search">
          <span>Search</span>
          <input
            type="text"
            placeholder="Search for recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rc-filters">
          <span className="rc-filters-label">Filters:</span>

          {FILTERS.map((f) => (
            <button
              key={f}
              className={`rc-filter ${activeFilter === f ? "active" : ""}`}
              onClick={() => {
                setActiveFilter(f);
                setActivePage(1);
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="rc-grid-section">
        {loading ? (
          <p>Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <div className="rc-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} {...recipe} />
            ))}
          </div>
        )}
      </section>

      <div className="rc-pagination">
        <button className="rc-page-btn">‹</button>

        {[1, 2, 3].map((p) => (
          <button
            key={p}
            className={`rc-page-btn ${activePage === p ? "active" : ""}`}
            onClick={() => setActivePage(p)}
          >
            {p}
          </button>
        ))}

        <button className="rc-page-btn">›</button>
      </div>

      <Footer />
    </div>
  );
}
