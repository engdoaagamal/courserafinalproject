import React from 'react';
import './App.css';

function App() {
    const handleGetStarted = () => {
        console.log("Navigating to product list...");
    };

    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1 className="company-name">Paradise Nursery</h1>
                <p className="tagline">Where Greenery Meets Serenity. Find your perfect indoor and outdoor plants here.</p>
                <button className="get-started-btn" onClick={handleGetStarted}>
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default App;
