// AuthForm.js

import React, { useState } from 'react';
import './AuthForm.css';
import SignInForm from './loginForm';
import SignUpForm from './signupForm';
const AuthForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const toggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
  };

  return (
    <div className={`container2 ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container2">
        <div className="signin-signup">
          {isSignUpMode ? <SignUpForm /> : <SignInForm />}
        </div>
      </div>

      <div className="panels-container2">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={toggleMode} id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" onClick={toggleMode} id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;