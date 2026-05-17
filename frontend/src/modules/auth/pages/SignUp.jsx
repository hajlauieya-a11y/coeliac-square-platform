import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import MediaPanel from "../components/MediaPanel";
import "../index.css";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",      // Changed from username to name (matches backend)
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(form);
      navigate("/auth");           // or "/welcome" or "/home"
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-shell">
        <div className="auth-panel">
          <button
            className="auth-back"
            onClick={() => navigate("/home")}
          >
            ←
          </button>

          <h2 className="auth-subtitle">Sign Up</h2>

          <form className="auth-form" onSubmit={onSubmit}>
            <input
              className="auth-input"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={onChange}
              required
            />

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

            {error && <p className="auth-error">{error}</p>}

            <Link to="/auth/signin" className="auth-link">
              Have an account ?
            </Link>

            <button
              type="submit"
              className="auth-btn auth-btn-primary"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign up"}
            </button>
          </form>
        </div>

        <MediaPanel />
      </div>
    </div>
  );
}