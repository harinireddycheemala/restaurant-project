import React, { useState } from "react";
import { Link } from "react-router-dom";

const AllergyChat = () => {
  try {
    const [step, setStep] = useState(1);
    const [selectedAllergens, setSelectedAllergens] = useState([]);
    const allergenOptions = ["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs"];

    const toggleAllergen = (item) => {
      if (selectedAllergens.includes(item)) {
        setSelectedAllergens(selectedAllergens.filter((a) => a !== item));
      } else {
        setSelectedAllergens([...selectedAllergens, item]);
      }
    };

    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", background: "#f9fafb" }}>
        <div style={{ width: "100%", maxWidth: "400px", textAlign: "left" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#10B981", fontWeight: "bold", fontSize: "20px", marginBottom: "30px" }}>
            ← Back to Home
          </Link>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
            <h2 style={{ color: "#10B981", marginTop: "0" }}>🤖 Allergy Check</h2>
            <p style={{ color: "#666" }}>Do you have any food allergies?</p>
            <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setStep(3)} style={{ padding: "10px 20px", background: "white", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer" }}>No</button>
              <button onClick={() => setStep(2)} style={{ padding: "10px 20px", background: "#10B981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Yes</button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
            <h3 style={{ color: "#333", marginTop: "0" }}>Select Allergens</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
              {allergenOptions.map((item) => (
                <button 
                  key={item} 
                  onClick={() => toggleAllergen(item)} 
                  style={{ 
                    padding: "10px 20px", 
                    border: `2px solid ${selectedAllergens.includes(item) ? "#10B981" : "#ccc"}`, 
                    background: selectedAllergens.includes(item) ? "#E6FFFA" : "white", 
                    borderRadius: "8px", 
                    cursor: "pointer", 
                    fontWeight: "bold" 
                  }}
                >
                  {selectedAllergens.includes(item) ? "✓ " : ""} {item}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(3)} style={{ marginTop: "20px", background: "#4f46e5", color: "white", border: "none", padding: "10px 25px", borderRadius: "8px", cursor: "pointer", display: "block", marginLeft: "auto" }}>Next</button>
          </div>
        )}

        {/* Step 3: Saved */}
        {step === 3 && (
          <div style={{ background: "white", padding: "30px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", textAlign: "center" }}>
             <h2 style={{ color: "#10B981" }}>🛡️ Profile Saved!</h2>
             <p style={{ color: "#666" }}>We will warn you about potential allergens.</p>
             <Link to="/restaurant"><button style={{ padding: "10px 20px", background: "#10B981", color: "white", border: "none", border: "none", borderRadius: "8px", cursor: "pointer" }}>Go to Menu</button></Link>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <div style={{ padding: "20px", color: "red" }}>Error: {error.message}</div>;
  }
};

export default AllergyChat;
