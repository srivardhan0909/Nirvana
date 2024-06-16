import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './questionnaire.css';

const preLoginQuestions = [
  "How often have you been feeling down, depressed, or hopeless?",
  "How often have you been experiencing little interest or pleasure in doing things you typically enjoy?",
  "How often have you been feeling anxious, worried, or on edge?",
  "How often have you been experiencing difficulty sleeping or sleeping too much?",
  "How often have you been experiencing fatigue or low energy levels?"
];

const postLoginQuestions = [
  "How would you rate your overall mood today compared to when you first started using our website?",
  "Have you noticed any improvements in your ability to manage stress since using our website? If so, please describe.",
  "How often have you been practicing the coping strategies or exercises recommended by our website?",
  "How effective do you find the resources and tools provided by our website in helping you manage your mental health?",
  "How often do you participate in any community or support groups offered through our website?",
];

function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(Array(10).fill(1));
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("name") !== null);
  }, []);

  const questions = isLoggedIn ? postLoginQuestions : preLoginQuestions;

  const handleResponseChange = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = parseInt(value, 10);
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const highResponses = responses.filter(response => response <= 3).length;
      if (highResponses > 7) {
        navigate('/contact');
      } else {
        localStorage.setItem("questionnaireCompleted", "true");
        alert('Questionnaire completed. You can now continue using the platform.');
        if (!isLoggedIn) {
          navigate('/Login');
        } else {
          alert('Use our website to clear your anxiety, tension, or depression.');
          navigate('/');
        }
      }
    }
  };

  const getScalePercentage = () => {
    return (responses[currentQuestionIndex] / 5) * 100;
  };

  return (
    <div className="questionnaire-modal">
      <h1>Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        <div className="question">
          <label>{questions[currentQuestionIndex]}</label>
          <div className="options">
            <label>
              <input
                type="radio"
                name="response"
                value={1}
                checked={responses[currentQuestionIndex] === 1}
                onChange={() => handleResponseChange(1)}
              />
              <div>Poor</div>
            </label>
            {[2, 3, 4].map(value => (
              <label key={value}>
                <input
                  type="radio"
                  name="response"
                  value={value}
                  checked={responses[currentQuestionIndex] === value}
                  onChange={() => handleResponseChange(value)}
                />
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="response"
                value={5}
                checked={responses[currentQuestionIndex] === 5}
                onChange={() => handleResponseChange(5)}
              />
              <div>Good</div>
            </label>
          </div>
          <div className="scale-bar">
            <div className="scale-fill" style={{ width: `${getScalePercentage()}%` }}></div>
          </div>
        </div>
        <button type="submit">{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default Questionnaire;
