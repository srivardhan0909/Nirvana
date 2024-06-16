import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const AnagramInput = ({ onGuess }) => {
  const [guess, setGuess] = useState('');

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuess(guess);
    setGuess('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}} >Guess the word</div>
        <input type="text" style={{color: 'black'}} value={guess} onChange={handleChange} />
      </label>
      <Button type="submit" style={{width:"100px"}}>Submit</Button>
    </form>
  );
};

export default AnagramInput;
