import AllergyChat from "./pages/AllergyChat";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login"; // 1. Import Login
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import RestaurantDetail from "./pages/RestaurantDetail";
import Reservation from "./pages/Reservation";
import Quiz from "./pages/Quiz";
import MoodMatcher from "./pages/MoodMatcher";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header Section */}
      <header
        style={{
          backgroundColor: "#fff",
          padding: "15px 20px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
            <h2 style={{ color: "#10B981", fontWeight: "bold", margin: 0, cursor: "pointer" }}>
              SmartCrave 🍽️
            </h2>
        </Link>

        <nav style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#4f46e5", fontWeight: "500" }}>Home</Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "#4f46e5", fontWeight: "500" }}>Profile</Link>
          <Link to="/cart" style={{ textDecoration: "none", color: "#4f46e5", fontWeight: "500" }}>Cart</Link>
          <Link to="/quiz" style={{ textDecoration: "none", color: "#4f46e5", fontWeight: "500" }}>Quiz</Link>
          <Link to="/mood" style={{ textDecoration: "none", color: "#4f46e5", fontWeight: "500" }}>Mood Matcher</Link>
          
          {/* 2. Login Button */}
          <Link to="/login" style={{
            textDecoration: "none", 
            color: "white", 
            background: "#10B981", 
            padding: "8px 16px", 
            borderRadius: "6px", 
            fontWeight: "bold",
            fontSize: "14px"
          }}>
            Login
          </Link>
        </nav>
      </header>

      {/* Page Content */}
      <div style={{ padding: "20px", flexGrow: 1 }}>
        <Routes>
          <Route path="/allergies" element={<AllergyChat />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* 3. Login Route */}
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
