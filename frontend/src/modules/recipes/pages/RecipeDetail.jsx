import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import RecipeCard from "../components/RecipeCard";
import { getRecipeById, getRecipes } from "../services/recipe.service";
import "../index.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [moreRecipes, setMoreRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getRecipeById(id)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    getRecipes()
      .then((res) => {
        setMoreRecipes(res.data.slice(0, 3));
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading recipe...</h2>;
  }

  if (!recipe) {
    return <h2 style={{ padding: "40px" }}>Recipe not found.</h2>;
  }

  return (
    <div className="rc-page">
      <Header />

      <section className="rd-hero">
        <div
          className="rd-hero-img"
          style={
            recipe.image
              ? {
                  backgroundImage: `url(${recipe.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        />

        <div className="rd-hero-overlay">
          <span className="rd-hero-tag">{recipe.category}</span>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </div>
      </section>

      <section className="rd-stats">
        <div className="rd-stat">
          <div className="rd-stat-label">PREP TIME</div>
          <div className="rd-stat-value">{recipe.time}</div>
        </div>

        <div className="rd-stat">
          <div className="rd-stat-label">DIFFICULTY</div>
          <div className="rd-stat-value">{recipe.level}</div>
        </div>

        <div className="rd-stat">
          <div className="rd-stat-label">SERVINGS</div>
          <div className="rd-stat-value">{recipe.servings || "N/A"}</div>
        </div>

        <div className="rd-stat">
          <div className="rd-stat-label">PROFILE</div>
          <div className="rd-stat-value">{recipe.profile}</div>
        </div>
      </section>

      <section className="rd-content">
        <aside className="rd-sidebar">
          <div className="rd-essentials">
            <h3>The Essentials</h3>

            <ul>
              {recipe.ingredients?.map((ingredient) => (
                <li key={ingredient.name}>
                  <span>{ingredient.name}</span>
                  <span className="rd-qty">{ingredient.qty}</span>
                </li>
              ))}
            </ul>

            {recipe.tip && (
              <div className="rd-tip">
                {recipe.tip}
              </div>
            )}
          </div>

          <div
            className="rd-side-img"
            style={
              recipe.image
                ? {
                    backgroundImage: `url(${recipe.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          />
        </aside>

        <div className="rd-process">
          <h2>The Process</h2>

          <p className="rd-process-intro">
            Follow each step carefully for the best gluten-free result.
          </p>

          {recipe.steps?.map((step, index) => (
            <div key={`${step.title}-${index}`} className="rd-step">
              <div className="rd-step-num">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="rd-step-body">
                <h4>{step.title}</h4>
                <p>{step.text}</p>

                {step.image && (
                  <div
                    className="rd-step-img"
                    style={{
                      backgroundImage: `url(${step.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rd-more">
        <div className="rd-more-head">
          <div>
            <span className="rd-more-eyebrow">FURTHER EXPLORATION</span>
            <h2>More from the Library</h2>
          </div>

          <a href="/recette" className="rd-more-link">
            View All Library
          </a>
        </div>

        <div className="rd-more-grid">
          {moreRecipes
            .filter((item) => item._id !== recipe._id)
            .slice(0, 3)
            .map((item) => (
              <RecipeCard key={item._id} {...item} />
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
