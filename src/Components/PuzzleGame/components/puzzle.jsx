import React from 'react';

const PuzzlePiece = ({ index, solved, onClick }) => {
  const handleClick = () => {
    if (!solved) {
      onClick(index);
    }
  };

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: solved ? 'green' : 'blue',
        cursor: solved ? 'default' : 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
      }}
      onClick={handleClick}
    >
      {index + 1}
    </div>
  );
};

export default PuzzlePiece;
