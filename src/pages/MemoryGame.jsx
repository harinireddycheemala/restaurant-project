import React, { useState, useEffect } from "react";

const MemoryGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [cardData, setCardData] = useState([]); // Store objects
  const [pairsCount, setPairsCount] = useState(4);

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted]);

  const allIcons = ['🍕', '🍔', '🍣', '🌮', '🍝', '🍦', '🌶️', '🥗'];

  const startGame = (pairs) => {
    const count = pairs || pairsCount;
    const selectedIcons = allIcons.slice(0, count);
    // Create objects: { id: 0, icon: '🍕' }
    const deck = selectedIcons.map((icon, index) => ({ id: index, icon: icon, matched: false }));
    const fullDeck = [...deck, ...deck]; // Duplicate and create new references
    const shuffled = fullDeck.sort(() => Math.random() - 0.5);
    
    setCardData(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
    setGameStarted(true);
  };

  const handleCardClick = (index) => {
    if (flipped.length === 2) return;
    if (flipped.includes(index)) return;
    if (matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cardData[firstIndex];
      const secondCard = cardData[secondIndex];
      const isMatch = firstCard.icon === secondCard.icon;

      if (isMatch) {
        setMatched([...matched, firstIndex, secondIndex]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const reset = () => setGameStarted(false);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#4f46e5" }}>🧠 Cuisine Match</h2>
      {!gameStarted ? (
        <div>
          <label style={{ display: "block", margin: "20px 0" }}>Select Pairs (4-10):</label>
          <select value={pairsCount} onChange={(e) => setPairsCount(parseInt(e.target.value))} style={{ padding: "10px", fontSize: "16px" }}>
            <option value={4}>4 Pairs</option>
            <option value={6}>6 Pairs</option>
            <option value={8}>8 Pairs</option>
            <option value={10}>10 Pairs</option>
          </select>
          <br /><br />
          <button onClick={() => startGame(pairsCount)} style={{ padding: "10px 20px", background: "#10B981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            Start Game
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
            Moves: {moves} | Time: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}{seconds % 60}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cardData.length <= 8 ? 4 : 5}, 1fr)`, gap: "10px", maxWidth: "500px", margin: "0 auto" }}>
            {cardData.map((card, index) => (
              <div 
                key={index} 
                onClick={() => handleCardClick(index)} 
                style={{
                  width: "60px", 
                  height: "60px", 
                  background: flipped.includes(index) || matched.includes(index) ? "white" : "#e0e7ff", 
                  border: matched.includes(index) ? "2px solid #10B981" : "2px solid #4f46e5", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: "28px", 
                  cursor: "pointer", 
                  userSelect: "none" 
                }}
              >
                {flipped.includes(index) || matched.includes(index) ? card.icon : "❓"}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "30px" }}>
            {matched.length === cardData.length && <h3 style={{ color: "#10B981" }}>🎉 You Won!</h3>}
            <button onClick={reset} style={{ padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              End Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
