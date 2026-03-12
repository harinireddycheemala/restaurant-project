import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import GameArcade from "./pages/GameArcade";
import Login from "./Login";
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
          
          {/* Orange Games Button */}
          <Link to="/arcade" style={{
            textDecoration: "none", 
            color: "white", 
            background: "#ea580c", 
            padding: "8px 16px", 
            borderRadius: "6px", 
            fontWeight
cat > src/App.jsx << 'EOF'
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import GameArcade from "./pages/GameArcade";
import Login from "./Login";
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
          
          {/* Orange Games Button */}
          <Link to="/arcade" style={{
            textDecoration: "none", 
            color: "white", 
            background: "#ea580c", 
            padding: "8px 16px", 
            borderRadius: "6px", 
            fontWeight
git add .
git commiot -m "Added Games Button"
