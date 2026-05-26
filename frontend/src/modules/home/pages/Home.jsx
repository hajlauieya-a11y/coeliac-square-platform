import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import { getProducts } from "../../marketplace/services/marketplace.service";
import { getFeaturedRecipe, getRecipes } from "../../recipes/services/recipe.service";
import { getWorkshops } from "../../workshop/services/workshop.service";
import "../index.css";

const SERVICES = [
  {
    title: "Produits sans gluten",
    desc: "Decouvrez les derniers produits ajoutes par les vendeurs de la plateforme.",
    cta: "Voir la boutique",
    path: "/marketplace",
  },
  {
    title: "Recettes sans gluten",
    desc: "Retrouvez les recettes publiees par l'equipe pour cuisiner plus sereinement.",
    cta: "Voir les recettes",
    path: "/recette",
  },
  {
    title: "Ateliers et formations",
    desc: "Participez aux workshops ajoutes par les formateurs autour du sans gluten.",
    cta: "Voir les workshops",
    path: "/workshop",
  },
];

const FAQS = [
  {
    q: "Comment savoir si vous souffrez de la maladie coeliaque ?",
    a: "La maladie coeliaque se diagnostique avec un avis medical, une analyse de sang specifique et parfois une biopsie. Consultez un professionnel si les symptomes persistent.",
  },
  {
    q: "Pourquoi demander un diagnostic avant de manger sans gluten ?",
    a: "Arreter le gluten avant les tests peut fausser les resultats. Un diagnostic clair aide a adapter le suivi nutritionnel.",
  },
  {
    q: "Ou trouver les contenus des experts ?",
    a: "La page Maladie affiche les articles, videos et conseils publies par les experts confirmes.",
  },
];

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const bgImage = (url) =>
  url
    ? {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getProducts(),
      getRecipes(),
      getFeaturedRecipe(),
      getWorkshops(),
    ]).then(([productsRes, recipesRes, featuredRes, workshopsRes]) => {
      if (productsRes.status === "fulfilled") {
        setProducts(productsRes.value.data || []);
      }

      if (recipesRes.status === "fulfilled") {
        setRecipes(recipesRes.value.data || []);
      }

      if (featuredRes.status === "fulfilled") {
        setFeaturedRecipe(featuredRes.value.data || null);
      }

      if (workshopsRes.status === "fulfilled") {
        setWorkshops(workshopsRes.value.data || []);
      }

      setLoading(false);
    });
  }, []);

  const mainProduct = products[0];
  const sideProducts = products.slice(1, 3);
  const mainRecipe = useMemo(
    () => featuredRecipe || recipes[0] || null,
    [featuredRecipe, recipes]
  );
  const sideRecipe = recipes.find((recipe) => recipe._id !== mainRecipe?._id) || recipes[1];
  const mainWorkshop = workshops[0];
  const workshopPreview = workshops.slice(0, 2);

  return (
    <div className="cs-app">
      <Header />

      <section className="hp-hero">
        <div className="hp-hero-left">
          <div className="hp-eyebrow">BIENVENUE</div>
          <h1 className="hp-hero-title">
            Votre <br />
            espace pour <br />
            une <span className="hp-accent">vie sans</span> <br />
            <span className="hp-accent">gluten.</span>
          </h1>
          <p className="hp-hero-text">
            Produits, recettes, workshops et contenu educatif se rejoignent ici pour accompagner la vie quotidienne avec la maladie coeliaque.
          </p>
          <div className="hp-hero-actions">
            <button className="cs-btn-primary" onClick={() => navigate("/marketplace")}>
              Decouvrir nos produits
            </button>
            <button className="hp-btn-ghost" onClick={() => navigate("/maladie")}>
              Comprendre la maladie
            </button>
          </div>
        </div>
        <div className="hp-hero-right">
          <div className="hp-hero-img" style={bgImage(mainProduct?.image || mainRecipe?.image || mainWorkshop?.image)} />
          <div className="hp-hero-quote">
            <div className="hp-quote-author">
              <div className="hp-quote-avatar" />
              <strong>Coeliac Square</strong>
            </div>
            <p>Des contenus mis a jour directement depuis les espaces admin, vendeur, formateur et expert.</p>
          </div>
        </div>
      </section>

      <section className="hp-services">
        <h2 className="hp-services-title">Que vous propose ce site web ?</h2>
        <div className="hp-services-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="hp-service-card">
              <div className="hp-service-avatar" />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <button className="hp-service-link" onClick={() => navigate(s.path)}>
                {s.cta} →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="hp-disease">
        <div className="hp-disease-img" />
        <div className="hp-disease-info">
          <h2>Comprendre la maladie coeliaque</h2>
          <p>
            Retrouvez dans la page Maladie les informations educatives publiees par vos experts confirmes, avec articles, videos et conseils nutritionnels.
          </p>
          <p>
            Le contenu de la plateforme evolue automatiquement avec ce qui est ajoute dans les dashboards.
          </p>
          <button className="cs-btn-primary" onClick={() => navigate("/maladie")}>
            En savoir plus
          </button>
        </div>
      </section>

      <section className="hp-boutique">
        <div className="hp-section-head">
          <div>
            <h2>Derniers produits</h2>
            <p>Produits ajoutes par les vendeurs confirmes.</p>
          </div>
          <button className="cs-view-all" onClick={() => navigate("/marketplace")}>
            Voir plus →
          </button>
        </div>

        {loading ? (
          <p className="hp-empty-state">Chargement des produits...</p>
        ) : !mainProduct ? (
          <p className="hp-empty-state">Aucun produit disponible pour le moment.</p>
        ) : (
          <div className="hp-boutique-grid">
            <div className="hp-boutique-feature">
              <div className="hp-boutique-feature-img" style={bgImage(mainProduct.image)} />
              <div className="hp-boutique-feature-info">
                <h3>{mainProduct.name}</h3>
                <p>{mainProduct.description}</p>
                <button className="cs-btn-primary" onClick={() => navigate(`/product/${mainProduct._id}`)}>
                  Acheter
                </button>
              </div>
            </div>

            <div className="hp-boutique-side">
              {sideProducts.map((product) => (
                <button
                  key={product._id}
                  className="hp-boutique-card"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="hp-boutique-card-img" style={bgImage(product.image)} />
                  <div className="hp-boutique-card-info">
                    <h4>{product.name}</h4>
                    <p>{product.category}</p>
                    <strong>{product.price} {product.currency || "DT"}</strong>
                  </div>
                </button>
              ))}

              <div className="hp-boutique-promo">
                <div>
                  <h4>{products.length} produit{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}</h4>
                  <p>Explorez la boutique sans gluten.</p>
                </div>
                <button className="cs-btn-primary" onClick={() => navigate("/marketplace")}>
                  Boutique
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="hp-recipes">
        <div className="hp-section-head">
          <div>
            <h2>Recettes recentes</h2>
            <p>Recettes ajoutees depuis le dashboard admin.</p>
          </div>
          <button className="cs-view-all" onClick={() => navigate("/recette")}>
            Voir plus →
          </button>
        </div>

        {loading ? (
          <p className="hp-empty-state">Chargement des recettes...</p>
        ) : !mainRecipe ? (
          <p className="hp-empty-state">Aucune recette disponible pour le moment.</p>
        ) : (
          <div className="hp-recipes-grid">
            <div className="hp-recipe-feature">
              <div className="hp-recipe-feature-text">
                <span className="hp-recipe-badge">{mainRecipe.badge || mainRecipe.category || "RECETTE"}</span>
                <h3>{mainRecipe.title}</h3>
                <p>{mainRecipe.description}</p>
                <button className="cs-btn-primary" onClick={() => navigate(`/recette/${mainRecipe._id}`)}>
                  Voir la recette
                </button>
              </div>
              <div className="hp-recipe-feature-img" style={bgImage(mainRecipe.image)} />
            </div>

            {sideRecipe && (
              <button className="hp-recipe-card" onClick={() => navigate(`/recette/${sideRecipe._id}`)}>
                <div className="hp-recipe-card-img" style={bgImage(sideRecipe.image)} />
                <div className="hp-recipe-card-info">
                  <h4>{sideRecipe.title}</h4>
                  <p>{sideRecipe.time} · {sideRecipe.level}</p>
                </div>
              </button>
            )}
          </div>
        )}
      </section>

      <section className="hp-workshop">
        <div className="hp-workshop-info">
          <h2>Workshops et formations</h2>
          <p>Les prochains ateliers ajoutes par les formateurs apparaissent ici.</p>
          {loading ? (
            <p>Chargement des workshops...</p>
          ) : workshopPreview.length === 0 ? (
            <p>Aucun workshop disponible pour le moment.</p>
          ) : (
            <ul className="hp-workshop-list">
              {workshopPreview.map((workshop, index) => (
                <li key={workshop._id}>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <div>
                    <h4>{workshop.title}</h4>
                    <p>{formatDate(workshop.startsAt)} · {workshop.isOnline ? "En ligne" : workshop.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button className="cs-btn-primary" onClick={() => navigate("/workshop")}>
            Voir les workshops
          </button>
        </div>
        <div className="hp-workshop-img" style={bgImage(mainWorkshop?.image)} />
      </section>

      <section className="hp-faq">
        <h2>Questions frequemment posees</h2>
        <div className="hp-faq-list">
          {FAQS.map((f, i) => (
            <div
              key={f.q}
              className={`hp-faq-item ${openFaq === i ? "open" : ""}`}
              onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
            >
              <div className="hp-faq-q">
                <span>{f.q}</span>
                <span>{openFaq === i ? "-" : "+"}</span>
              </div>
              {openFaq === i && f.a && <p className="hp-faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
