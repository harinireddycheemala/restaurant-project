import React, { useState } from "react";
import { Link } from "react-router-dom";

const DietPlan = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("Weight Loss");
  const [craving, setCraving] = useState("Healthy");
  
  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);
  const [meals, setMeals] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  
  const [trackerCalories, setTrackerCalories] = useState(0);
  const [inputCalories, setInputCalories] = useState("");

  const [showDoctorModal, setShowDoctorModal] = useState(false);

  const handleCalculate = () => {
    // BMI Calculation
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    // Calorie Calculation
    let dailyCals = 0;
    if (goal === "Weight Loss") dailyCals = weight * 22;
    else if (goal === "Weight Gain") dailyCals = weight * 30;
    else dailyCals = weight * 26;
    setCalories(Math.round(dailyCals));

    // Meal Logic
    let mealData = [];
    if (goal === "Weight Loss") {
      mealData = [
        { name: "Oatmeal", cal: "250" },
        { name: "Grilled Chicken Salad", cal: "400" },
        { name: "Vegetable Soup", cal: "300" }
      ];
    } else if (goal === "Weight Gain") {
      mealData = [
        { name: "Peanut Butter Toast", cal: "400" },
        { name: "Rice + Chicken", cal: "600" },
        { name: "Pasta", cal: "500" }
      ];
    } else {
      mealData = [
        { name: "Smoothie", cal: "300" },
        { name: "Brown Rice + Veggies", cal: "450" },
        { name: "Soup + Salad", cal: "350" }
      ];
    }
    setMeals(mealData);

    // Weekly Plan Logic
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const breakfast = ["Oats","Smoothie","Egg Toast","Pancakes","Fruit Bowl","Yogurt","Omelette"];
    const lunch = ["Chicken Salad","Brown Rice","Quinoa Bowl","Veg Wrap","Grilled Fish","Rice + Dal","Veg Pasta"];
    const dinner = ["Soup","Grilled Veg","Salad","Chicken Bowl","Veg Curry","Steamed Veg","Light Pasta"];
    
    const weekly = days.map((day, i) => ({
      day, breakfast: breakfast[i], lunch: lunch[i], dinner: dinner[i]
    }));
    setWeeklyPlan(weekly);
  };

  const addCalories = () => {
    setTrackerCalories(prev => prev + Number(inputCalories));
    setInputCalories("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#f2f7f4", minHeight: "100vh" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#2e7d32", fontWeight: "bold", fontSize: "18px" }}>← Back to Home</Link>
      </div>

      <h1 style={{ color: "#2e7d32", textAlign: "center" }}>SmartCrave Nutrition 🥗</h1>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", marginTop: "30px" }}>
        
        {/* Input Card */}
        <div style={{ background: "white", padding: "25px", width: "320px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "left" }}>
          <h2 style={{ textAlign: "center" }}>User Health Profile</h2>
          
          <label>Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170" style={inputStyle} />
          
          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" style={inputStyle} />
          
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 25" style={inputStyle} />
          
          <label>Fitness Goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} style={inputStyle}>
            <option>Weight Loss</option>
            <option>Weight Gain</option>
            <option>Maintain Health</option>
          </select>
          
          <label>Craving</label>
          <select value={craving} onChange={(e) => setCraving(e.target.value)} style={inputStyle}>
            <option>Healthy</option>
            <option>Sweet</option>
            <option>Spicy</option>
            <option>Fast Food</option>
          </select>

          <button onClick={handleCalculate} style={buttonStyle}>Generate Meal Plan</button>
        </div>

        {/* Results Card */}
        {bmi && (
          <div style={{ background: "white", padding: "25px", width: "320px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h2>Health Analysis</h2>
            <p><strong>BMI:</strong> {bmi}</p>
            <p><strong>Recommended Calories:</strong> {calories} kcal</p>

            <h3>Recommended Meals</h3>
            <table style={tableStyle}>
              <thead><tr><th>Meal</th><th>Food</th><th>Cal</th></tr></thead>
              <tbody>
                {meals.map((m, i) => (
                  <tr key={i}><td>Meal {i+1}</td><td>{m.name}</td><td>{m.cal}</td></tr>
                ))}
              </tbody>
            </table>
            
            {/* Doctor Consult Button */}
            <button 
              onClick={() => setShowDoctorModal(true)}
              style={{ ...buttonStyle, background: "#ea580c", marginTop: "20px" }}
            >
              👨‍⚕️ Consult Nutritionist
            </button>
          </div>
        )}
      </div>

      {/* Weekly Planner */}
      {weeklyPlan.length > 0 && (
        <div style={{ marginTop: "40px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <h2 style={{ textAlign: "center" }}>Weekly Meal Planner</h2>
          <table style={{...tableStyle, width: "90%", margin: "20px auto"}}>
            <thead><tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th></tr></thead>
            <tbody>
              {weeklyPlan.map((plan, i) => (
                <tr key={i}>
                  <td>{plan.day}</td>
                  <td>{plan.breakfast}</td>
                  <td>{plan.lunch}</td>
                  <td>{plan.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Calorie Tracker */}
      <div style={{ marginTop: "40px", background: "white", padding: "25px", width: "320px", margin: "40px auto", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <h2>Calorie Tracker</h2>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <input 
            type="number" 
            value={inputCalories} 
            onChange={(e) => setInputCalories(e.target.value)} 
            placeholder="Enter calories" 
            style={inputStyle} 
          />
          <button onClick={addCalories} style={{...buttonStyle, width: "auto"}}>Add</button>
        </div>
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>Total Calories: {trackerCalories}</p>
      </div>

      {/* Doctor Modal */}
      {showDoctorModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "12px", width: "400px", textAlign: "center" }}>
            <h2 style={{ color: "#ea580c" }}>Premium Consultation</h2>
            <p>Get a personalized plan from a certified Nutritionist.</p>
            <ul style={{ textAlign: "left", lineHeight: "1.6" }}>
              <li>✅ 1-on-1 Video Call</li>
              <li>✅ Custom Diet Charts</li>
              <li>✅ Weekly Follow-ups</li>
            </ul>
            <h3 style={{ color: "#2e7d32" }}>$29.99 / month</h3>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
              <button onClick={() => setShowDoctorModal(false)} style={{...buttonStyle, background: "#ccc", color: "#333"}}>Cancel</button>
              <button onClick={() => alert("Redirecting to Payment Gateway...")} style={buttonStyle}>Subscribe Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Styles
const inputStyle = { width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" };
const buttonStyle = { width: "100%", padding: "12px", background: "#2e7d32", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "15px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "10px" };

export default DietPlan;
