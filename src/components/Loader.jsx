import React, { useState, useEffect } from 'react';
import './Loader.css';

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading time or wait for actual resources to load
    const loadingTimer = setTimeout(() => {
      setFadeOut(true);
      
      // Remove loader from DOM after animation completes
      const removeTimer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // This should match the CSS transition duration
      
      return () => clearTimeout(removeTimer);
    }, 2500); // Adjust time as needed
    
    return () => clearTimeout(loadingTimer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-wrapper">
        <div className="loader">
          <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
            <defs className="s-xJBuHA073rTt" xmlns="http://www.w3.org/2000/svg">
              <linearGradient className="s-xJBuHA073rTt" gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="b">
                <stop className="s-xJBuHA073rTt" stopColor="#FFFFFF" offset="0"></stop>
                <stop className="s-xJBuHA073rTt" stopColor="#FFFFFF" offset="1"></stop>
              </linearGradient>
              <linearGradient className="s-xJBuHA073rTt" gradientUnits="userSpaceOnUse" y2="0" x2="0" y1="64" x1="0" id="c">
                <stop className="s-xJBuHA073rTt" stopColor="#FFFFFF" offset="0"></stop>
                <stop className="s-xJBuHA073rTt" stopColor="#FFFFFF" offset="1"></stop>
                <animateTransform repeatCount="indefinite" keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1" keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1" dur="8s" values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32" type="rotate" attributeName="gradientTransform"></animateTransform>
              </linearGradient>
              <linearGradient className="s-xJBuHA073rTt" gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="d">
                <stop className="s-xJBuHA073rTt" stopColor="#FFFFFF" offset="0"></stop>
                <stop className="s-xJBuHA073rTt" stopColor="#FFFFFF" offset="1"></stop>
              </linearGradient>
              
              {/* Radial gradient for glow effect */}
              <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
          </svg>
          
          {/* Letter M */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" className="inline-block">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#b)" d="M 10,60 V 4 h 8 L 32,36 46,4 h 8 V 60 H 46 V 20 L 32,52 18,20 v 40 z" className="dash" id="m" pathLength="360"></path>
          </svg>
          
          {/* Letter I */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{"--rotation-duration":"0ms", "--rotation-direction":"normal"}} viewBox="0 0 64 64" height="64" width="64" className="inline-block">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#c)" d="M 24,4 H 40 V 60 H 24 Z" className="dash" id="i" pathLength="360"></path>
          </svg>
          
          {/* Letter T */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" className="inline-block">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#d)" d="M 10,4 H 54 V 16 H 40 V 60 H 24 V 16 H 10 Z" className="dash" id="t" pathLength="360"></path>
          </svg>
          
          {/* Letter E */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{"--rotation-duration":"0ms", "--rotation-direction":"normal"}} viewBox="0 0 64 64" height="64" width="64" className="inline-block">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#b)" d="M 10,4 H 54 V 16 H 24 V 26 H 48 V 38 H 24 V 48 H 54 V 60 H 10 Z" className="dash" id="e" pathLength="360"></path>
          </svg>
        </div>
        
        <div className="loader-subtitle">Sentia 2025</div>
      </div>
    </div>
  );
}

export default Loader; 