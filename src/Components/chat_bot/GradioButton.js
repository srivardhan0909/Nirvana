import React, { useState } from 'react';
import GradioComponent from './GradioComponent';
import './GradioButton.css'; // Import the CSS file

const GradioButton = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const handleButtonClick = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <div>
      {isChatbotVisible && <GradioComponent onClose={() => setChatbotVisible(false)} />}
      <button className="round-button" onClick={handleButtonClick}></button>
    </div>
  );
};

export default GradioButton;
