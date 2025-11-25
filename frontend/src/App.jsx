import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ClientForm from "./pages/ClientForm";
import AdminDashboard from "./pages/AdminDashboard";

// ✅ PrivateRoute wrapper
const PrivateRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/signin" />;
};

export default function App() {
  const [auth, setAuth] = useState({ token: null, user: null });
  const navigate = useNavigate();

  // Load auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setAuth({ token, user: JSON.parse(user) });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
    navigate("/signin");
  };

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
          {!auth.token ? (
            <>
              <Link to="/signin" style={{ color: "white", margin: "0 10px" }}>
                Sign In
              </Link>
              <Link to="/register" style={{ color: "white", margin: "0 10px" }}>
                Register
              </Link>
            </>
          ) : (
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
              {auth.user && (
                <span style={{ marginLeft: "15px" }}>
                  Welcome, {auth.user.name}
                </span>
              )}
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "15px",
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
          <Route path="/signin" element={<SignIn setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth} />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute token={auth.token}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute token={auth.token}>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/submit"
            element={
              <PrivateRoute token={auth.token}>
                <ClientForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute token={auth.token}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
