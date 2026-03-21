import React, { useState } from "react";
import { Link } from "react-router-dom";

const DietPlan = () => {
  // User Inputs
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("loss");

  // Results State
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);
  const [meals, setMeals] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [isCalculated, setIsCalculated] = useState(false);

  // Subscription State
  const [showSubModal, setShowSubModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Indian Food Database
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

  const getRandomMeal = (mealType, calorieType) => {
    const options = foodDatabase[mealType].filter(f => f.type === calorieType || f.type === "med");
    if(options.length === 0) return foodDatabase[mealType][0];
    return options[Math.floor(Math.random() * options.length)];
  };

  const calculateDiet = () => {
    // 1. BMR & TDEE
    let bmrValue = 10 * weight + 6.25 * height - 5 * age;
    bmrValue += (gender === "male" ? 5 : -161);
    setBmr(Math.round(bmrValue));

    const tdeeValue = bmrValue * parseFloat(activity);
    setTdee(Math.round(tdeeValue));

    let target = tdeeValue;
    if (goal === "loss") target -= 500;
    if (goal === "gain") target += 500;
    setTargetCalories(Math.round(target));

    setMacros({
      protein: Math.round((target * 0.30) / 4),
      carbs: Math.round((target * 0.40) / 4),
      fats: Math.round((target * 0.30) / 9)
    });

    // Determine Calorie Type for food selection
    const targetPerMeal = target / 3;
    let mealType = "med";
    if (targetPerMeal < 300) mealType = "low";
    if (targetPerMeal > 500) mealType = "high";

    // Generate 1 Day Plan
    const dayMeals = [
      { time: "Breakfast", ...getRandomMeal("breakfast", mealType) },
      { time: "Lunch", ...getRandomMeal("lunch", mealType) },
      { time: "Dinner", ...getRandomMeal("dinner", mealType) }
    ];
    setMeals(dayMeals);

    // Generate 7 Day Plan
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const week = days.map(day => ({
      day,
      ...getRandomMeal("breakfast", mealType),
      ...getRandomMeal("lunch", mealType),
      ...getRandomMeal("dinner", mealType)
    }));
    setWeeklyPlan(week);

    setIsCalculated(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowSubModal(false);
    setShowPayment(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setShowPayment(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  const plans = [
    { name: "Basic", price: "Free", features: ["Basic Calculator", "Generic Suggestions"], color: "#10B981" },
    { name: "Gold", price: "₹299/mo", features: ["Macro Breakdown", "Weekly Menu", "Email Support"], color: "#ea580c" },
    { name: "Premium", price: "₹999/mo", features: ["Nutritionist Call", "Grocery List", "24/7 Support"], color: "#8b5cf6" }
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#f0fdf4", minHeight: "100vh" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#166534", fontWeight: "bold", fontSize: "18px" }}>← Back to Home</Link>
      </div>

      <h1 style={{ textAlign: "center", color: "#14532d" }}>SmartCrave AI Nutritionist 🥗</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", marginTop: "30px" }}>
        
        {/* INPUT CARD */}
        <div style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", width: "320px" }}>
          <h3 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>Your Profile</h3>
          
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} style={inputStyle}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>Age</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" style={inputStyle} />
          <label>Height (cm)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" style={inputStyle} />
          <label>Weight (kg)</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" style={inputStyle} />
          <label>Activity</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)} style={inputStyle}>
            <option value="1.2">Sedentary</option>
            <option value="1.55">Moderate</option>
            <option value="1.725">Very Active</option>
          </select>
          <label>Goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} style={inputStyle}>
            <option value="loss">Weight Loss</option>
            <option value="maintain">Maintain</option>
            <option value="gain">Muscle Gain</option>
          </select>
          <button onClick={calculateDiet} style={buttonStyle}>Generate Plan</button>
        </div>

        {/* RESULTS SECTION */}
        {isCalculated && (
          <div style={{ flex: 1, minWidth: "300px", maxWidth: "700px" }}>
            {/* Analysis Card */}
            <div style={{ background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
              <h3 style={{ color: "#ea580c", margin: "0 0 15px 0" }}>Analysis</h3>
              <div style={{ display: "flex", gap: "15px", justifyContent: "space-around" }}>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px" }}>BMR</div><strong>{bmr}</strong></div>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px" }}>TDEE</div><strong>{tdee}</strong></div>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px" }}>Target</div><strong style={{ color: "#ea580c" }}>{targetCalories}</strong></div>
              </div>
              <p style={{ fontSize: "13px", marginTop: "10px", textAlign: "center" }}>Protein: {macros.protein}g | Carbs: {macros.carbs}g | Fats: {macros.fats}g</p>
            </div>

            {/* Today's Meals */}
            <div style={{ background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
              <h3>Today's Menu</h3>
              {meals.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee" }}>
                  <span><strong>{m.time}:</strong> {m.name}</span>
                  <span>{m.cal} kcal</span>
                </div>
              ))}
            </div>

            {/* Weekly Table */}
            <div style={{ background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflowX: "auto" }}>
              <h3>7-Day Meal Plan</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px", minWidth: "500px" }}>
                <thead>
                  <tr style={{ background: "#f0fdf4", textAlign: "left" }}>
                    <th style={thStyle}>Day</th>
                    <th style={thStyle}>Breakfast</th>
                    <th style={thStyle}>Lunch</th>
                    <th style={thStyle}>Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyPlan.map((row, i) => (
                    <tr key={i}>
                      <td style={tdStyle}><strong>{row.day}</strong></td>
                      <td style={tdStyle}>{row.name}<br/><span style={{fontSize:"11px", color:"#888"}}>{row.cal} kcal</span></td>
                      <td style={tdStyle}>{row.name /* Reusing logic for demo, in real app distinct meals */} <br/><span style={{fontSize:"11px", color:"#888"}}>{row.cal*1.2} kcal</span></td>
                      <td style={tdStyle}>{row.name} <br/><span style={{fontSize:"11px", color:"#888"}}>{row.cal*0.8} kcal</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => setShowSubModal(true)} style={subBtnStyle}>👨‍⚕️ Get Premium Plan</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SUBSCRIPTION MODAL */}
      {showSubModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button onClick={() => setShowSubModal(false)} style={closeBtnStyle}>×</button>
            <h2 style={{ textAlign: "center" }}>Upgrade Your Health</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginTop: "20px" }}>
              {plans.map((p, i) => (
                <div key={i} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", textAlign: "center", cursor: "pointer", background: "white" }} onClick={() => handlePlanSelect(p)}>
                  <h3 style={{ color: p.color }}>{p.name}</h3>
                  <div style={{ fontSize: "24px", fontWeight: "bold", margin: "10px 0" }}>{p.price}</div>
                  <ul style={{ listStyle: "none", padding: 0, textAlign: "left", fontSize: "13px", lineHeight: "1.5" }}>
                    {p.features.map((f, j) => <li key={j}>✓ {f}</li>)}
                  </ul>
                  <button style={{ width: "100%", marginTop: "10px", padding: "8px", background: p.color, color: "white", border: "none", borderRadius: "5px" }}>Select</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT SIMULATION */}
      {showPayment && (
        <div style={modalOverlayStyle}>
          <div style={{...modalContentStyle, maxWidth: "400px" }}>
            <h3 style={{ margin: "0 0 20px 0" }}>Secure Payment</h3>
            <p>Paying for <strong>{selectedPlan?.name}</strong> ({selectedPlan?.price})</p>
            <form onSubmit={handlePayment}>
              <label>Card Number</label>
              <input required type="text" placeholder="0000 0000 0000 0000" style={inputStyle} />
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label>Expiry</label>
                  <input required type="text" placeholder="MM/YY" style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label>CVV</label>
                  <input required type="text" placeholder="123" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button type="button" onClick={() => setShowPayment(false)} style={{ ...buttonStyle, background: "#ccc", color: "#333" }}>Cancel</button>
                <button type="submit" style={buttonStyle}>Pay Now</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {paymentSuccess && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "50px" }}>🎉</div>
            <h2 style={{ color: "#10B981" }}>Payment Successful!</h2>
            <p>Welcome to the {selectedPlan?.name} Plan.</p>
            <button onClick={() => setPaymentSuccess(false)} style={buttonStyle}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

// Styles
const inputStyle = { width: "100%", padding: "10px", marginTop: "5px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" };
const buttonStyle = { padding: "10px 20px", background: "#10B981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" };
const subBtnStyle = { padding: "12px 25px", background: "#8b5cf6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" };
const thStyle = { padding: "10px", borderBottom: "2px solid #ddd", color: "#333" };
const tdStyle = { padding: "10px", borderBottom: "1px solid #eee", fontSize: "14px" };
const modalOverlayStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 };
const modalContentStyle = { background: "white", padding: "30px", borderRadius: "15px", width: "90%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", position: "relative" };
const closeBtnStyle = { position: "absolute", top: "15px", right: "20px", background: "none", border: "none", fontSize: "24px", cursor: "pointer" };

export default DietPlan;
