import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; // axios instance

const SignIn = ({ setAuth }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Signing in...");

    try {
      const res = await API.post("/api/auth/login", form);

      if (res.data.success) {
        // ✅ Save both token and user details
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ Update React state so navbar re-renders immediately
        setAuth({ token: res.data.token, user: res.data.user });

        setStatus("Welcome back, " + res.data.user?.name);

        // ✅ Navigate to your main page (adjust route as needed)
        navigate("/"); 
      } else {
        setStatus("Error: " + (res.data.msg || "Login failed"));
      }
    } catch (err) {
      if (err.response) {
        setStatus("Error: " + (err.response.data.msg || err.response.statusText));
      } else {
        setStatus("Network error");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: "30px", background: "#f9f9f9", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" }}>
      <h1 style={{ color: "#2c3e50" }}>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "12px", background: "#0077b6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Sign In
        </button>
      </form>
      {status && <p style={{ marginTop: "15px" }}>{status}</p>}
      <p style={{ marginTop: "20px" }}>
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "#2980b9" }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
