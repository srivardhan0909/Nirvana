import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './questionnaire.css';

const preLoginQuestions = [
  "How would you rate your overall mood, specifically in terms of feeling down, depressed, or hopeless?",
  "How would you rate your level of interest or pleasure in activities you typically enjoy?",
  "How would you rate your feelings of anxiety, worry, or being on edge?",
  "How would you rate your sleep quality, in terms of experiencing difficulty sleeping or sleeping too much?",
];

const postLoginQuestions = [
  "How would you rate your overall mood today compared to when you first started using our website?",
  "Have you noticed any improvements in your ability to manage stress since using our website? If so, please describe.",
  "How often have you been practicing the coping strategies or exercises recommended by our website?",
  "How effective do you find the resources and tools provided by our website in helping you manage your mental health?",
  "How would you rate your memory and cognitive functions since using our website?",
  "How happy do you feel overall compared to when you first started using our website?",
  "How would you rate your ability to handle depressive symptoms since using our website?",
];

function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(Array(7).fill(1)); // Adjusted array length
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
      const poorResponses = responses.filter(response => response <= 3).length;
      if (poorResponses > 2 && !isLoggedIn) { // Adjusted condition
        navigate('/contact');
      } else {
        localStorage.setItem("questionnaireCompleted", "true");
        alert('Questionnaire completed. You can now continue using the platform.');
        if (!isLoggedIn) {
          navigate('/Login');
        } else {
          const scores = calculateScores(responses);
          localStorage.setItem("postLoginScores", JSON.stringify(scores));
          navigate('/');
        }
      }
    }
  };

  const calculateScores = (responses) => {
    return {
      normal: responses[0] > 3 ? 'high' : 'avg',
      depression: responses[1] > 3 ? 'low' : 'high',
      anxiety: responses[2] > 3 ? 'low' : 'high',
      relax: responses[3] > 3 ? 'low' : 'high',
      memory: responses[4] > 3 ? 'high' : 'avg',
      happy: responses[5] > 3 ? 'high' : 'avg',
      depressiveSymptoms: responses[6] > 3 ? 'low' : 'high',
    };
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
