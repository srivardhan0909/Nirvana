import React, { useState } from "react";
import Game from "./Game";

function PuzzleApp() {
  const [currentLevel, setCurrentLevel] = useState(0);

  const handleLevelCompletion = () => {
    setCurrentLevel((prevLevel) => prevLevel + 1);
  };

  return (
    <div>
      {currentLevel === 0 && (
        <>
          <h1>Level 1 - 2x2 Grid</h1>
          <Game level={0} onLevelCompletion={handleLevelCompletion} />
        </>
      )}

      {currentLevel === 1 && (
        <>
          <h1>Level 2 - 3x3 Grid</h1>
          <Game level={1} onLevelCompletion={handleLevelCompletion} />
        </>
      )}

      {currentLevel === 2 && (
        <>
          <h1>Level 3 - 4x4 Grid</h1>
          <Game level={2} onLevelCompletion={handleLevelCompletion} />
        </>
      )}
    </div>
  );
}

export default PuzzleApp;