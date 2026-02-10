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
      image: "/indiancuisine.jpg",
    },
    {
      id: 2,
      name: "Sushi Zen",
      cuisine: "Japanese",
      rating: 4.9,
      description: "Fresh sushi and sashimi prepared by expert chefs.",
      image: "/sushicuisine.jpg",
    },
    {
      id: 3,
      name: "Bella Vita",
      cuisine: "Italian",
      rating: 4.8,
      description: "Handmade pasta and traditional Italian dishes.",
      image: "/italiancuisine.jpg",
    },
    {
      id: 4,
      name: "Tacos El Sol",
      cuisine: "Mexican",
      rating: 4.6,
      description: "Street-style tacos with the freshest guacamole.",
      image: "/tacocuisine.jpg",
    },
    {
      id: 5,
      name: "Bangkok Wok",
      cuisine: "Thai",
      rating: 4.8,
      description: "Spicy Pad Thai and authentic green curry.",
      image: "/thaicuisine.jpg",
    },
    {
      id: 6,
      name: "The Burger Joint",
      cuisine: "American",
      rating: 4.5,
      description: "Juicy beef burgers with hand-cut fries.",
      image: "/burgercusine.jpg",
    },
  ];

  // State for Filtering
  const [filter, setFilter] = useState("All");

  // Filter Logic
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

        {/* Filter Dropdown */}
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
            <option value="Indian">🌶️ Indian</option>
            <option value="Japanese">🍣 Japanese</option>
            <option value="Italian">🍝 Italian</option>
            <option value="Mexican">🌮 Mexican</option>
            <option value="Thai">🍜 Thai</option>
            <option value="American">🍔 American</option>
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

      {/* Floating Action Button */}
      <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 100 }}>
        <Link to="/allergies">
          <button
            style={{
              background: "#EF4444", // Red for warning
              color: "white",
              border: "none",
              width: "60px",
              height: "60px",
              borderRadius: "50%", // Circle
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
              cursor: "pointer",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ⚠️
          </button>
        </Link>
      </div>
    </div>
  );
}






