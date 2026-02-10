import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const restaurants = [
    {
      id: 1,
      name: "Spice Route",
      cuisine: "Indian",
      rating: 4.7,
      description: "Authentic Indian flavors with modern twists.",
      image:
        "https://images.unsplash.com/photo-1600628422011-6e4c62b65a19?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Sushi Zen",
      cuisine: "Japanese",
      rating: 4.9,
      description: "Fresh sushi and sashimi prepared by expert chefs.",
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Bella Vita",
      cuisine: "Italian",
      rating: 4.8,
      description: "Handmade pasta and traditional Italian dishes.",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // 1. State for Filtering
  const [filter, setFilter] = useState("All");

  // 2. Filter Logic
  const filteredRestaurants =
    filter === "All"
      ? restaurants
      : restaurants.filter((res) => res.cuisine === filter);

  return (
    <div>
      <section style={{ textAlign: "center", margin: "30px 0" }}>
        <h2 style={{ fontSize: "28px", color: "#4f46e5" }}>
          🍴 Discover Restaurants
        </h2>
        <p>Explore cuisines, reserve tables, or pre-order your meal!</p>

        {/* 3. Filter Dropdown */}
        <div style={{ marginTop: "20px" }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              color: "#333",
            }}
          >
            <option value="All">All Cuisines</option>
            <option value="Indian">🌶️ Indian (Spicy)</option>
            <option value="Japanese">🍣 Japanese</option>
            <option value="Italian">🍝 Italian</option>
          </select>
        </div>
      </section>

      {/* Restaurant Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredRestaurants.map((res) => (
          <div
            key={res.id}
            style={{
              border: "1px solid #eee",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              padding: "16px",
              background: "#fff",
              textAlign: "center",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={res.image}
              alt={res.name}
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
            <h3 style={{ marginTop: "10px", color: "#333" }}>{res.name}</h3>
            <p>{res.description}</p>
            <p>
              <strong>Cuisine:</strong> {res.cuisine}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {res.rating}
            </p>
            <div style={{ marginTop: "12px" }}>
              <Link to="/restaurant">
                <button
                  style={{
                    background: "#4f46e5",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </Link>
              <Link to="/reservation">
                <button
                  style={{
                    background: "#16a34a",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Reserve Table 🍽️
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
