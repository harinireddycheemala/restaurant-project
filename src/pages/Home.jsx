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
      image: "https://picsum.photos/seed/indianfood/800/600",
    },
    {
      id: 2,
      name: "Sushi Zen",
      cuisine: "Japanese",
      rating: 4.9,
      description: "Fresh sushi and sashimi prepared by expert chefs.",
      image: "https://picsum.photos/seed/sushi/800/600",
    },
    {
      id: 3,
      name: "Bella Vita",
      cuisine: "Italian",
      rating: 4.8,
      description: "Handmade pasta and traditional Italian dishes.",
      image: "https://picsum.photos/seed/pasta/800/600",
    },
    {
      id: 4,
      name: "Tacos El Sol",
      cuisine: "Mexican",
      rating: 4.6,
      description: "Street-style tacos with the freshest guacamole.",
      image: "https://picsum.photos/seed/tacos/800/600",
    },
    {
      id: 5,
      name: "Bangkok Wok",
      cuisine: "Thai",
      rating: 4.8,
      description: "Spicy Pad Thai and authentic green curry.",
      image: "https://picsum.photos/seed/thaifood/800/600",
    },
    {
      id: 6,
      name: "The Burger Joint",
      cuisine: "American",
      rating: 4.5,
      description: "Juicy beef burgers with hand-cut fries.",
      image: "https://picsum.photos/seed/burger/800/600",
    },
  ];
  const [filter, setFilter] = useState("All");

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

      {/* NEW: Floating Action Panel with Label */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          borderRadius: "50px",
          padding: "5px",
          background: "#EF4444", // Red
          transition: "transform 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Link
          to="/allergies"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", padding: "0 10px 0 15px", fontSize: "15px" }}>
            Allergy Chat
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            ⚠️
          </span>
        </Link>
      </div>
    </div>
  );
}


