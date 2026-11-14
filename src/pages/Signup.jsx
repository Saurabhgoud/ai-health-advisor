import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import "./Signup.css";
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    if (!cleanName || !cleanEmail || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post("/auth/register", {
        name: cleanName,
        email: cleanEmail,
        password: formData.password
      });
      console.log("Signup response:", response.data);
      alert("Account created successfully");
      navigate("/login", {
        replace: true
      });
    } catch (requestError) {
      console.error("Complete signup error:", requestError);
      console.log("Backend response:", requestError.response?.data);
      const backendMessage = requestError.response?.data?.message;
      setError(backendMessage || "Could not create the account.");
    } finally {
      setLoading(false);
    }
  };
  return <main className="simple-signup-page">
      <section className="simple-signup-card">
        <div className="simple-signup-heading">
          <span>AI</span>

          <div>
            <h1>Create Account</h1>
            <p>Start your personalized health journey.</p>
          </div>
        </div>

        {error && <p className="simple-signup-error">{error}</p>}

        <form className="simple-signup-form" onSubmit={handleSubmit}>
          <div className="simple-signup-field">
            <label htmlFor="name">Full name</label>

            <input
    id="name"
    type="text"
    name="name"
    placeholder="Enter your name"
    value={formData.name}
    onChange={handleChange}
  />
          </div>

          <div className="simple-signup-field">
            <label htmlFor="email">Email</label>

            <input
    id="email"
    type="email"
    name="email"
    placeholder="Enter your email"
    value={formData.email}
    onChange={handleChange}
  />
          </div>

          <div className="simple-signup-field">
            <label htmlFor="password">Password</label>

            <input
    id="password"
    type="password"
    name="password"
    placeholder="Minimum 6 characters"
    value={formData.password}
    onChange={handleChange}
  />
          </div>

          <div className="simple-signup-field">
            <label htmlFor="confirmPassword">Confirm password</label>

            <input
    id="confirmPassword"
    type="password"
    name="confirmPassword"
    placeholder="Enter password again"
    value={formData.confirmPassword}
    onChange={handleChange}
  />
          </div>

          <button
    type="submit"
    className="simple-signup-button"
    disabled={loading}
  >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </section>
    </main>;
}
export default Signup;
