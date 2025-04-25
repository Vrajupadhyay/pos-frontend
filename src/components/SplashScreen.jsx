import React, { useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onLoad }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onLoad(); // Trigger the onLoad function to hide splash and show main app
        }, 3000); // 3 seconds splash screen timeout

        return () => clearTimeout(timer); // Clear timer on component unmount
    }, [onLoad]);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                <div className="logo-container">
                    <h1 className="logo">PWA</h1>
                </div>
                <div className="loading-text">Loading...</div>
            </div>
        </div>
    );
};

export default SplashScreen;
