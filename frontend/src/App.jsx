import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ClientForm from "./pages/ClientForm";
import AdminDashboard from "./pages/AdminDashboard";

// PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" />;
};

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="app-container" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Navigation Bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between", 
          alignItems: "center",
          padding: "15px",
          background: "#0077b6",
          color: "white",
        }}
      >
        <h2>Climate Change Portal</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          {!token && (
            <>
              <Link to="/signin" style={{ color: "white", margin: "0 10px" }}>
                Sign In
              </Link>
              <Link to="/register" style={{ color: "white", margin: "0 10px" }}>
                Register
              </Link>
            </>
          )}
          {token && (
            <>
              <Link to="/" style={{ color: "white", margin: "0 10px" }}>
                Home
              </Link>
              <Link to="/about" style={{ color: "white", margin: "0 10px" }}>
                About
              </Link>
              <Link to="/submit" style={{ color: "white", margin: "0 10px" }}>
                Submit Data
              </Link>
              <Link to="/dashboard" style={{ color: "white", margin: "0 10px" }}>
                Admin
              </Link>
              {/* ✅ Logout button */}
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/signin";
                }}
                style={{
                  marginLeft: "10px",
                  background: "transparent",
                  border: "1px solid white",
                  color: "white",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/submit"
            element={
              <PrivateRoute>
                <ClientForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
