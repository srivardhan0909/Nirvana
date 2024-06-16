// GradioComponent.js
import React from 'react';
import Modal from './Modal';
import './GradioComponent.css';

const GradioComponent = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div id="gradio-container">
        <iframe
          className='ifr'
          title="Gradio Chatbot"
          src="https://a8f4fc2a44d4a7be56.gradio.live/"
        ></iframe>
      </div>
    </Modal>
  );
};

export default GradioComponent;
