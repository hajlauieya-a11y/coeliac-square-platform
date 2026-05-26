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
    role: "user",
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
      navigate("/home");
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

            <select className="auth-input" name="role" value={form.role} onChange={onChange}>
              <option value="user">Patient / Visitor</option>
              <option value="expert">Expert / Nutritionist</option>
              <option value="vendor">Vendor</option>
              <option value="formateur">Formateur</option>
            </select>

            {form.role !== "user" && (
              <p className="auth-note">
                Your account will stay as a regular user until an admin confirms this role.
              </p>
            )}

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
