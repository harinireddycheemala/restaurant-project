import React, { useState } from "react";
import { motion } from "framer-motion";

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = [
    {
      q: "What kind of taste are you craving?",
      options: ["Spicy 🌶️", "Sweet 🍰", "Savory 🍕", "Fresh 🥗"],
    },
    {
      q: "What’s your hunger level?",
      options: ["Light snack 🍪", "Normal 🍛", "Starving 🍔"],
    },
    {
      q: "What do you feel like eating?",
      options: ["Comfort food 🍝", "Healthy 🥑", "Adventurous 🍣"],
    },
  ];

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setStep("result");
    }
  };

  const getResult = () => {
    if (answers.includes("Spicy 🌶️")) return "🔥 Indian Curry";
    if (answers.includes("Sweet 🍰")) return "🍫 Dessert Treat";
    if (answers.includes("Fresh 🥗")) return "🥗 Mediterranean Salad";
    if (answers.includes("Adventurous 🍣")) return "🍣 Japanese Sushi";
    return "🍔 Classic Burger";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2 style={{ color: "#6A5ACD" }}>🍽️ Craving Quiz</h2>

      {step !== "result" ? (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginTop: "2rem" }}
        >
          <h3>{questions[step].q}</h3>
          <div style={{ marginTop: "1rem" }}>
            {questions[step].options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAnswer(opt)}
                style={{
                  margin: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#6A5ACD",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>You seem to crave...</h3>
          <h2 style={{ color: "#6A5ACD", fontSize: "2rem" }}>{getResult()}</h2>
          <button
            onClick={() => {
              setStep(0);
              setAnswers([]);
            }}
            style={{
              marginTop: "1rem",
              background: "#6A5ACD",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Restart Quiz 🔄
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;

