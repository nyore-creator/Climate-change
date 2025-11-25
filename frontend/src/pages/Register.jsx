import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; 

const Register = ({ setAuth }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Registering...");

    try {
      const res = await API.post("/api/auth/register", form);

      if (res.data.success) {
        // ✅ Save both token and user details
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ Update React state so navbar re-renders immediately
        setAuth({ token: res.data.token, user: res.data.user });

        setStatus("Welcome, " + res.data.user?.name);

        // ✅ Navigate to Home
        navigate("/");
      } else {
        setStatus("Error: " + (res.data.msg || "Registration failed"));
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
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: "30px",
        background: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#2c3e50" }}>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
        />
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
          style={{
            width: "100%",
            padding: "12px",
            background: "#0077b6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
      {status && <p style={{ marginTop: "15px" }}>{status}</p>}
      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <Link to="/signin" style={{ color: "#2980b9" }}>
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default Register;
