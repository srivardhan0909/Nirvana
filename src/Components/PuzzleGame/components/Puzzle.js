import React from 'react';
import { FilledTile, EmptyTile } from "./Tile";
import "./Puzzle.css";

export default function Puzzle({ shuffledArray, dragOver, dragStart, dropped, gridSize }) {
  return (
    <div className="puzzle-container" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`}} >
      {shuffledArray.map((value, index) => {
        if (value === "") {
          return <EmptyTile dragOver={dragOver} dropped={dropped} index={index} key={index} />;
        }
        return <FilledTile index={index} value={value} dragStart={dragStart} key={index} />;
      })}
    </div>
  );
}
