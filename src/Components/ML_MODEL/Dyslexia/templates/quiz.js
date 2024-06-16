//https://final-ps-ml1.onrender.com
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./curve.css";
import { useNavigate } from "react-router-dom";
import oimage from "../assets/o-image.png";
import image0 from "../assets/0-image.png";
import grapes from "../assets/grapeimg.png";
import Gimage from "../assets/g-image.png";
import Simage from "../assets/s-image.png";
import Cat from "../assets/cat.png";
import Bimage from "../assets/B-image.png";
import Dog from "../assets/dog.png";
import Righthand from "../assets/righthand.png";
import Lefthand from "../assets/lefthand.png";
import tiger from "../assets/tiger.png";
import tulip from "../assets/tulip.png";
import Ssound from "../assets/s-sound.mp3";
import lakesound from "../assets/lake-sound.mp3";
import birdchirping from "../assets/bird_chirping.mp3";
import elephant from "../assets/elephant.mp3";
import piano from "../assets/piano.mp3";
import catastrophe from "../assets/catastrophe.mp3";


function DQuiz() {
  const [age, setAge] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [Agesubmitted, setAgeSubmitted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [signup, isSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { 
    if (localStorage.getItem("name") !== null ){
      isSignup(true)
    }
    if (localStorage.getItem("name") === ''){
      isSignup(false)
    }
  }, [])

  const handleAgeSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(age) && age >= 5 && age <= 16) {
      setQuestions(getQuestionsForAge(age));
      setAgeSubmitted(true);
    } else {
      alert("Please enter a valid age between 5 and 16.");
    }
  };

  const handleRadioChange = (option) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = option;
      return updatedAnswers;
    });
  };

  const progress = ((currentQuestionIndex + 1) / 10) * 100;
  const handleNext = () => {
    setAnimate(true);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTimeout(() => setAnimate(false), 1000);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedOption = answers[currentQuestionIndex];
    const modelValues = answers.map((selectedOption) => (
      selectedOption === "Always" || selectedOption === "Usually" ? 0 : 1
    ));

    try {
      const response = await axios.post("https://final-ps-ml1.onrender.com/quizz", {
        answers: modelValues,
      }).then((res) => 
      navigate("/DSurvey", { state: { vals: res.data.scr } }),
      setSubmitted(true));
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const getQuestionsForAge = (age) => {
    if (age >= 5 && age < 9) {
      return [
        {
          id: 1,
          text: "Check whether these two alphabets are same or not?",
          options: ["Yes", "No"],
          answer: "Yes",
          img1: oimage,
          img2: image0,
          mp3: "null",
        },
        {
          id: 2,
          text: "Guess the fruit in the picture below.",
          options: ["Grapes", "Orange", "Banana", "Mango"],
          answer: "Grapes",
          img1: grapes,
          img2: "null",
          mp3: "null",
        },
        {
          id: 3,
          text: "Check whether these two alphabets are same or not?",
          options: ["Yes", "No"],
          answer: "No",
          img1: Gimage,
          img2: Simage,
          mp3: "null",
        },
        {
          id: 4,
          text: "Which letter is G?",
          options: ["First", "Second"],
          answer: "First",
          img1: Gimage,
          img2: oimage,
          mp3: "null",
        },
        {
          id: 5,
          text: "Which letter CAT starts with?",
          options: ["K", "S", "C"],
          answer: "C",
          img1: Cat,
          img2: "null",
          mp3: "null",
        },
        {
          id: 6,
          text: "What is the smaller version of this letter?",
          options: ["d", "b"],
          answer: "b",
          img1: Bimage,
          img2: "null",
          mp3: "null",
        },
        {
          id: 7,
          text: "What do you hear?",
          options: ["F", "S"],
          answer: "S",
          mp3: Ssound,
          img1: "null",
          img2: "null",
        },
        {
          id: 8,
          text: "What do you see in the picture?",
          options: ["DOG", "GOD"],
          answer: "DOG",
          img1: Dog,
          img2: "null",
          mp3: "null",
        },
        {
          id: 9,
          text: "Which hand is left and Which hand is right?",
          options: [
            "First one is right and next one is left",
            "First one is left and next one is right",
          ],
          answer: "First one is right and next one is left",
          img1: Righthand,
          img2: Lefthand,
          mp3: "null",
        },
        {
          id: 10,
          text: "What do you hear?",
          options: ["CAKE", "LAKE", "TAKE", "FAKE"],
          answer: "LAKE",
          mp3: lakesound,
          img1: "null",
          img2: "null",
        },
        // Add more questions for this age group
      ];
    } else if (age >= 9 && age < 13) {
      return [
        {
          id: 1,
          text: "Who discovered penicillin?",
          options: ["Alexander Fleming", "Marie Curie", "Albert Einstein", "Isaac Newton"],
          answer: "Alexander Fleming",
          img1: "null",
          img2: "null",
          mp3: "null",
          // Add other properties as needed
        },
        {
          id: 2,
          text: "What is the process by which plants make their own food called?",
          options: ["Photosynthesis", "Respiration", "Germination", "Transpiration"],
          answer: "Photosynthesis",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 3,
          text: "Which planet is known as the 'Red Planet'?",
          options: ["Mars", "Jupiter", "Venus", "Saturn"],
          answer: "Mars",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 4,
          text: "Who invented the telephone?",
          options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"],
          answer: "Alexander Graham Bell",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 5,
          text: "What is the capital city of Australia?",
          options: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
          answer: "Canberra",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 6,
          text: "What is the hardest natural substance on Earth?",
          options: ["Diamond", "Gold", "Steel", "Iron"],
          answer: "Diamond",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 7,
          text: "Listen to the audio clip. What is the sound?",
          options: ["Bird chirping", "Waterfall", "Thunderstorm", "Traffic"],
          answer: "Bird chirping",
          img1: "null",
          img2: "null",
          mp3: birdchirping, 
        },
        {
          id: 8,
          text: "Identify the image shown below.",
          options: ["Tiger", "Lion", "Elephant", "Giraffe"],
          answer: "Tiger",
          img1: tiger, 
          img2: "null",
          mp3: "null",
        },
        {
          id: 9,
          text: "What is the largest ocean on Earth?",
          options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
          answer: "Pacific Ocean",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 10,
          text: "Listen to the audio clip. What word is being pronounced?",
          options: ["Elephant", "Giraffe", "Rhinoceros", "Hippopotamus"],
          answer: "Elephant",
          img1: "null",
          img2: "null",
          mp3: elephant, 
        },
      ];
    } else if (age >= 13 && age <= 16) {
      return [
        {
          id: 1,
          text: "Who formulated the theory of relativity?",
          options: ["Albert Einstein", "Isaac Newton", "Stephen Hawking", "Galileo Galilei"],
          answer: "Albert Einstein",
          img1: "null",
          img2: "null",
          mp3: "null",
          // Add other properties as needed
        },
        {
          id: 2,
          text: "What is the largest organ in the human body?",
          options: ["Skin", "Heart", "Liver", "Brain"],
          answer: "Skin",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 3,
          text: "Was the moon landing faked?",
          options: ["Yes", "No"],
          answer: "No",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 4,
          text: "What is the powerhouse of the cell?",
          options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic reticulum"],
          answer: "Mitochondria",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 5,
          text: "Which planet is known as the 'Red Planet'?",
          options: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 6,
          text: "Who is known as the 'Father of Computers'?",
          options: ["Charles Babbage", "Alan Turing", "Ada Lovelace", "Bill Gates"],
          answer: "Charles Babbage",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 7,
          text: "Listen to the audio clip. What instrument is being played?",
          options: ["Piano", "Violin", "Guitar", "Saxophone"],
          answer: "Piano",
          img1: "null",
          img2: "null",
          mp3: piano, // Replace "audio_url_here" with the actual URL
        },
        {
          id: 8,
          text: "Identify the image shown below.",
          options: ["Sunflower", "Rose", "Tulip", "Daisy"],
          answer: "Tulip",
          img1: tulip, // Replace "image_url_here" with the actual URL
          img2: "null",
          mp3: "null",
        },
        {
          id: 9,
          text: "What is the chemical symbol for silver?",
          options: ["Ag", "Au", "Fe", "Hg"],
          answer: "Ag",
          img1: "null",
          img2: "null",
          mp3: "null",
        },
        {
          id: 10,
          text: "Listen to the audio clip. What word is being pronounced?",
          options: ["Catastrophe", "Metamorphosis", "Paradox", "Surreptitious"],
          answer: "Catastrophe",
          img1: "null",
          img2: "null",
          mp3:catastrophe , // Replace "audio_url_here" with the actual URL
        },
      
        // Add more questions for this age group
      ];
    }
    return [];
  };

  const handlenav = async () =>
  {
    navigate("/Login")
  }

  return (

    <div>
      {!signup ? (
        <div>
          <p>Please Signup to continue</p>
          <button onClick={handlenav}>Signup</button>
        </div>
      ) : (
    <div>
      {!submitted ? (
        <div>
          {!Agesubmitted ? (
            <div className="age-form-container">
              <h2>Enter Your Age</h2>
              <form onSubmit={handleAgeSubmit}>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="age-input" 
                />
                <button type="submit" className="age-submit-button">Submit</button>
              </form>
            </div>
          ) : null}
          {questions.length > 0 && (
            <div className='servey d-flex align-items-center justify-content-center  z-2 '>
    
            <div className='d-flex  mt-5 shadow-lg rounded-5 flex-column w-50  gap-3  pt-5 ps-5  h-100'>
                <div className='progress-container' >
                <div
               className={`progress-bar ${animate ? 'animate' : ''}`}
               style={{ width: `${progress}%`}}
                />
              </div>
              <h2>Quiz</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <p>{questions[currentQuestionIndex].text}</p>
                  {(questions[currentQuestionIndex].img1 || questions[currentQuestionIndex].img2) && (
                    <div className="img-container">
                      {questions[currentQuestionIndex].mp3!=="null" && (
                        <audio controls>
                          <source src={questions[currentQuestionIndex].mp3} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                      {questions[currentQuestionIndex].img1!=="null" && (
                        <img src={questions[currentQuestionIndex].img1} alt="Image 1" />
                      )}
                      {questions[currentQuestionIndex].img2 !=="null"&& (
                        <img src={questions[currentQuestionIndex].img2} alt="Image 2" />
                      )}
                    </div>
                  )}
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={option}
                        name="option"
                        value={option}
                        checked={answers[currentQuestionIndex] === option}
                        onChange={() => handleRadioChange(option)}
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>
                <div className="quiz-buttons">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="prev-button"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      currentQuestionIndex === questions.length - 1 ||
                      answers[currentQuestionIndex] === undefined
                    }
                    className="next-button"
                  >
                    Next
                  </button>
                  {currentQuestionIndex === questions.length - 1 && (
                    <button
                      disabled={answers[currentQuestionIndex] === undefined}
                      type="submit"
                      className="submit-button"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Quiz Submitted</h2>
        </div>
      )}
    </div>
    )}
    </div>
  );
  
}

export default DQuiz;