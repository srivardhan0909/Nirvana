import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('sign-in');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'sign-in' ? 'sign-up' : 'sign-in'));
  };

  const handleSignInClick = () => {
    navigate('/Login');
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "grid",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1>Success!</h1>
      <p style={{ marginBottom: "20px" }}>You created your profile successfully.</p>
      <button className="btn " onClick={handleSignInClick} style={{ marginLeft: "70px"}} id="sign-in-btn">
        Login
      </button>
    </div>
  );
};

export default SuccessPage;
