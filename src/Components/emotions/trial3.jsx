import React, { useState, useEffect, useRef } from 'react';
import GameOver from './GameOverScreen.jsx';
import emotionsData from './emo.js';
import './styles1.css';
import correctSound from './Assets/correct-answer.wav';
import incorrectSound from './Assets/wrong-answer.mp3';
import cardFlipSound from './Assets/Card-flip.mp3';
import heart from './Assets/heart.png';
import axios from 'axios';

const EmotionFlashcardGame = ({ ageRange, level, levels }) => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [optionClicked, setOptionClicked] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lives, setLives] = useState(levels[level].initialLives);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);
  const [trecommendations, setRecommendations] = useState([]);

  const correctAudio = new Audio(correctSound);
  const incorrectAudio = new Audio(incorrectSound);
  const cardFlipAudio = new Audio(cardFlipSound);
  useEffect(() => {
    if (emotionsData[ageRange]?.[level]) {
      setSelectedEmotions(emotionsData[ageRange][level]);
      setElapsedTime(0);
      setTimer(levels[level].timer);
      shuffleCards(); 
      setQuestionsAsked(0);
    } else {
      setGameOver(true);
    }
  }, [ageRange, level]);
  
  useEffect(() =>{
    if(gameOver)
    {
      console.log(level)
      try {
        const scr = axios.post('https://final-ps-backend.vercel.app/api/activity', {
          email: localStorage.getItem('email'),
          gameType: "Reflex",
          score: Math.round((score/15) * 10),
        });
        console.log(scr);
      } catch (error) {
        console.error('Error submitting:', error);
      }
    }
  },[gameOver, score, level])

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => {
          const newElapsedTime = prevElapsedTime + 1;
  
          if (newElapsedTime === timer) {
            setGameOver(true);
            return newElapsedTime;
          }
  
          return newElapsedTime;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
  
    return () => clearInterval(timerRef.current);
  }, [isPaused, timer]);
  
  
  useEffect(() => {
    if (selectedEmotions.length > 0) {
      shuffleCards();
    }
  }, [selectedEmotions]);

  const playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };

  const handleOptionClick = (selectedOption) => {
    console.log('Selected Option:', selectedOption);
    console.log('Is Correct:', isCorrect);
    if (!optionClicked && !isPaused) {
      const isCorrect = selectedOption.name === currentFlashcard.name;
      setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));

      if (isCorrect) {
        setIsCorrect(true);
        playAudio(correctAudio);
        setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
      } else {
        setIsCorrect(false);
        playAudio(incorrectAudio);
        setLives((prevLives) => prevLives - 1);
        setIncorrectCount((prevIncorrectCount) => prevIncorrectCount + 1);
        if (lives - 1 === 0 || elapsedTime === timer) {
          setGameOver(true);
        }
      }

      setOptionClicked(true);
      setSelectedAnswer(selectedOption.name);

      setTimeout(() => {
        shuffleCards();
      }, 500);
    }
  };

  const handleStopGame = () => {
    clearInterval(timerRef.current);
    setGameOver(true);
  };

  const handlePauseGame = () => {
    setIsPaused(true);
    clearInterval(timerRef.current);
  };

  const handleResumeGame = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now() - elapsedTime * 1000;

    timerRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(elapsedSeconds);

      if (elapsedSeconds === timer) {
        setGameOver(true);
      }
    }, 1000);

    shuffleCards(); 
  };

  const shuffleCards = () => {
    if (!isPaused) {
      const shuffledEmotions = [...selectedEmotions].sort(() => Math.random() - 0.5);
      const correctOptionIndex = Math.floor(Math.random() * levels[level].options);
      const correctOption = shuffledEmotions[correctOptionIndex];
      const tempOptions = shuffledEmotions.slice(0, levels[level].options);
  
      setCurrentFlashcard(correctOption);
      setOptions([...tempOptions]); 
      setOptionClicked(false);
      setSelectedAnswer('');
      setIsCorrect(null);
      playAudio(cardFlipAudio);
  
      setQuestionsAsked((prevQuestionsAsked) => prevQuestionsAsked + 1);
    }
  };
  

  const restartGame = () => {
    clearInterval(timerRef.current);

    setSelectedEmotions(emotionsData[ageRange][level]);
    setCurrentFlashcard(null);
    setOptions([]);
    setScore(0);
    setGameOver(false);
    setElapsedTime(0);
    setTimer(levels[level].timer);
    setLives(levels[level].initialLives);
    setCorrectCount(0);
    setIncorrectCount(0);
    setOptionClicked(false);
    setSelectedAnswer('');
    setIsCorrect(null);

    shuffleCards();
    setQuestionsAsked(1);

    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(elapsedSeconds);
      if (elapsedSeconds === levels[level].timer) {
        setGameOver(true);
      }
    }, 1000);
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post('https://final-ps-ml1.onrender.com/recommendations', {
        game_name: "reflex",
        level: level,
        played: [],
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };
  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '20px' }}>
      {/* <h1>Emotion Flashcards - {ageRange} - {levels[level].name}</h1> */}
      {gameOver ? (
        <div>
        <GameOver
          score={score}
          TotalQuestions={questionsAsked}
          correct={correctCount}
          wrong={incorrectCount}
          onRestart={restartGame}
        />
        
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
        <>
          <div style={{ fontSize: '20px', marginBottom: '10px' }}>
            <p>Score: {score}</p>
            <div style={{ marginTop: '10px' }}>
              <div className="timer-bar">
                <div className="timer-progress" style={{ width: `${(elapsedTime / timer) * 100}%` }}></div>
              </div>
            </div>
            {/* <p>ElapsedTime : {elapsedTime}</p> */}
            <p>{timer - elapsedTime} seconds</p>
            <p>Questions: {questionsAsked}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            {Array.from({ length: lives }, (_, index) => (
              <img key={index} src={heart} alt="Heart" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
            ))}
          </div>
          

          <div style={{ margin: '20px' }}>
            {isPaused ? (
              <button onClick={handleResumeGame}>Resume Game</button>
            ) : (
              <button onClick={handlePauseGame}>Pause Game</button>
            )}
            <button onClick={handleStopGame}>Stop Game</button>
          </div>
          <div style={{ fontSize: '24px', marginBottom: '20px' }}>
            <p>Which emoji represents the emotion: {currentFlashcard ? currentFlashcard.name : ''}</p>
          </div>
          <div className="image-container">
          {options.map((option) => (
              <button
                key={option.name}
                onClick={() => handleOptionClick(option)}
                className={`image-button ${
                  selectedAnswer === option.name && isCorrect !== null
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
              >
                <img src={option.image} alt={option.name} style={{ width: '100%', height: '100%' }} />
              </button>
            ))}
          </div>
          <button onClick={restartGame}>Restart Game</button>
        </>
      )}
    </div>
  );
};

export default EmotionFlashcardGame;
