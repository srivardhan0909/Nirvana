import React, { useState, useEffect } from 'react';
import './Anagram.css';
import heart from "./assests/heart.png"
import AnagramGenerator from './AnagramGenerator';
import AnagramDisplay from './AnagramDisplay';
import AnagramInput from './AnagramInput';
import RotatingCirclesBackground from './BackGround';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Anagram() {
  const [hearts, setHearts] = useState(3);
  const [word, setWord] = useState('');
  const [anagram, setAnagram] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (hearts === 0) {
      setGameOver(true);
    } else {
      generateNewAnagram();
    }
  }, [score, hearts]);

  const generateNewAnagram = () => {
    const newWord = AnagramGenerator.getRandomWord(score);
    const newAnagram = AnagramGenerator.shuffleWord(newWord);
    setWord(newWord);
    setAnagram(newAnagram);
  };

  const handleGuess = (guess) => {
    if (guess.toLowerCase() === word.toLowerCase()) {
      setScore(score + 1);
    } else {
      setHearts(hearts - 1);
    }
  };

  const restartGame = () => {
    setHearts(3);
    setScore(0);
    setGameOver(false);
  };
  const [trecommendations, setRecommendations] = useState([]);
  const getRecommendations = async () => {
    try {
      const response = await axios.post('https://final-ps-ml1.onrender.com/recommendations', {
        game_name: "Language",
        level: "medium",
        played: [],
      });
      setRecommendations(response.data)
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() =>{
    if(gameOver)
    {
      try {
        const scr = axios.post('https://final-ps-backend.vercel.app/api/activity', {
          email: localStorage.getItem('email'),
          gameType: "Langauge",
          score: Math.round((score/15) * 10),
        });
        console.log(scr);
      } catch (error) {
        console.error('Error submitting:', error);
      }
    }
  },[gameOver, score])

  return (

    <div className="Anagram overflow-hidden">
      <div
        style={{
          backgroundColor: "#0A1D37",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          zIndex: "-101",
          overflow: "hidden"

        }}
      >
        <RotatingCirclesBackground/>
      </div>
      {gameOver ? (
        <div>
          <h1>Game Over!</h1>
          <h2>Your Score: {Math.round((score/15) * 10)}</h2>
          <Button onClick={restartGame}>Restart</Button>
          <button onClick={getRecommendations}>Get Recommendations</button>
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
      ) : (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
          <h1>Anagram Game</h1>
          <div className='d-flex flex-row align-items-center justify-content-center'>
            {/* Render heart images based on the hearts state */}
            {Array.from({ length: hearts }, (_, index) => (
              <img key={index} className='heart' src={heart} width={40} alt={`heart-${index}`} />
            ))}
          </div>
          <p>Score: {score}</p>
          <AnagramDisplay anagram={anagram} />
          <AnagramInput onGuess={handleGuess} />
        </div>
      )}
    </div>
  );
}

export default Anagram;
