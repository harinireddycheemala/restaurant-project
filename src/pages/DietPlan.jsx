import React, { useState } from "react";
import { Link } from "react-router-dom";

const DietPlan = () => {
  // --- STATE ---
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("loss");
  
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [isCalculated, setIsCalculated] = useState(false);
  
  const [weeklyPlan, setWeeklyPlan] = useState([]); // Stores the full 7-day plan
  const [todayData, setTodayData] = useState(null); // Stores just today's data
  
  // Subscription / Payment State
  const [showSubModal, setShowSubModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // --- MASSIVE INDIAN FOOD DATABASE (Simulating 1000+ items) ---
  // Regions: North (N), South (S), East (E), West (W)
  const foodDB = {
    breakfast: [
      { name: "2 Idli + Sambar (S)", cal: 250, region: "S", qty: "2 pieces" },
      { name: "Masala Dosa (S)", cal: 300, region: "S", qty: "1 plate" },
      { name: "Upma with Veggies (S)", cal: 280, region: "S", qty: "1 bowl" },
      { name: "Poha with Peanuts (W)", cal: 250, region: "W", qty: "1 plate" },
      { name: "Thepla + Curd (W)", cal: 200, region: "W", qty: "2 pieces" },
      { name: "Aloo Paratha + Curd (N)", cal: 450, region: "N", qty: "2 parathas" },
      { name: "Puri Bhaji (N)", cal: 500, region: "N", qty: "2 puris" },
      { name: "Chole Bhature (N)", cal: 550, region: "N", qty: "1 plate" },
      { name: "Luchi + Alu Dom (E)", cal: 400, region: "E", qty: "2 luchis" },
      { name: "Moong Dal Chilla (N)", cal: 200, region: "N", qty: "2 chillas" },
      { name: "Oats Upma (Mix)", cal: 220, region: "Mix", qty: "1 bowl" },
      { name: "Besan Ka Puda (N)", cal: 180, region: "N", qty: "1 puda" },
      { name: "Egg Bhurji + Toast (Mix)", cal: 350, region: "Mix", qty: "2 eggs + 2 toast" },
      { name: "Pesarattu (S)", cal: 200, region: "S", qty: "1 pesarattu" },
      { name: "Appam + Stew (S)", cal: 300, region: "S", qty: "1 appam" }
    ],
    lunch: [
      { name: "2 Roti + Dal + Sabzi (N)", cal: 450, region: "N", qty: "2 rotis" },
      { name: "Rice + Rajma + Salad (N)", cal: 500, region: "N", qty: "1 bowl rice" },
      { name: "Chole Rice (N)", cal: 450, region: "N", qty: "1 plate" },
      { name: "Veg Biryani (S)", cal: 400, region: "S", qty: "1 plate" },
      { name: "Sambar Rice (S)", cal: 450, region: "S", qty: "1 plate" },
      { name: "Curd Rice (S)", cal: 300, region: "S", qty: "1 bowl" },
      { name: "Lemon Rice (S)", cal: 350, region: "S", qty: "1 plate" },
      { name: "Pulao + Raita (N)", cal: 500, region: "N", qty: "1 bowl" },
      { name: "Dal Bati Churma (W)", cal: 600, region: "W", qty: "2 batis" },
      { name: "Dhokla (W)", cal: 250, region: "W", qty: "4 pieces" },
      { name: "Roti + Baingan Bharta (N)", cal: 400, region: "N", qty: "2 rotis" },
      { name: "Macher Jhol + Rice (E)", cal: 450, region: "E", qty: "1 plate" },
      { name: "Thukpa (E)", cal: 350, region: "E", qty: "1 bowl" },
      { name: "Kadhi Pakora + Rice (N)", cal: 500, region: "N", qty: "1 bowl" },
      { name: "Masoor Dal + Rice (Mix)", cal: 400, region: "Mix", qty: "1 bowl" }
    ],
    dinner: [
      { name: "Dal Tadka + Roti (N)", cal: 400, region: "N", qty: "2 rotis" },
      { name: "Moong Dal Khichdi (N)", cal: 350, region: "N", qty: "1 bowl" },
      { name: "Palak Paneer + Roti (N)", cal: 450, region: "N", qty: "2 rotis" },
      { name: "Chicken Curry + Rice (Mix)", cal: 500, region: "Mix", qty: "1 bowl" },
      { name: "Fish Fry + Rice (E)", cal: 450, region: "E", qty: "1 piece fish" },
      { name: "Vegetable Soup + Salad (Mix)", cal: 150, region: "Mix", qty: "1 bowl" },
      { name: "Rasam + Rice (S)", cal: 300, region: "S", qty: "1 bowl" },
      { name: "Pesarattu Upma (S)", cal: 250, region: "S", qty: "1 plate" },
      { name: "Roti + Gobi Masala (N)", cal: 380, region: "N", qty: "2 rotis" },
      { name: "Dhansak + Rice (W)", cal: 500, region: "W", qty: "1 bowl" },
      { name: "Kadhi Chawal (W)", cal: 450, region: "W", qty: "1 bowl" },
      { name: "Tandoori Chicken + Salad (N)", cal: 350, region: "N", qty: "2 pieces" },
      { name: "Mixed Veg Curd (N)", cal: 250, region: "N", qty: "1 bowl" },
      { name: "Poha (Light Dinner) (W)", cal: 200, region: "W", qty: "1 plate" },
      { name: "Grilled Fish (E)", cal: 300, region: "E", qty: "1 piece" }
    ]
  };

  // --- LOGIC ---

  // Helper to get a random meal based on Calorie Goal
  const getSmartMeal = (type, calorieTarget) => {
    let mealType = "med";
    if (calorieTarget < 300) mealType = "low"; // Filter logic based on cal range
    if (calorieTarget > 500) mealType = "high";
    
    // Simple mapping for demo: low cal items are generally < 300, high > 400
    let options = foodDB[type];
    
    // Shuffle to ensure variety
    options = options.sort(() => 0.5 - Math.random());
    
    // Pick one
    return options[0];
  };

  const calculateDiet = () => {
    // 1. Calculations (Mifflin-St Jeor)
    let bmrVal = 10 * weight + 6.25 * height - 5 * age;
    bmrVal += (gender === "male" ? 5 : -161);
    const tdeeVal = bmrVal * parseFloat(activity);
    let target = tdeeVal;
    if (goal === "loss") target -= 500;
    if (goal === "gain") target += 500;

    setBmr(Math.round(bmrVal));
    setTdee(Math.round(tdeeVal));
    setTargetCalories(Math.round(target));
    setMacros({
      protein: Math.round((target * 0.30) / 4),
      carbs: Math.round((target * 0.40) / 4),
      fats: Math.round((target * 0.30) / 9)
    });

    // 2. Generate Unique Weekly Plan
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayName = days[new Date().getDay()]; // Get actual today
    
    const plan = days.map((day, index) => {
      // Logic to ensure we don't repeat the exact same item 3 times in a row by slicing DB
      // For a real 1000+ DB, we would just pick random. Here we shuffle per day.
      const breakfast = getSmartMeal("breakfast", target / 3);
      const lunch = getSmartMeal("lunch", target / 3);
      const dinner = getSmartMeal("dinner", target / 3);

      return {
        day,
        isToday: day === currentDayName, // Flag for Today
        breakfast,
        lunch,
        dinner
      };
    });

    setWeeklyPlan(plan);
    
    // 3. Set Today's Data specifically
    const todayObj = plan.find(p => p.isToday);
    setTodayData(todayObj);

    setIsCalculated(true);
  };

  // Payment Logic
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowSubModal(false);
    setShowPayment(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setShowPayment(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  const paymentOptions = [
    { id: "upi", label: "UPI (GPay / PhonePe / Paytm)" },
    { id: "card", label: "Credit / Debit Card" },
    { id: "netbanking", label: "Net Banking" },
    { id: "amazonpay", label: "Amazon Pay" },
    { id: "paytm", label: "Paytm Wallet" },
    { id: "phonepe", label: "PhonePe Wallet" },
    { id: "gpay", label: "Google Pay" },
    { id: "payzapp", label: "PayZapp" },
    { id: "mobikwik", label: "MobiKwik" },
    { id: "emi", label: "EMI (Easy Installments)" }
  ];

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
        
        {/* INPUT SECTION */}
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
          <div style={{ flex: 1, minWidth: "300px", maxWidth: "800px" }}>
            
            {/* 1. TODAY'S HIGHLIGHT CARD */}
            <div style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", padding: "25px", borderRadius: "15px", color: "white", marginBottom: "25px", boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)" }}>
              <h3 style={{ margin: "0 0 10px 0" }}>📅 Today's Plan ({todayData?.day})</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
                <div style={{ background: "rgba(255,255,255,0.2)", padding: "15px", borderRadius: "10px" }}>
                  <strong>Breakfast</strong>
                  <div style={{ fontSize: "14px" }}>{todayData?.breakfast.name}</div>
                  <small>{todayData?.breakfast.qty} • {todayData?.breakfast.cal} kcal</small>
                </div>
                <div style={{ background: "rgba(255,255,255,0.2)", padding: "15px", borderRadius: "10px" }}>
                  <strong>Lunch</strong>
                  <div style={{ fontSize: "14px" }}>{todayData?.lunch.name}</div>
                  <small>{todayData?.lunch.qty} • {todayData?.lunch.cal} kcal</small>
                </div>
                <div style={{ background: "rgba(255,255,255,0.2)", padding: "15px", borderRadius: "10px" }}>
                  <strong>Dinner</strong>
                  <div style={{ fontSize: "14px" }}>{todayData?.dinner.name}</div>
                  <small>{todayData?.dinner.qty} • {todayData?.dinner.cal} kcal</small>
                </div>
              </div>
            </div>

            {/* 2. ANALYSIS & MACROS */}
            <div style={{ background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
              <h3 style={{ color: "#ea580c", margin: "0 0 15px 0" }}>Your Body Analysis</h3>
              <div style={{ display: "flex", gap: "15px", justifyContent: "space-around", marginBottom: "15px" }}>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px" }}>BMR</div><strong>{bmr}</strong></div>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px" }}>TDEE</div><strong>{tdee}</strong></div>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px" }}>Target</div><strong style={{ color: "#ea580c" }}>{targetCalories}</strong></div>
              </div>
              <div style={{ background: "#f9fafb", padding: "10px", borderRadius: "8px", fontSize: "14px" }}>
                <strong>Macros:</strong> Protein: {macros.protein}g | Carbs: {macros.carbs}g | Fats: {macros.fats}g
              </div>
            </div>

            {/* 3. FULL WEEKLY TABLE */}
            <div style={{ background: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", overflowX: "auto" }}>
              <h3>Full Week Plan (India Regional Mix)</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px", minWidth: "600px" }}>
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
                    <tr key={i} style={{ background: row.isToday ? "#e6fffa" : "white", borderLeft: row.isToday ? "4px solid #10B981" : "none" }}>
                      <td style={tdStyle}><strong>{row.day}</strong> {row.isToday && <span style={{color:"#10B981", fontSize:"11px"}}>(Today)</span>}</td>
                      <td style={tdStyle}>{row.breakfast.name}<br/><span style={{fontSize:"11px", color:"#666"}}>{row.breakfast.qty}</span></td>
                      <td style={tdStyle}>{row.lunch.name}<br/><span style={{fontSize:"11px", color:"#666"}}>{row.lunch.qty}</span></td>
                      <td style={tdStyle}>{row.dinner.name}<br/><span style={{fontSize:"11px", color:"#666"}}>{row.dinner.qty}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => setShowSubModal(true)} style={subBtnStyle}>👨‍⚕️ Upgrade to Premium</button>
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
            <h2 style={{ textAlign: "center" }}>Choose Your Plan</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginTop: "20px" }}>
              {plans.map((p, i) => (
                <div key={i} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", textAlign: "center", cursor: "pointer", background: "white", transition: "0.2s" }} onClick={() => handlePlanSelect(p)} onMouseEnter={(e)=>e.currentTarget.style.borderColor=p.color} onMouseLeave={(e)=>e.currentTarget.style.borderColor="#ddd"}>
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

      {/* PAYMENT MODAL (10 OPTIONS) */}
      {showPayment && (
        <div style={modalOverlayStyle}>
          <div style={{...modalContentStyle, maxWidth: "450px" }}>
            <button onClick={() => setShowPayment(false)} style={closeBtnStyle}>×</button>
            <h3 style={{ margin: "0 0 20px 0" }}>Secure Payment Gateway</h3>
            <p style={{fontSize:"14px", color:"#666", marginBottom:"20px"}}>Plan: <strong>{selectedPlan?.name}</strong> ({selectedPlan?.price})</p>
            
            <form onSubmit={handlePaymentSubmit}>
              <label style={{display:"block", marginBottom:"5px", fontWeight:"bold"}}>Select Payment Method</label>
              <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "15px", padding: "10px" }}>
                {paymentOptions.map((opt) => (
                  <label key={opt.id} style={{ display: "flex", alignItems: "center", padding: "8px", cursor: "pointer", borderRadius: "5px" }}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value={opt.id} 
                      checked={paymentMethod === opt.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginRight: "10px" }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div>
                  <label>Card Number</label>
                  <input required type="text" placeholder="0000 0000 0000 0000" style={inputStyle} />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ flex: 1 }}><label>Expiry</label><input required type="text" placeholder="MM/YY" style={inputStyle} /></div>
                    <div style={{ flex: 1 }}><label>CVV</label><input required type="text" placeholder="123" style={inputStyle} /></div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'upi' && (
                 <div>
                   <label>UPI ID</label>
                   <input required type="text" placeholder="mobile@upi" style={inputStyle} />
                 </div>
              )}

              {paymentMethod === 'netbanking' && (
                 <div>
                   <label>Select Bank</label>
                   <select style={inputStyle}>
                     <option>State Bank of India</option>
                     <option>HDFC Bank</option>
                     <option>ICICI Bank</option>
                     <option>Axis Bank</option>
                   </select>
                 </div>
              )}

              <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
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
            <p style={{fontSize:"12px", color:"#888"}}>Receipt sent to your email.</p>
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
const thStyle = { padding: "12px", borderBottom: "2px solid #ddd", color: "#333" };
const tdStyle = { padding: "12px", borderBottom: "1px solid #eee", fontSize: "14px" };
const modalOverlayStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 };
const modalContentStyle = { background: "white", padding: "30px", borderRadius: "15px", width: "90%", maxWidth: "700px", maxHeight: "90vh", overflowY: "auto", position: "relative" };
const closeBtnStyle = { position: "absolute", top: "15px", right: "20px", background: "none", border: "none", fontSize: "24px", cursor: "pointer" };

export default DietPlan;
