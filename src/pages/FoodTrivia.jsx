import React, { useState } from "react";

const FoodTrivia = () => {
  const questions = [
    { q: "Which fruit is known as the 'King of Fruits'?", options: ["Apple", "Mango", "Banana", "Orange"], answer: "Mango" },
    { q: "Which vegetable is used to make ketchup?", options: ["Tomato", "Potato", "Carrot", "Onion"], answer: "Tomato" },
    { q: "What is the main ingredient in Guacamole?", options: ["Tomato", "Avocado", "Onion", "Pepper"], answer: "Avocado" },
    { q: "Which country invented Sushi?", options: ["China", "Korea", "Japan", "Thailand"], answer: "Japan" },
    { q: "What is a 'Latte' made of?", options: ["Tea", "Juice", "Coffee & Milk", "Soda"], answer: "Coffee & Milk" }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1);
    }

    const nextQ = currentQ + 1;
    if (nextQ < questions.length) {
      setCurrentQ(nextQ);
    } else {
      setShowScore(true);
    }
  };

  const restartGame = () => {
    setCurrentQ(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial" }}>
      <h2 style={{ color: "#ea580c" }}>🧠 Food Trivia</h2>
      
      {showScore ? (
        <div style={{ marginTop: "50px" }}>
          <h3>You scored {score} out of {questions.length}</h3>
          <button onClick={restartGame} style={{ padding: "10px 20px", background: "#ea580c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Play Again</button>
        </div>
      ) : (
        <div style={{ maxWidth: "500px", margin: "30px auto" }}>
          <div style={{ fontSize: "18px", marginBottom: "20px", fontWeight: "bold" }}>
            Question {currentQ + 1}/{questions.length}
          </div>
          <div style={{ fontSize: "22px", marginBottom: "30px", minHeight: "60px" }}>
            {questions[currentQ].q}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {questions[currentQ].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  background: "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "0.2s"
                }}
                onMouseEnter={(e) => e.target.style.background = "#fff7ed"}
                onMouseLeave={(e) => e.target.style.background = "white"}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodTrivia;
