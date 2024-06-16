// Game.jsx
import React, { useState } from 'react';
// import EmotionFlashcardGame from './EmotionFlashcardGame';
import EmotionFlashcardGame from './trial3';

const levels = {
  easy: { name: 'Easy', totalQuestions: 5, options: 2, timer: 60, initialLives : 6 },
  medium: { name: 'Medium', totalQuestions: 8, options: 3 ,timer: 40, initialLives : 5},
  hard: { name: 'Hard', totalQuestions: 10, options: 4 , timer: 30, initialLives : 3},
};

const EmotionGame = () => {
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const handleStartGame = () => {
    // You can add additional validation if needed
    if (selectedAge && selectedLevel) {
      // Start the game or perform other actions
      console.log(`Starting game for age: ${selectedAge}, level: ${selectedLevel}`);
    }
  };

  const renderLevelSelection = () => (
    <div>
      <h1>Choose Age and Level</h1>
      <div>
        <label>
          Age:
          <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
            <option value="">Select Age</option>
            <option value="0-4">0-4 years</option>
            <option value="5-8">5-8 years</option>
            <option value="8-10">8-10 years</option>
            <option value="10-12">10-12 years</option>
          </select>
        </label>
      </div>
      {selectedAge && (
        <div>
          <label>
            Level:
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              <option value="">Select Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>
      )}
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );

  return (
    <div className="app-container">
      {!selectedAge || !selectedLevel ? (
        renderLevelSelection()
      ) : (
        <EmotionFlashcardGame ageRange={selectedAge} level={selectedLevel} levels={levels} />
      )}
    </div>
  );
};

export default EmotionGame;
