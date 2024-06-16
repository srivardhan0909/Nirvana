// ColourGame.js
import React, { useState, useEffect } from 'react';
import PatternContainer from './PatternContainer';
import ColorOption from './ColorOption';
import './style.css';
import heartImage from '../Game/assests/heart.png'; 
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ColourGame = () => {
  const [referencePattern, setReferencePattern] = useState([]);
  const [playerPattern, setPlayerPattern] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [hearts, setHearts] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [score, setscore] = useState(0);
  const [showReferencePattern, setShowReferencePattern] = useState(true);
  const colors = ['red', 'blue', 'green', 'yellow'];
  const [trecommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (showReferencePattern) {
      generatePattern();
      const patternTimeout = setTimeout(() => {
        setShowReferencePattern(false);
      }, 3000);

      return () => {
        clearTimeout(patternTimeout);
      };
    }
  }, [showReferencePattern]);

  useEffect(() => {
    if (!showReferencePattern) {
      setPlayerPattern([]);
      setFeedback('');
    }
  }, [showReferencePattern]);

  const generatePattern = () => {
    const newReferencePattern = Array.from({ length: 3 }, () =>
      colors[Math.floor(Math.random() * colors.length)]
    );
    setReferencePattern(newReferencePattern);
  };

  const handleColorClick = (color) => {
    if (!showReferencePattern) {
      setPlayerPattern([...playerPattern, color]);
    }
  };

  const handleCheckPattern = () => {
    if (arraysMatch(playerPattern, referencePattern)) {
      setFeedback('Correct! Well done!');
      setscore(score + 1);
      setPlayerPattern([]);
      setShowReferencePattern(true);
      // Add a small delay before generating the next pattern for a smoother transition
      setTimeout(() => generatePattern(), 500);
    } else {
      handleWrongAnswer();
    }
  };

  const handleRemovePattern = () => {
    if (playerPattern.length > 0 && !showReferencePattern) {
      const newPlayerPattern = [...playerPattern];
      newPlayerPattern.pop(); // Remove the last color
      setPlayerPattern(newPlayerPattern);
    }
  };

  const handleWrongAnswer = () => {
    if (hearts > 1) {
      setHearts(hearts - 1);
      setFeedback('Not quite right, try again!');
      setShowReferencePattern(true);
      setPlayerPattern([]);
      // Add a small delay before generating the next pattern for a smoother transition
      setTimeout(() => generatePattern(), 500);
    } else {
      setHearts(hearts - 1);
      setGameOver(true);
    }
  };

  useEffect(() =>{
    if(gameOver)
    {
      try {
        const scr = axios.post('https://final-ps-backend.vercel.app/api/activity', {
          email: localStorage.getItem('email'),
          gameType: "Memory",
          score: Math.round((score/15) * 10),
        });
        console.log(scr);
      } catch (error) {
        console.error('Error submitting:', error);
      }
    }
  },[gameOver, score])

  const getRecommendations = async () => {
    try {
      const response = await axios.post('https://final-ps-ml1.onrender.com/recommendations', {
        game_name: "Memory",
        level: "medium",
        played: [],
      });
      setRecommendations(response.data)
    }  catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleRestart = () => {
    setHearts(3);
    setscore(0);
    setShowReferencePattern(true);
    setGameOver(false)
  };

  const arraysMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  };

  return (
    <div>
      <h4>Score: {score}</h4>
      <div id="hearts-container">
        {Array.from({ length: hearts }).map((_, index) => (
          <img key={index} className="imghearts" src={heartImage} alt={`Heart ${index + 1}`} />
        ))}
      </div>
      {!gameOver ? (
        <div id="game-container">
          <div
            id="reference-pattern"
            className={`reference-pattern-container ${showReferencePattern ? '' : 'hidden'}`}
          >
            <PatternContainer pattern={referencePattern} />
          </div>
          <PatternContainer id="player-pattern" pattern={playerPattern} />
          <div id="color-options">
            {colors.map((color) => (
              <ColorOption
                key={color}
                color={color}
                onClick={() => handleColorClick(color)}
                disabled={!showReferencePattern}
              />
            ))}
          </div>
          <button id="check-button" onClick={handleCheckPattern}>
            Check Pattern
          </button>
          <button id="remove-button" onClick={handleRemovePattern}>
            Remove Pattern
          </button>
          <p id="feedback">{feedback}</p>
        </div>
      ) : (
        <div id="game-over-container">
          <h1>Game Over!</h1>
          <p>You ran out of hearts. Try again!</p>
          <button id="restart-button" onClick={handleRestart}>
            Restart
          </button>
          <Button onClick={getRecommendations}>Get Recommendations</Button>
       <ul>
          {trecommendations.length > 0 ? (
            trecommendations.map((recommendation, index) => (
              <li key={index}>{recommendation[0]} : {recommendation[1]}</li>
            ))
          ) : (
            <li></li>
          )}
        </ul>
        </div>
      )}
    </div>
  );
};

export default ColourGame;
