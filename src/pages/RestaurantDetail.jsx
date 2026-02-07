import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const RestaurantDetail = () => {
  const { id } = useParams();

  // Mock Data for the restaurant
  const restaurant = {
    name: "Spice Route",
    cuisine: "Indian",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1600628422011-6e4c62b65a19?auto=format&fit=crop&w=800&q=80",
  };

  // Mock Dishes with Allergy Data
  const dishes = [
    {
      id: 1,
      name: "Spicy Chicken Curry",
      price: "$12.99",
      calories: 450,
      time: "25 mins",
      image: "https://images.unsplash.com/photo-1606537573661-6bf1effe2e6?auto=format&fit=crop&w=300&q=80",
      allergens: ["Nuts", "Dairy"],
      rating: 4.8,
    },
    {
      id: 2,
      name: "Vegetable Biryani",
      price: "$14.50",
      calories: 380,
      time: "30 mins",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80",
      allergens: ["Gluten"],
      rating: 4.6,
    },
    {
      id: 3,
      name: "Garlic Naan",
      price: "$3.50",
      calories: 200,
      time: "15 mins",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80",
      allergens: ["Dairy", "Gluten"],
      rating: 4.5,
    },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Restaurant Header */}
      <div style={{ position: "relative" }}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "12px" }}
        />
        <div style={{
            position: "absolute",
            bottom: "-30px",
            left: "20px",
            background: "white",
            padding: "15px 25px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
          }}>
          <h2 style={{ margin: "0", color: "#333" }}>{restaurant.name}</h2>
          <p style={{ margin: "5px 0 0", color: "#666", fontSize: "14px" }}>
            ⭐ {restaurant.rating} • {restaurant.cuisine}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
          marginTop: "50px",
          display: "flex",
          gap: "15px",
          marginBottom: "30px"
        }}>
        <Link to="/reservation">
          <button style={{
            background: "#10B981", // Green
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            🍽️ Reserve Table
          </button>
        </Link>
        <button style={{
            background: "#4f46e5", // Purple
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
          🛒 Pre-Order Food
        </button>
      </div>

      {/* Menu Section */}
      <h3 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>Menu & Allergens</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {dishes.map((dish) => (
          <div key={dish.id} style={{
              border: "1px solid #eee",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#fff"
            }}>
            <img
              src={dish.image}
              alt={dish.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: "0 0 5px" }}>{dish.name}</h4>
                <span style={{ fontWeight: "bold", color: "#10B981" }}>{dish.price}</span>
              </div>
              
              {/* ⚠️ Allergy Warning Feature */}
              <div style={{
                  backgroundColor: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "#991B1B",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  marginTop: "10px",
                  display: "inline-block",
                  fontWeight: "600"
                }}>
                ⚠️ Contains: {dish.allergens.join(", ")}
              </div>

              <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
                🕒 {dish.time} • 🔥 {dish.calories} kcal
              </div>
              
              <button style={{
                  width: "100%",
                  marginTop: "15px",
                  padding: "8px",
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
