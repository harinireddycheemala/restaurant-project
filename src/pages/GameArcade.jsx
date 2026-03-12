import React, { useState } from "react";
import MemoryGame from "./MemoryGame";
import RecipeAI from "./RecipeAI";
import AllergyChat from "./AllergyChat"; // <--- ADD THIS LINE
// Removed Quiz and MoodMatcher from imports

const GameArcade = () => {
  const [currentGame, setCurrentGame] = useState(null);

  const games = [
    { id: 'memory', name: "Memory Match", icon: "🧠", desc: "Find matching food pairs (4-10 Pairs)." },
    { id: 'recipe', name: "Recipe AI", icon: "👨‍🍳", desc: "Generate recipes from ingredients." },
    { id: 'trivia', name: "Food Trivia", icon: "🧠", desc: "Test your food knowledge!" },
    { id: 'speed', name: "Speed Chef", icon: "⚡", desc: "Tap the ingredients fast!" }
  ];

  // ... keep the rest of the return statement the same ...
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1 style={{ color: "#ea580c" }}>🍊 SmartCrave Arcade</h1>
      <p>Select a game to play:</p>

      {!currentGame ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "30px" }}>
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => setCurrentGame(game.id)}
              style={{
                border: "2px solid #fed7aa",
                padding: "30px",
                borderRadius: "15px",
                cursor: "pointer",
                background: "#fff7ed",
                transition: "0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>{game.icon}</div>
              <h3 style={{ color: "#333" }}>{game.name}</h3>
              <p style={{ color: "#666", fontSize: "14px" }}>{game.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setCurrentGame(null)} style={{ padding: "10px 20px", marginBottom: "20px", cursor: "pointer", background: "#eee", border: "none", borderRadius: "5px" }}>
            ← Back to Arcade
          </button>
          
          {/* Render Selected Game */}
          {currentGame === 'memory' && <MemoryGame />}
          {currentGame === 'recipe' && <RecipeAI />}
          {currentGame === 'trivia' && <div>Food Trivia (Coming Soon)</div>}
          {currentGame === 'speed' && <div>Speed Chef (Coming Soon)</div>}
        </div>
      )}
    </div>
  );
};

export default GameArcade;
