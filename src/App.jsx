import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import RestaurantDetail from "./pages/RestaurantDetail";
import Reservation from "./pages/Reservation";
import Quiz from "./pages/Quiz";
import MoodMatcher from "./pages/MoodMatcher";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header Section */}
      <header
        style={{
          backgroundColor: "#fff",
          padding: "12px 20px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h2 style={{ color: "#4f46e5", fontWeight: "bold" }}>
          SmartCrave 🍽️
        </h2>
        <nav style={{ display: "flex", gap: "16px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "purple" }}>
            Home
          </Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "purple" }}>
            Profile
          </Link>
          <Link to="/cart" style={{ textDecoration: "none", color: "purple" }}>
            Cart
          </Link>
          <Link to="/quiz" style={{ textDecoration: "none", color: "purple" }}>
            Craving Quiz
          </Link>
          <Link to="/mood" style={{ textDecoration: "none", color: "purple" }}>
            Mood Matcher
          </Link>
        </nav>
      </header>

      {/* Page Content */}
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurant" element={<RestaurantDetail />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/mood" element={<MoodMatcher />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;





