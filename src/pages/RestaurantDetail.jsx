import React from 'react';
import { Link } from 'react-router-dom';

export default function RestaurantDetail() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Spice Route 🍛</h1>
      <img 
        src="https://images.unsplash.com/photo-1601050690597-9c3043ec4d8c" 
        alt="Spice Route" 
        style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }}
      />
      <p>Welcome to Spice Route! Enjoy authentic Indian delicacies and fusion dishes.</p>
      <h3>Menu Highlights:</h3>
      <ul>
        <li>Butter Chicken - ₹350</li>
        <li>Paneer Tikka - ₹280</li>
        <li>Hyderabadi Biryani - ₹400</li>
      </ul>

      <Link to="/cart" style={{
        display: 'inline-block',
        marginTop: '15px',
        background: '#4f46e5',
        color: '#fff',
        padding: '10px 16px',
        borderRadius: '8px',
        textDecoration: 'none'
      }}>Add to Cart</Link>
    </div>
  );
}
