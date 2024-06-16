import React, { useEffect, useState } from 'react';
import './BreatheBubble.css';

function BreatheBubble({ isActive }) {
  const [isBreathingIn, setIsBreathingIn] = useState(true);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setIsBreathingIn(prev => !prev);
        const utterance = new SpeechSynthesisUtterance(isBreathingIn ? "Breathe out" : "Breathe in");
        speechSynthesis.speak(utterance);
      }, 5000); // 5 seconds for each phase
    }

    return () => clearInterval(interval);
  }, [isActive, isBreathingIn]);

  return (
    <div className="breathe-bubble-container">
      <div className={`breathe-bubble ${isBreathingIn ? 'breathe-in' : 'breathe-out'}`}>
        <div className="breathe-bubble-circle"></div>
        <div className="breathe-bubble-text">{isBreathingIn ? 'Breathe In' : 'Breathe Out'}</div>
      </div>
    </div>
  );
}

export default BreatheBubble;
