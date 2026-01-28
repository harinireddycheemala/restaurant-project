import React, { useState } from "react";

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: 1,
    date: "",
    time: ""
  });

  const [confirmation, setConfirmation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation(
      `✅ Table reserved for ${formData.guests} guest(s) on ${formData.date} at ${formData.time}.`
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1 style={{ color: "#4f46e5" }}>🪑 Reserve a Table</h1>
      <p>Book your table in advance to enjoy a smooth dining experience!</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px"
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: "10px", width: "250px", borderRadius: "6px" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "10px", width: "250px", borderRadius: "6px" }}
        />

        <input
          type="number"
          name="guests"
          placeholder="Number of Guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          style={{ padding: "10px", width: "250px", borderRadius: "6px" }}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{ padding: "10px", width: "250px", borderRadius: "6px" }}
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          style={{ padding: "10px", width: "250px", borderRadius: "6px" }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#4f46e5",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Reserve Now
        </button>
      </form>

      {confirmation && (
        <h3 style={{ color: "green", marginTop: "20px" }}>{confirmation}</h3>
      )}
    </div>
  );
}

