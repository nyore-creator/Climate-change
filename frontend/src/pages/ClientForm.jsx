import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";

const ClientForm = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    county: "",
    address: "",
    risksFaced: "",
    hotspots: "",
    indigenousKnowledge: "",
    improvementsNeeded: "",
    managementPreferences: "",
    supportNeeded: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    setCountries(countryList().getData());
  }, []);

  // Get user GPS
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          })),
        () => console.warn("Location permission denied")
      );
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCountryChange = (value) =>
    setFormData({ ...formData, country: value.label });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/submissions",
        formData
      );
      console.log("✅ Server response:", response.data);
      alert("🌿 Submission successful! Thank you for contributing.");
      setFormData({
        name: "",
        email: "",
        country: "",
        county: "",
        address: "",
        risksFaced: "",
        hotspots: "",
        indigenousKnowledge: "",
        improvementsNeeded: "",
        managementPreferences: "",
        supportNeeded: "",
        latitude: "",
        longitude: "",
      });
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("Error submitting data. Please try again.");
    }
  };

  // inline styles
  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    padding: "25px",
    marginBottom: "25px",
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#2f4858",
    marginBottom: "8px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #d0d0d0",
    fontSize: "15px",
    outlineColor: "#68a691",
  };

  const textareaStyle = { ...inputStyle, minHeight: "90px" };

  const sectionHeader = {
    color: "#155e63",
    fontWeight: "700",
    marginBottom: "10px",
    fontSize: "18px",
    borderBottom: "2px solid #c8e3d4",
    paddingBottom: "4px",
  };

  const buttonStyle = {
    background: "linear-gradient(90deg, #68a691, #3b8686)",
    color: "#fff",
    border: "none",
    padding: "12px 30px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.2s ease",
  };

  const handleHover = (e, enter) =>
    (e.target.style.transform = enter ? "scale(1.05)" : "scale(1)");

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
        color: "#2f4858",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#155e63",
          marginBottom: "30px",
          fontWeight: "800",
        }}
      >
        Climate Change Data Submission 🌍
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Personal & Location Details */}
        <div style={cardStyle}>
          <h3 style={sectionHeader}>Personal & Location Details</h3>

          <label style={labelStyle}>Full Name</label>
          <input
            style={inputStyle}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label style={labelStyle}>Email Address</label>
          <input
            style={inputStyle}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label style={labelStyle}>Country</label>
          <Select
            options={countries}
            onChange={handleCountryChange}
            placeholder="Select your Country"
          />

          <label style={labelStyle}>County / Province</label>
          <input
            style={inputStyle}
            name="county"
            value={formData.county}
            onChange={handleChange}
          />

          <label style={labelStyle}>Address</label>
          <input
            style={inputStyle}
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Climate Challenges & Risks */}
        <div style={cardStyle}>
          <h3 style={sectionHeader}>Climate Challenges & Risks</h3>
          <textarea
            style={textareaStyle}
            name="risksFaced"
            placeholder="Describe the climate change risks you face"
            value={formData.risksFaced}
            onChange={handleChange}
          />
          <textarea
            style={textareaStyle}
            name="hotspots"
            placeholder="Mention any known hotspots or affected areas"
            value={formData.hotspots}
            onChange={handleChange}
          />
        </div>

        {/* Indigenous Knowledge */}
        <div style={cardStyle}>
          <h3 style={sectionHeader}>Indigenous Knowledge & Local Practices</h3>
          <textarea
            style={textareaStyle}
            name="indigenousKnowledge"
            placeholder="Share indigenous or local knowledge that helps address climate challenges"
            value={formData.indigenousKnowledge}
            onChange={handleChange}
          />
        </div>

        {/* Improvements & Support */}
        <div style={cardStyle}>
          <h3 style={sectionHeader}>Improvements & Support Needed</h3>
          <textarea
            style={textareaStyle}
            name="improvementsNeeded"
            placeholder="What improvements or interventions are needed?"
            value={formData.improvementsNeeded}
            onChange={handleChange}
          />
          <textarea
            style={textareaStyle}
            name="managementPreferences"
            placeholder="How would you like to manage these issues?"
            value={formData.managementPreferences}
            onChange={handleChange}
          />
          <textarea
            style={textareaStyle}
            name="supportNeeded"
            placeholder="What kind of support do you need?"
            value={formData.supportNeeded}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Submit Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
