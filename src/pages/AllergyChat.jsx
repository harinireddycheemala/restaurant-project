import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const AllergyChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your SmartCrave Assistant. 🤖", sender: "bot" },
    { id: 2, text: "Do you have any food allergies we should know about?", sender: "bot", options: ["Yes, I do", "No, I don't"] }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionClick = (option) => {
    // 1. Add User Message
    const userMsg = { id: Date.now(), text: option, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    // 2. Bot "Typing" simulation
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let botResponse = [];

      if (option === "Yes, I do") {
        botResponse = [
          { 
            id: Date.now() + 1, 
            text: "Please select the allergens from the list below:", 
            sender: "bot", 
            isMultiSelect: true, // Special flag for the allergen list
            options: ["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs"],
            selected: [] // Track selected items
          }
        ];
      } else if (option === "No, I don't") {
        botResponse = [
          { 
            id: Date.now() + 1, 
            text: "Great! How can I help you today?", 
            sender: "bot", 
            options: ["View Menu", "Home", "Talk to Support"] 
          }
        ];
      } else if (option === "View Menu") {
         botResponse = [{ id: Date.now()+1, text: "Taking you to the menu...", sender: "bot", action: "/restaurant" }];
      } else if (option === "Home") {
         botResponse = [{ id: Date.now()+1, text: "Going back home...", sender: "bot", action: "/" }];
      } else if (option === "Done") {
        // If user clicks "Done" after selecting allergens
         botResponse = [{ id: Date.now()+1, text: "Thanks! Your profile is saved. 🛡️", sender: "bot", action: "/restaurant" }];
      }

      setMessages(prev => [...prev, ...botResponse]);
    }, 1000);
  };

  const toggleAllergen = (msgIndex, allergen) => {
    const updatedMessages = [...messages];
    const msg = updatedMessages[msgIndex];
    
    if (msg.selected.includes(allergen)) {
      msg.selected = msg.selected.filter(item => item !== allergen);
    } else {
      msg.selected = [...msg.selected, allergen];
    }
    setMessages(updatedMessages);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#f5f5f5", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#ea580c", color: "white", padding: "15px", display: "flex", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "15px", fontSize: "20px" }}>←</Link>
        <div>
          <h3 style={{ margin: 0, fontSize: "16px" }}>SmartCrave Support</h3>
          <span style={{ fontSize: "12px", opacity: 0.8 }}>Online</span>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "15px" }}>
        {messages.map((msg, index) => (
          <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.sender === "user" ? "flex-end" : "flex-start" }}>
            
            {/* Message Bubble */}
            <div style={{
              background: msg.sender === "user" ? "#ea580c" : "white",
              color: msg.sender === "user" ? "white" : "#333",
              padding: "12px 16px",
              borderRadius: "12px",
              maxWidth: "80%",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              borderBottomRightRadius: msg.sender === "user" ? "0" : "12px",
              borderBottomLeftRadius: msg.sender === "user" ? "12px" : "0"
            }}>
              {msg.text}
              {msg.action && (
                 <div style={{ marginTop: "10px" }}>
                   <Link to={msg.action} style={{ color: msg.sender === "user" ? "white" : "#ea580c", fontWeight: "bold", textDecoration: "underline" }}>Click here</Link>
                 </div>
              )}
            </div>

            {/* Interactive Options (Chips) */}
            {msg.options && !msg.isMultiSelect && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "5px", marginLeft: msg.sender === "user" ? "0" : "0" }}>
                {msg.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    style={{
                      padding: "8px 16px",
                      border: "1px solid #ddd",
                      background: "white",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "13px",
                      transition: "0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#f0f0f0"}
                    onMouseLeave={(e) => e.target.style.background = "white"}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Allergen Multi-Select List */}
            {msg.isMultiSelect && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {msg.options.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleAllergen(index, item)}
                    style={{
                      padding: "8px 16px",
                      border: msg.selected.includes(item) ? "2px solid #ea580c" : "1px solid #ccc",
                      background: msg.selected.includes(item) ? "#fff7ed" : "white",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "13px",
                      color: msg.selected.includes(item) ? "#ea580c" : "#333"
                    }}
                  >
                    {msg.selected.includes(item) ? "✓ " : ""}{item}
                  </button>
                ))}
                {msg.selected.length > 0 && (
                  <button
                    onClick={() => handleOptionClick("Done")}
                    style={{
                      padding: "8px 16px",
                      background: "#10B981",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "13px",
                      marginLeft: "10px"
                    }}
                  >
                    Done ({msg.selected.length})
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ background: "#e0e0e0", padding: "10px 15px", borderRadius: "12px", alignSelf: "flex-start", fontSize: "12px", color: "#555" }}>
            Typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default AllergyChat;
