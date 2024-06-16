// AnagramGenerator.js

let threeletterwords = [
  "cat", "dog", "bat", "hat", "run", "sun",
  "mat", "pen", "cup", "top", "box", "car",
  "bus", "zip", "job", "map", "fan", "leg",
  "cup", "lip", "rug", "bag", "toy", "cup",
  "cup", "tap", "nod", "red", "jar", "cap",
  "mat", "pen", "cup", "top", "box", "car",
  "bus", "zip", "job", "map", "fan", "leg",
  "cup", "lip", "rug", "bag", "toy", "cup",
  "cup", "tap", "nod", "red", "jar", "cap"
]
const fourletterwords = [
  "tree", "home", "book", "ball", "desk",
  "star", "lamp", "milk", "tape", "road",
  "bird", "rain", "bell", "frog", "gate",
  "hill", "girl", "hair", "moon", "fish",
  "coat", "door", "lamp", "bees", "seal",
  "frog", "bees", "gate", "foot", "leaf",
  "tree", "home", "book", "ball", "desk",
  "star", "lamp", "milk", "tape", "road",
  "bird", "rain", "bell", "frog", "gate",
  "hill", "girl", "hair", "moon", "fish",
  "coat", "door", "lamp", "bees", "seal",
  "frog", "bees", "gate", "foot", "leaf"
]
const fiveletterwords= [
  "house", "mouse", "apple", "beach", "chair",
  "snake", "happy", "hello", "cloud", "storm",
  "beard", "candy", "fancy", "lemon", "piano",
  "music", "happy", "river", "ferry", "grass",
  "zebra", "beach", "glass", "water", "bunny",
  "fairy", "flame", "puppy", "camel", "crown",
  "house", "mouse", "apple", "beach", "chair",
  "snake", "happy", "hello", "cloud", "storm",
  "beard", "candy", "fancy", "lemon", "piano",
  "music", "happy", "river", "ferry", "grass",
  "zebra", "beach", "glass", "water", "bunny",
  "fairy", "flame", "puppy", "camel", "crown"
]
const sixletterwords=[
    "banana", "rocket", "purple", "yellow", "silver", "monkey", "friend", "hidden", "shadow", "spirit",
    "gentle", "simple", "summer", "winter", "orange", "circle", "square", "triangle", "purple", "yellow",
    "sunset", "pretty", "family", "garden", "smooth", "planet", "dragon", "forest", "hidden", "golden",
    "silent", "whistle", "listen", "rocket", "guitar", "yellow", "circle", "square", "spring", "flower",
    "giraffe", "elephant", "journey", "moment", "secret", "bright", "castle", "rocket", "whistle", "golden",
    "winter", "smooth", "circle", "sunset", "moment", "secret", "bright", "castle", "shadow", "golden",
    "winter", "smooth", "circle", "sunset", "spirit", "moment", "secret", "bright", "castle", "rocket",
    "whistle", "golden", "winter", "smooth", "circle", "sunset", "secret", "bright", "castle", "shadow",
    "spirit", "moment", "golden", "winter", "smooth", "circle", "sunset", "whistle", "bright", "castle",
    "rocket", "shadow", "spirit", "moment", "secret", "golden", "winter", "smooth", "circle", "sunset"
]

const sevenletterwords=[
    "awesome", "victory", "journey", "freedom", "special", "fantasy", "silence", "perfect", "champion", "country",
    "nothing", "capture", "freight", "history", "journal", "library", "momentum", "reserve", "diamond", "monster",
    "weather", "inspire", "promise", "upgrade", "visible", "justice", "balance", "fortune", "present", "morning",
    "charity", "abandon", "support", "analyze", "whisper", "explode", "stomach", "stretch", "believe", "complete",
    "stumble", "whistle", "plumber", "landing", "through", "capture", "freight", "history", "journal", "library",
    "momentum", "reserve", "diamond", "monster", "weather", "inspire", "promise", "upgrade", "visible", "justice",
    "balance", "fortune", "present", "morning", "charity", "abandon", "support", "analyze", "whisper", "explode",
    "stomach", "stretch", "believe", "complete", "stumble", "whistle", "plumber", "landing", "through", "realize",
    "compose", "freight", "history", "journal", "library", "momentum", "reserve", "diamond", "monster", "weather",
    "inspire", "promise", "upgrade", "visible", "justice", "balance", "fortune", "present", "morning", "charity"
]
const eightletterwords=[
    "hospital", "stronger", "daughter", "tomorrow", "everyday", "umbrella", "whisper", "triangle", "colorful", "internet",
    "favorite", "distance", "birthday", "creative", "remember", "slippery", "together", "mountain", "whistle", "anywhere",
    "football", "planning", "cleaning", "crocodile", "flashing", "invisible", "knowledge", "listening", "beautiful", "fountain",
    "goodness", "terrible", "splendid", "scissors", "sickness", "straight", "language", "password", "remember", "tomorrow",
    "hospital", "stronger", "daughter", "everyday", "umbrella", "whisper", "triangle", "colorful", "internet", "favorite",
    "distance", "birthday", "creative", "remember", "slippery", "together", "mountain", "whistle", "anywhere", "football",
    "planning", "cleaning", "crocodile", "flashing", "invisible", "knowledge", "listening", "beautiful", "fountain", "goodness",
    "terrible", "splendid", "scissors", "sickness", "straight", "language", "password", "remember", "tomorrow", "hospital", "stronger",
    "daughter", "everyday", "umbrella", "whisper", "triangle", "colorful", "internet", "favorite", "distance", "birthday", "creative",
    "remember", "slippery", "together", "mountain", "whistle", "anywhere", "football", "planning", "cleaning", "crocodile", "flashing"
]
const nineletterwords=[
    "important", "direction", "celebrate", "challenge", "experience", "appreciate", "literature", "technology", "adventure", "attention",
    "friendship", "understand", "generation", "decoration", "celebrity", "difference", "conference", "leadership", "tremendous", "definitely",
    "continuous", "foundation", "revolution", "background", "condition", "government", "conclusion", "imagination", "competition", "accessible",
    "generation", "experience", "appreciate", "celebrate", "literature", "technology", "adventure", "direction", "challenge", "important", "attention",
    "friendship", "understand", "difference", "celebrity", "conference", "leadership", "tremendous", "decoration", "definitely", "continuous", "foundation",
    "revolution", "background", "condition", "government", "conclusion", "imagination", "competition", "accessible", "generation", "experience", "appreciate",
    "celebrate", "literature", "technology", "adventure", "direction", "challenge", "important", "attention", "friendship", "understand", "difference", "celebrity",
    "conference", "leadership", "tremendous", "decoration", "definitely", "continuous", "foundation", "revolution", "background", "condition", "government", "conclusion",
    "imagination", "competition", "accessible", "generation", "experience", "appreciate", "celebrate", "literature", "technology", "adventure", "direction", "challenge"
]
const tenletterwords=[
    "confidence", "conclusion", "reflection", "experience", "friendship", "celebration", "generation", "appreciate", "leadership", "challenge",
    "difference", "continuous", "background", "government", "adventure", "direction", "technology", "foundation", "literature", "tremendous",
    "definitely", "imagination", "competition", "revolution", "celebrity", "conference", "understand", "condition", "decoration", "accessible",
    "important", "attention", "friendship", "celebration", "generation", "appreciate", "leadership", "challenge", "experience", "difference",
    "continuous", "background", "government", "adventure", "direction", "technology", "foundation", "literature", "tremendous", "definitely",
    "imagination", "competition", "revolution", "celebrity", "conference", "understand", "condition", "decoration", "accessible", "important",
    "attention", "friendship", "celebration", "generation", "appreciate", "leadership", "challenge", "experience", "difference", "continuous",
    "background", "government", "adventure", "direction", "technology", "foundation", "literature", "tremendous", "definitely", "imagination",
    "competition", "revolution", "celebrity", "conference", "understand", "condition", "decoration", "accessible", "important", "attention"
]
const elevenletterwords=[
    "imagination", "celebration", "friendliness", "competition", "experience", "decoration", "reflection", "difference", "leadership", "generation",
    "adventure", "continuous", "background", "government", "technology", "literature", "challenge", "foundation", "confidence", "definitely", 
    "celebration", "friendliness", "competition", "experience", "decoration", "reflection", "difference", "leadership", "generation", "adventure", 
    "continuous", "background", "government", "technology", "literature", "challenge", "foundation", "confidence", "definitely", "imagination", 
    "revolutionary", "celebrity", "conference", "understand", "condition", "accessible", "tremendous", "interesting", "breathtaking", "environment",
    "development", "unbelievable", "construction", "enthusiastic", "inspiration", "conclusion", "exaggeration", "recognition", "conversation", "celebration",
    "friendliness", "competition", "experience", "decoration", "reflection", "difference", "leadership", "generation", "adventure", "continuous", 
    "background", "government", "technology", "literature", "challenge", "foundation", "confidence", "definitely", "imagination", "revolutionary", 
    "celebrity", "conference", "understand", "condition", "accessible", "tremendous", "interesting", "breathtaking", "environment", "development",
    "unbelievable", "construction", "enthusiastic", "inspiration", "conclusion", "exaggeration", "recognition", "conversation", "celebration"
]
const AnagramGenerator = {
    getRandomWord: (score) => {
        let wordsForScore=threeletterwords
        if (score > 10 && score <= 20) {
            wordsForScore = fourletterwords;
          } else if (score > 20 && score <= 30) {
            wordsForScore = fiveletterwords;
          } else if (score > 30 && score <= 40) {
            wordsForScore = sixletterwords;
          } else if (score > 40 && score <= 50) {
            wordsForScore = sevenletterwords;
          } else if (score > 50 && score <= 60) {
            wordsForScore = eightletterwords;
          } else if (score > 60 && score <= 70) {
            wordsForScore = nineletterwords;
          } else if (score > 70 && score <= 80) {
            wordsForScore = tenletterwords;
          } else if (score > 80 && score <= 90) {
            wordsForScore = elevenletterwords;
          }
  
      const randomIndex = Math.floor(Math.random() * wordsForScore.length);
      return wordsForScore[randomIndex];
    },
    shuffleWord: (word) => {
      const shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
      return shuffledWord;
    },
  };
  
  export default AnagramGenerator;