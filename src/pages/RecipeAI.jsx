import React, { useState } from "react";

const RecipeAI = () => {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const ingredients = ["Eggs", "Cheese", "Tomato", "Bread", "Chicken", "Pasta", "Onion", "Rice", "Milk"];

  const toggle = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else {
      if (selected.length >= 3) return alert("Select exactly 3");
      setSelected([...selected, item]);
    }
  };

    const generate = () => {
    if (selected.length !== 3) return alert("Select 3 ingredients");
    
    const s = selected;
    let name = "Fusion Stir-Fry";

    // Improved Logic Tree
    if (s.includes('Eggs') && s.includes('Bread') && s.includes('Cheese')) {
      name = "Cheese Omelette Toast";
    } else if (s.includes('Chicken') && s.includes('Rice') && s.includes('Onion')) {
      name = "Chicken Biryani";
    } else if (s.includes('Pasta') && s.includes('Tomato') && s.includes('Cheese')) {
      name = "Pasta Marinara";
    } else if (s.includes('Eggs') && s.includes('Milk') && s.includes('Cheese')) {
      name = "Scrambled Eggs";
    } else if (s.includes('Bread') && s.includes('Cheese') && s.includes('Tomato')) {
      name = "Pizza Toast";
    } else if (s.includes('Rice') && s.includes('Chicken') && s.includes('Onion')) {
      name = "Chicken Fried Rice";
    } else if (s.includes('Pasta') && s.includes('Cheese') && s.includes('Tomato')) {
      name = "Italian Pasta";
    } else if (s.includes('Bread') && s.includes('Eggs') && s.includes('Cheese')) {
      name = "Breakfast Sandwich";
    } else if (s.includes('Chicken') && s.includes('Bread') && s.includes('Cheese')) {
      name = "Chicken Club Sandwich";
    } else if (s.includes('Rice') && s.includes('Pasta') && s.includes('Tomato')) {
      name = "Risotto Primavera";
    } else if (s.includes('Milk') && s.includes('Cheese') && s.includes('Tomato')) {
      name = "Creamy Tomato Soup";
    } else if (s.includes('Onion') && s.includes('Pasta') && s.includes('Cheese')) {
      name = "Caramelized Onion Pasta";
    } else if (s.includes('Milk') && s.includes('Eggs') && s.includes('Onion')) {
      name = "French Onion Soup";
    } else if (s.includes('Chicken') && s.includes('Milk') && s.includes('Pasta')) {
      name = "Creamy Chicken Pasta";
    } else if (s.includes('Rice') && s.includes('Eggs') && s.includes('Onion')) {
      name = "Egg Fried Rice";
    } else if (s.includes('Tomato') && s.includes('Pasta') && s.includes('Onion')) {
      name = "Pasta with Tomato Sauce";
    } else if (s.includes('Cheese') && s.includes('Bread') && s.includes('Onion')) {
      name = "Cheese Onion Bread";
    } else if (s.includes('Milk') && s.includes('Rice') && s.includes('Eggs')) {
      name = "Congee (Rice Porridge)";
    } else {
      // Fallback for unmatched combinations
      name = "Special " + s[0] + " " + s[1] + " " + s[2] + " Bowl";
    }
    
    const description = "A delicious dish made with " + s.join(", ") + ".";
    
    setResult({ name, description });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>👨‍🍳 AI Recipe Generator</h2>
      <p>Select 3 ingredients:</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {ingredients.map(i => (
          <div 
            key={i} 
            onClick={() => toggle(i)}
            style={{
              padding: "15px",
              background: selected.includes(i) ? "#ffedd5" : "white",
              border: selected.includes(i) ? "2px solid #ea580c" : "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {i}
          </div>
        ))}
      </div>
      <button onClick={generate} style={{ marginTop: "20px", padding: "10px 20px", background: "#ea580c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
        Generate Recipe
      </button>
            {/* Fixed Result Display */}
      {result && (
        <div style={{ marginTop: "30px", padding: "20px", background: "#f3f4f6", borderRadius: "10px", border: "1px solid #ddd" }}>
          <h3 style={{ color: "#ea580c", margin: "0 0 10px 0" }}>🍽️ Suggested: {result.name}</h3>
          <p style={{ color: "#555", lineHeight: "1.5" }}>{result.description}</p>
          <button onClick={() => setSelected([])} style={{ padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "15px" }}>
            Try Again
          </button>
        </div>
      )}
  );
};

export default RecipeAI;
