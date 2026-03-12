import React, { useState } from "react";
import { Link } from "react-router-dom";

const AllergyChat = () => {
  const [step, setStep] = useState(1);
  const [hasAllergy, setHasAllergy] = useState(null);
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#10B981", fontWeight: "bold" }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ background: "#F9FAFB", padding: "20px", borderRadius: "16px" }}>
        
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ color: "#333" }}>🤖 Allergy Check</h2>
            <p>Do you have any food allergies?</p>
            <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => { setHasAllergy(false); setStep(4); }} style={{ padding: "10px 20px", background: "white", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer" }}>No</button>
              <button onClick={() => { setHasAllergy(true); setStep(2); }} style={{ padding: "10px 20px", background: "#10B981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Yes</button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
             <h3 style={{ color: "#333" }}>Select Allergens</h3>
             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px", justifyContent: "center" }}>
              {allergenOptions.map((item) => (
                <button key={item} onClick={() => toggleAllergen(item)} style={{ padding: "10px 20px", border: selectedAllergens.includes(item) ? "2px solid #10B981" : "1px solid #ccc", background: selectedAllergens.includes(item) ? "#E6FFFA" : "white", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
                  {selectedAllergens.includes(item) ? "✓ " : ""} {item}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(3)} style={{ marginTop: "20px", background: "#4f46e5", color: "white", border: "none", padding: "10px 25px", borderRadius: "8px", cursor: "pointer" }}>Next</button>
          </div>
        )}

        {/* Step 3: Saved */}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
             <h2 style={{ color: "#10B981" }}>🛡️ Profile Saved!</h2>
             <p>We will help you stay safe.</p>
             <Link to="/restaurant"><button style={{ padding: "10px 20px", background: "#10B981", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Go to Menu</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllergyChat;
