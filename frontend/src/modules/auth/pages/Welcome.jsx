import { Link } from "react-router-dom";
import MediaPanel from "../components/MediaPanel";
import "../index.css";

export default function Welcome() {
  return (
    <div className="auth-root">
      <div className="auth-shell">
        <div className="auth-panel">
          <h1 className="auth-title">Welcome to</h1>
          <h1 className="auth-title auth-title-accent">Celiac Square</h1>

          <div className="auth-welcome-buttons">
            <Link
              to="/auth/signin"
              className="auth-btn auth-btn-secondary"
            >
              Sign in
            </Link>

            <Link
              to="/auth/signup"
              className="auth-btn auth-btn-primary"
            >
              <span style={{ flex: 1, textAlign: "center" }}>
                Get Started
              </span>

              <span className="auth-btn-arrow">→</span>
            </Link>
          </div>
        </div>

        <MediaPanel />
      </div>
    </div>
  );
}