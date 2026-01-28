import React, { useState } from "react";
import { motion } from "framer-motion";

const moods = [
  { mood: "Happy 😊", suggestion: "Treat yourself with sushi rolls 🍣" },
  { mood: "Stressed 😣", suggestion: "Relax with a creamy pasta 🍝" },
  { mood: "Tired 😴", suggestion: "Recharge with a warm soup 🍲" },
  { mood: "Excited 🤩", suggestion: "Celebrate with tacos 🌮" },
  { mood: "Bored 😐", suggestion: "Try something spicy 🌶️" },
];

const MoodMatcher = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2 style={{ color: "#6A5ACD" }}>💫 Mood Matcher</h2>
      <p>Tell us your mood, and we’ll suggest the perfect meal!</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {moods.map((m, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1, backgroundColor: "#6A5ACD", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood(m)}
            style={{
              border: "2px solid #6A5ACD",
              borderRadius: "12px",
              padding: "10px 20px",
              background: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {m.mood}
          </motion.button>
        ))}
      </div>

      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: "3rem" }}
        >
          <h3 style={{ color: "#6A5ACD" }}>{selectedMood.suggestion}</h3>
        </motion.div>
      )}
    </div>
  );
};

export default MoodMatcher;

