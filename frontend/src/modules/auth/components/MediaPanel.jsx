const IMAGES = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=400",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400",
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
];

export default function MediaPanel({ showText = true }) {
  return (
    <div className="auth-media">
      <div className="auth-media-grid">
        {IMAGES.map((src, i) => (
          <div key={i} style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
      {showText && (
        <div className="auth-media-text">
          <p>
            At Celiac Square, we believe you shouldn't have to choose between
            health and flavor. Discover our curated selection of high-quality,
            gluten-free, and sugar-free products designed to fit your lifestyle
            perfectly.
          </p>
        </div>
      )}
    </div>
  );
}
