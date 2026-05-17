import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import MediaPanel from "../components/MediaPanel";
import "../index.css";

export default function SignIn() {
  const navigate = useNavigate();
  const { signin } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await signin(form);

      // redirect after successful login
      navigate("/home");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-shell reverse">
        <MediaPanel />

        <div className="auth-panel">
          <div className="auth-login-header">
            <button
              className="auth-back"
              onClick={() => navigate("/home")}
            >
              ←
            </button>

            <h2>Log in</h2>
          </div>

          <form className="auth-form" onSubmit={onSubmit}>
            <input
              className="auth-input"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />

            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
            />

            {error && (
              <p className="auth-error">{error}</p>
            )}

            <Link to="/auth/signup" className="auth-link">
              Dont have an account ?
            </Link>

            <button
              type="submit"
              className="auth-btn auth-btn-primary"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}