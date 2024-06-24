import React from 'react';
import './contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-highlight">
        <h2>Connect with Us</h2>
        <p>I've noticed that you've been going through a tough time lately, and I care about your well-being. It's really important to take care of your mental health, just like your physical health. Talking to a therapist can provide you with the support and tools you need to navigate this challenging period. <em>- <strong>Team Nirvana</strong></em></p>
        <h4 style={{ fontFamily: 'Poppins, sans-serif' ,margin:"20px" }}>Terapist Aditi Santosh Kulkarni</h4>
        <p><strong>Email:</strong> <a href="mailto:aditisk10@gmail.com">aditisk10@gmail.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+919177390913">9930322456</a></p>
      </div>
    </div>
  );
}

export default Contact;
