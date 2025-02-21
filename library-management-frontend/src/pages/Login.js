import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css"; // Custom styles for the login page

const Login = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !role) {
      setError("Please fill in all fields.");
      return;
    }

    // Save user details in localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    // Redirect based on role
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "reader") {
      navigate("/reader");
    } else {
      setError("Invalid role. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to Library Management</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="reader">Reader</option>
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;