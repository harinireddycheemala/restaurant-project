import React, { useState } from "react";
import { Link } from "react-router-dom";

const DietPlan = () => {
  // User Inputs
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState(""); // cm
  const [weight, setWeight] = useState(""); // kg
  const [activity, setActivity] = useState("1.2"); // Sedentary default
  const [goal, setGoal] = useState("loss"); // loss, maintain, gain

  // Results State
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);
  const [meals, setMeals] = useState([]);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [isCalculated, setIsCalculated] = useState(false);

  // Subscription State
  const [showSubscription, setShowSubscription] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Indian Food Database (Calorie Approximate)
  const foodDatabase = {
    breakfast: [
      { name: "2 Idli + Sambar", cal: 250, type: "low" },
      { name: "Poha with Peanuts", cal: 300, type: "low" },
      { name: "Upma with Veggies", cal: 280, type: "low" },
      { name: "2 Aloo Paratha + Curd", cal: 450, type: "high" },
      { name: "Masala Oats + Nuts", cal: 350, type: "med" },
      { name: "Besan Chilla", cal: 200, type: "low" }
    ],
    lunch: [
      { name: "2 Roti + Dal + Sabzi", cal: 400, type: "med" },
      { name: "Rice + Rajma + Salad", cal: 450, type: "med" },
      { name: "2 Roti + Paneer Bhurji", cal: 500, type: "high" },
      { name: "Lemon Rice + Curd", cal: 350, type: "low" },
      { name: "Quinoa Salad + Chickpeas", cal: 300, type: "low" }
    ],
    dinner: [
      { name: "Dal Tadka + Rice", cal: 400, type: "med" },
      { name: "Moong Dal Khichdi", cal: 350, type: "low" },
      { name: "Grilled Chicken/Fish + Salad", cal: 350, type: "high" },
      { name: "Palak Paneer + Roti", cal: 450, type: "high" },
      { name: "Vegetable Soup + Sautéed Veggies", cal: 200, type: "low" }
    ]
  };

  const calculateDiet = () => {
    // 1. BMR Calculation (Mifflin-St Jeor Equation)
    let bmrValue = 10 * weight + 6.25 * height - 5 * age;
    bmrValue += (gender === "male" ? 5 : -161);
    setBmr(Math.round(bmrValue));

    // 2. TDEE Calculation (BMR * Activity)
    const tdeeValue = bmrValue * parseFloat(activity);
    setTdee(Math.round(tdeeValue));

    // 3. Target Calories based on Goal
    let target = tdeeValue;
    if (goal === "loss") target -= 500;
    if (goal === "gain") target += 500;
    setTargetCalories(Math.round(target));

    // 4. Macro Split (Standard 40/30/30)
    setMacros({
      protein: Math.round((target * 0.30) / 4), // 1g protein = 4 cal
      carbs: Math.round((target * 0.40) / 4),   // 1g carbs = 4 cal
      fats: Math.round((target * 0.30) / 9)     // 1g fat = 9 cal
    });

    // 5. Generate Meals based on Calorie Goal
    // If target is low, pick 'low' type meals. If high, pick 'high'.
    const targetPerMeal = target / 3;
    let mealType = "med";
    if (targetPerMeal < 300) mealType = "low";
    if (targetPerMeal > 500) mealType = "high";

    const getRandomMeal = (type) => {
      const options = foodDatabase[type].filter(f => f.type === mealType || f.type === "med");
      return options[Math.floor(Math.random() * options.length)];
    };

    const newMeals = [
      { time: "Breakfast (8 AM)", ...getRandomMeal("breakfast") },
      { time: "Lunch (1 PM)", ...getRandomMeal("lunch") },
      { time: "Dinner (8 PM)", ...getRandomMeal("dinner") }
    ];

    setMeals(newMeals);
    setIsCalculated(true);
  };

  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Basic BMR & Calorie Calculator",
        "Generic Meal Suggestions",
        "Simple Calorie Tracker"
      ],
      color: "#10B981",
      btnText: "Current Plan"
    },
    {
      name: "Gold",
      price: "₹299/mo",
      features: [
        "Personalized Macro Breakdown",
        "Detailed Weekly Indian Menu",
        "Water Intake Tracker",
        "Email Support"
      ],
      color: "#ea580c",
      btnText: "Upgrade"
    },
    {
      name: "Premium",
      price: "₹999/mo",
      features: [
        "1-on-1 Nutritionist Video Call",
        "Customized Grocery List",
        "Recipe Modification (Swaps)",
        "Weekly Progress Check-ins",
        "24/7 Chat Support"
      ],
      color: "#8b5cf6",
      btnText: "Subscribe Now"
    }
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#f0fdf4", minHeight: "100vh" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#166534", fontWeight: "bold", fontSize: "18px" }}>← Back to Home</Link>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "#14532d", margin: 0 }}>SmartCrave AI Nutritionist 🥗</h1>
        <p style={{ color: "#4ade80" }}>Scientifically calculated plans for Indian body types</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
        
        {/* INPUT SECTION */}
        <div style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", width: "350px" }}>
          <h3 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>Your Profile</h3>
          
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} style={inputStyle}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Age (Years)</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" style={inputStyle} />

          <label>Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" style={inputStyle} />

          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" style={inputStyle} />

          <label>Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)} style={inputStyle}>
            <option value="1.2">Sedentary (Office Job)</option>
            <option value="1.375">Lightly Active (Exercise 1-3 days)</option>
            <option value="1.55">Moderately Active (Exercise 3-5 days)</option>
            <option value="1.725">Very Active (Exercise 6-7 days)</option>
          </select>

          <label>Goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} style={inputStyle}>
            <option value="loss">Weight Loss</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Muscle Gain</option>
          </select>

          <button onClick={calculateDiet} style={buttonStyle}>Generate AI Plan</button>
        </div>

        {/* RESULTS SECTION */}
        {isCalculated && (
          <div style={{ flex: 1, minWidth: "300px", maxWidth: "600px" }}>
            <div style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
              <h3 style={{ color: "#ea580c", margin: "0 0 15px 0" }}>Your Analysis</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div style={{ background: "#f0fdf4", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "12px", color: "#666" }}>BMR (Metabolism)</div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#166534" }}>{bmr} kcal</div>
                </div>
                <div style={{ background: "#fff7ed", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: "12px", color: "#666" }}>Daily Target</div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#ea580c" }}>{targetCalories} kcal</div>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h4>Recommended Macros (Daily)</h4>
                <p style={{ fontSize: "14px", color: "#555" }}>Protein: <strong>{macros.protein}g</strong> | Carbs: <strong>{macros.carbs}g</strong> | Fats: <strong>{macros.fats}g</strong></p>
              </div>
            </div>

            <div style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin: "0 0 15px 0" }}>Today's Indian Meal Plan</h3>
              {meals.map((meal, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#333" }}>{meal.time}</div>
                    <div style={{ fontSize: "14px" }}>{meal.name}</div>
                  </div>
                  <div style={{ background: "#eee", padding: "5px 10px", borderRadius: "15px", fontSize: "12px", fontWeight: "bold" }}>{meal.cal} kcal</div>
                </div>
              ))}
              
              <button 
                onClick={() => setShowSubscription(true)}
                style={{ width: "100%", marginTop: "20px", padding: "12px", background: "#8b5cf6", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
              >
                👨‍⚕️ Consult Nutritionist (Premium)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SUBSCRIPTION MODAL */}
      {showSubscription && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
          <div style={{ background: "white", padding: "40px", borderRadius: "20px", width: "90%", maxWidth: "900px", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <button onClick={() => setShowSubscription(false)} style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>×</button>
            
            <h2 style={{ textAlign: "center", color: "#333" }}>Choose Your Plan</h2>
            <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>Unlock your full health potential</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              {plans.map((plan, idx) => (
                <div key={idx} style={{ 
                  border: plan.name === "Premium" ? "2px solid #8b5cf6" : "1px solid #eee", 
                  borderRadius: "15px", 
                  padding: "25px", 
                  textAlign: "center", 
                  background: plan.name === "Premium" ? "#f5f3ff" : "white",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <h3 style={{ color: plan.color }}>{plan.name}</h3>
                  <div style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>{plan.price}</div>
                  <ul style={{ listStyle: "none", padding: 0, textAlign: "left", marginBottom: "20px", lineHeight: "1.8" }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ fontSize: "14px" }}>✓ {f}</li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => alert(`Proceeding to payment gateway for ${plan.name} plan...`)}
                    disabled={plan.name === "Basic"}
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      background: plan.name === "Basic" ? "#ccc" : plan.color, 
                      color: "white", 
                      border: "none", 
                      borderRadius: "8px", 
                      cursor: plan.name === "Basic" ? "not-allowed" : "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    {plan.btnText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = { width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" };
const buttonStyle = { width: "100%", padding: "12px", background: "#10B981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", transition: "0.3s" };

export default DietPlan;
