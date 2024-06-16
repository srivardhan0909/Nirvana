// ColorOption.js
import React from 'react';

const ColorOption = ({ color, onClick }) => (
  <div
    style={{ backgroundColor: color }}
    onClick={onClick}
    className="color-option"
  ></div>
);

export default ColorOption;
