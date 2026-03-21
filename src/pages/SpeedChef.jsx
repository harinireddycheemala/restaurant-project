import React, { useState, useEffect } from "react";

const SpeedChef = () => {
  const ingredients = ["🍅 Tomato", "🧀 Cheese", "🥬 Lettuce", "🥩 Meat", "🍞 Bread", "🥕 Carrot", "🧅 Onion", "🥔 Potato"];
  const [target, setTarget] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    pickNewTarget();
  };

  const pickNewTarget = () => {
    const randomItem = ingredients[Math.floor(Math.random() * ingredients.length)];
    setTarget(randomItem);
  };

  const handleClick = (item) => {
    if (!gameActive) return;
    
    if (item === target) {
      setScore(score + 10);
      pickNewTarget();
    } else {
      // Penalty for wrong click
      setTimeLeft(Math.max(0, timeLeft - 2));
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial" }}>
      <h2 style={{ color: "#ea580c" }}>⚡ Speed Chef</h2>
      <p>Tap the matching ingredient as fast as you can!</p>

      {!gameActive ? (
        <div style={{ marginTop: "40px" }}>
          {timeLeft === 0 && <h3 style={{ color: "red" }}>Time's Up! Final Score: {score}</h3>}
          <button onClick={startGame} style={{ padding: "15px 30px", fontSize: "18px", background: "#10B981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            {score > 0 || timeLeft === 0 ? "Play Again" : "Start Game"}
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", fontSize: "20px", fontWeight: "bold" }}>
            <span>Score: {score}</span>
            <span style={{ color: timeLeft < 10 ? "red" : "#333" }}>Time: {timeLeft}s</span>
          </div>
          
          <div style={{ fontSize: "24px", marginBottom: "30px", padding: "20px", background: "#fff7ed", borderRadius: "10px", display: "inline-block" }}>
            Find: <strong>{target}</strong>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", maxWidth: "500px", margin: "0 auto" }}>
            {ingredients.map((item) => (
              <button
                key={item}
                onClick={() => handleClick(item)}
                style={{
                  padding: "20px",
                  fontSize: "24px",
                  background: "white",
                  border: "2px solid #fed7aa",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "transform 0.1s"
                }}
                onMouseDown={(e) => e.target.style.transform = "scale(0.95")}
                onMouseUp={(e) => e.target.style.transform = "scale(1)"}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedChef;
