export default function AllergyChat() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🤖 Allergy Chat</h1>
      <p>Do you have allergies?</p>
      <button onClick={() => alert("Yes")}>Yes</button>
      <button onClick={() => alert("No")}>No</button>
    </div>
  );
}
