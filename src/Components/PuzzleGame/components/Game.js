import React ,{ useEffect, useState } from "react";
import shuffleArray from "../utils/shuffleFunction";
import Puzzle from "./Puzzle";
import Timer from "./Timer";
import "./Game.css";
import axios from "axios";

export default function Game({ level, onLevelCompletion }) {
  const Glevel = level;
  const gridSize = level + 2;
  const [shuffledArray, setShuffledArray] = useState(() => shuffleArray(gridSize));
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [win, setWin] = useState(false);
  const [trecommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (moves === 1) setTimerActive(true);
    let won = true;
    for (let i = 0; i < shuffledArray.length - 1; i++) {
      const value = shuffledArray[i];
      if (i === value - 1) continue;
      else {
        won = false;
        break;
      }
    }
    if (won) {
      setWin(true);
      setTimerActive(false);
      try {
        const scr = axios.post('https://final-ps-backend.vercel.app/api/activity', {
          email: localStorage.getItem('email'),
          gameType: "Problem-Solving",
          score: gridSize === 2 ? 
          time < 15 ? 10 : time < 30 ? 8 : time < 60 ? 6 : 4
          :
          gridSize === 3 ?
              time < 120 ? 10 : time < 180 ? 8 : time < 240 ? 6 : 4
              :
              gridSize === 4 ?
                  time < 300 ? 10 : time < 420 ? 8 : time < 600 ? 6 : 4
                  :
                  'Invalid level provided',
        });
        console.log(scr);
      } catch (error) {
        console.error('Error submitting:', error);
      }
        }
    return;
  }, [moves, shuffledArray, time]);

  const newGame = () => {
    setMoves(0);
    setTimerActive(false);
    setTime(0);
    setShuffledArray(() => shuffleArray(gridSize));
    setWin(false);
  };

  const dragStart = (e) => e.dataTransfer.setData("tile", e.target.id);

  const dragOver = (e) => e.preventDefault();

  const dropped = (e) => {
    e.preventDefault();
    const tile = e.dataTransfer.getData("tile");
    const oldPlace = Number(document.getElementById(tile).parentElement.id.slice(6)) - 1;
    const newPlace = Number(e.target.id.slice(6)) - 1;

    if (!(Math.abs(oldPlace - newPlace) === gridSize || Math.abs(oldPlace - newPlace) === 1)) return;

    const [i, j] = [Math.min(oldPlace, newPlace), Math.max(oldPlace, newPlace)];
    setShuffledArray((prevArray) => [
      ...prevArray.slice(0, i),
      prevArray[j],
      ...prevArray.slice(i + 1, j),
      prevArray[i],
      ...prevArray.slice(j + 1),
    ]);
    setMoves((prevMoves) => prevMoves + 1);
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post('https://final-ps-ml1.onrender.com/recommendations', {
        game_name: "Problem_solving",
        level: gridSize === 2 ? 
        "easy"
        :
        gridSize === 3 ?
            "medium"
            :
            gridSize === 4 ?
                "hard"
                :
                'Invalid level provided',
        played: [],
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="game-container1">
      <div className="game-content">
        {win && (
          <div className="win-message">
            <div className="d-flex align-items-center justify-content-center space-x-4">
              <p className="font-medium">You have won the game</p>
            </div>
          </div>
        )}
        <h3 className="game-title">
          {`${gridSize} Puzzle Game`}
        </h3>
        <div className="game-info">
          <p>Moves: {moves}</p>
          <Timer time={time} timerActive={timerActive} setTime={setTime} className="timer" />
        </div>
        <Puzzle
          shuffledArray={shuffledArray}
          dragStart={dragStart}
          dragOver={dragOver}
          dropped={dropped}
          gridSize={gridSize}
        />
        {win && (
          <div className="win-actions">
            <div className="d-flex align-items-center justify-content-center ">
              <div>
                <button
                  onClick={newGame}
                  className="new-game-btn"
                >
                  New Game
                </button>
                <button
                  onClick={() => {
                    newGame();
                    onLevelCompletion();
                  }}
                  className="next-level-btn"
                >
                  Move to Next Level
                </button>
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
            </div>
          </div>
        )}
        {!win && (
          <div className="win-actions">
            <button
              onClick={newGame}
              className="new-game-btn"
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
