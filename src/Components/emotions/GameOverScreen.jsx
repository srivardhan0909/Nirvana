import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router'; // Import useNavigate
import './styles.css';

const GameOverScreen = ({  score, TotalQuestions, correct, wrong, onRestart }) => {
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const handleRestart = () => {
    onRestart(); // Call the provided onRestart function
    navigate('/EmotionGame'); // Navigate to the root route or the desired route
  };

  return (
    <div className='gbd'>
    <div className="game-over-container">
      <h1>Game Over</h1>
      <p>Your Score: {score}</p>
      <p>TotalQuestions: {TotalQuestions}</p>
      <p>Correct : {correct}</p>
      <p>Incorrect : {wrong}</p>
      <button onClick={handleRestart}>Restart</button>
    </div>
    </div>
  );
};

GameOverScreen.propTypes = {
  score: PropTypes.number.isRequired,
  correctClicks: PropTypes.number.isRequired,
  incorrectClicks: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default GameOverScreen;
