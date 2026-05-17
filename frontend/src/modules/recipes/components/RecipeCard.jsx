import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ _id, title, time, level, badge, imageBadge, image }) {
  return (
    <Link
      to={`/recette/${_id}`}
      className="rc-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className="rc-card-img"
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        {badge && <span className="rc-card-tag">{badge}</span>}
        {imageBadge && <span className="rc-card-imgbadge">{imageBadge}</span>}
      </div>

      <div className="rc-card-body">
        <h4>{title}</h4>
        <div className="rc-card-meta">
          <span>{time}</span>
          <span>{level}</span>
        </div>
      </div>
    </Link>
  );
}

