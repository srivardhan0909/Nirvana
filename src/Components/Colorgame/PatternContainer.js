// PatternContainer.js
import React from 'react';

const PatternContainer = ({ id, pattern }) => (
  <div id={id} className="pattern-container">
    {pattern.map((color, index) => (
      <div key={index} style={{ backgroundColor: color }}></div>
    ))}
  </div>
);

export default PatternContainer;
