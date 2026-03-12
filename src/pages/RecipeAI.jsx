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
    if (s.includes('Eggs') && s.includes('Bread') && s.includes('Cheese')) name = "Cheese Omelette Toast";
    else if (s.includes('Chicken') && s.includes('Rice') && s.includes('Onion')) name = "Chicken Biryani";
    else if (s.includes('Pasta') && s.includes('Tomato') && s.includes('Cheese')) name = "Pasta Marinara";
    else if (s.includes('Eggs') && s.includes('Milk') && s.includes('Cheese')) name = "Scrambled Eggs";
    else if (s.includes('Bread') && s.includes('Cheese') && s.includes('Tomato')) name = "Pizza Toast";
    setResult(name);
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
      {result && <h3 style={{ marginTop: "20px", color: "#10B981" }}>Suggested: {result}</h3>}
    </div>
  );
};

export default RecipeAI;
