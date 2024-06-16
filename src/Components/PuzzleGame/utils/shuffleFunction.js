// shuffleFunction.js
export default function shuffleArray(gridSize) {
    let array = Array.from({ length: gridSize * gridSize - 1 }, (_, index) => index + 1);
    array.push("");
  
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  
    return array;
  }
  