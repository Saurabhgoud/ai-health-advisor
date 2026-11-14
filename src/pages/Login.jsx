import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import "./Login.css";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "demo@aihealthadvisor.com",
    password: "Demo@123"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
    setError("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!formData.email.trim() || !formData.password) {
      setError("Email and password are required");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password
      });
      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard", {
        replace: true
      });
    } catch (requestError) {
      console.error("Login error:", requestError);
      setError(
        requestError.response?.data?.message || "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };
  return <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="login-brand-logo">AI</div>

          <div className="login-brand-text">
            <strong>AI Health</strong>
            <span>Nutrition Advisor</span>
          </div>
        </div>

        <div className="login-heading">
          <span>Welcome back</span>

          <h1>Login</h1>

          <p>Sign in to continue to your personalized health workspace.</p>
        </div>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-field">
            <label htmlFor="email">Email</label>

            <input
    id="email"
    type="email"
    name="email"
    autoComplete="email"
    placeholder="Enter your email"
    value={formData.email}
    onChange={handleChange}
  />
          </div>

          <div className="login-form-field">
            <label htmlFor="password">Password</label>

            <input
    id="password"
    type="password"
    name="password"
    autoComplete="current-password"
    placeholder="Enter your password"
    value={formData.password}
    onChange={handleChange}
  />
          </div>

          <button
    type="submit"
    className="login-submit-button"
    disabled={loading}
  >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-signup-text">
          Don&apos;t have an account? <Link to="/signup">Create account</Link>
        </p>
      </section>
    </main>;
}
export default Login;
