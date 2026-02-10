import React, { useState } from "react";
import { Link } from "react-router-dom";

const AllergyChat = () => {
  const [step, setStep] = useState(1);
  const [hasAllergy, setHasAllergy] = useState(null);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [customization, setCustomization] = useState("");

  const allergenOptions = ["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs"];

  const toggleAllergen = (item) => {
    if (selectedAllergens.includes(item)) {
      setSelectedAllergens(selectedAllergens.filter((a) => a !== item));
    } else {
      setSelectedAllergens([...selectedAllergens, item]);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#10B981", fontWeight: "bold" }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{
          background: "#F9FAFB",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
        }}>
        
        {/* Step 1: Question */}
        {step === 1 && (
          <div>
            <div style={{
                background: "#10B981",
                color: "white",
                padding: "10px 15px",
                borderRadius: "12px",
                display: "inline-block",
                marginBottom: "15px",
                maxWidth: "80%"
              }}>
              🤖 Hi! I'm here to help you find safe food. Do you have any food allergies?
            </div>
            <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button 
                onClick={() => { setHasAllergy(false); setStep(4); }}
                style={{ padding: "10px 20px", background: "white", border: "1px solid #ccc", borderRadius: "20px", cursor: "pointer" }}>
                No, I'm good.
              </button>
              <button 
                onClick={() => { setHasAllergy(true); setStep(2); }}
                style={{ padding: "10px 20px", background: "#10B981", color: "white", border: "none", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }}>
                Yes, I do.
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Selection */}
        {step === 2 && (
          <div>
             <div style={{
                background: "#10B981",
                color: "white",
                padding: "10px 15px",
                borderRadius: "12px",
                display: "inline-block",
                marginBottom: "15px"
              }}>
              🤖 Got it. Which ingredients are allergic to you? (Select all that apply)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
              {allergenOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleAllergen(item)}
                  style={{
                    padding: "10px 20px",
                    border: `1px solid ${selectedAllergens.includes(item) ? "#10B981" : "#ccc"}`,
                    background: selectedAllergens.includes(item) ? "#E6FFFA" : "white",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {selectedAllergens.includes(item) ? "✓ " : ""} {item}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(3)}
              style={{ marginTop: "20px", background: "#4f46e5", color: "white", border: "none", padding: "10px 25px", borderRadius: "8px", cursor: "pointer", display: "block", marginLeft: "auto" }}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Customization */}
        {step === 3 && (
          <div>
             <div style={{
                background: "#10B981",
                color: "white",
                padding: "10px 15px",
                borderRadius: "12px",
                display: "inline-block",
                marginBottom: "15px"
              }}>
              🤖 How should the kitchen handle your order? (e.g. "No nuts on top")
            </div>
            <textarea
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              placeholder="Type your instructions here..."
              style={{
                width: "100%",
                height: "100px",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                marginTop: "15px",
                fontSize: "16px"
              }}
            />
            <button 
              onClick={() => setStep(4)}
              style={{ marginTop: "20px", background: "#10B981", color: "white", border: "none", padding: "10px 25px", borderRadius: "8px", cursor: "pointer", display: "block", marginLeft: "auto" }}
            >
              Save Profile
            </button>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div>
             <div style={{
                background: "#10B981",
                color: "white",
                padding: "15px 15px",
                borderRadius: "12px",
                marginBottom: "15px",
                textAlign: "center"
              }}>
              🛡️ Profile Saved!
            </div>
            
            <div style={{ background: "white", padding: "15px", borderRadius: "12px", border: "1px solid #eee" }}>
              <p style={{ margin: "0 0 10px 0", color: "#333" }}>
                {hasAllergy ? (
                  <span>We will warn you about: <strong>{selectedAllergens.join(", ")}</strong></span>
                ) : (
                  <span>No specific allergies set. We will proceed normally.</span>
                )}
              </p>
              {customization && (
                <p style={{ margin: "0", color: "#666", fontSize: "14px", fontStyle: "italic" }}>
                  Note: "{customization}"
                </p>
              )}
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Link to="/restaurant">
                <button style={{ background: "#4f46e5", color: "white", border: "none", padding: "12px 25px", borderRadius: "8px", cursor: "pointer" }}>
                  Go to Menu
                </button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllergyChat;
