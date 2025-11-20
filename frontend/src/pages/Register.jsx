import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Registering...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("Error: " + (data.msg || (data.errors && data.errors[0].msg) || res.statusText));
        return;
      }

      setStatus("Account created successfully for " + data.user?.name);
      // TODO: Save token to localStorage and redirect to SignIn or dashboard
    } catch (err) {
      setStatus("Network error");
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
      <h1 style={{ color: "#2c3e50" }}>Create Account</h1>
      <p style={{ marginBottom: "20px", color: "#555" }}>
        Join the Climate Change Portal today
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
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
            marginTop: "10px",
          }}
        >
          Register
        </button>
      </form>

      {status && <p style={{ marginTop: "15px", color: "#e74c3c" }}>{status}</p>}

      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <a href="/signin" style={{ color: "#2980b9" }}>
          Sign In
        </a>
      </p>
    </div>
  );
};

export default Register;
