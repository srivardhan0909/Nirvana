import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './curve.css'
import { useNavigate } from 'react-router-dom'

const Autisam = () => {
  const [questions] = useState([
    {
        id: 1,
        text: 'Does your child look at you when you call his/her name?',
        options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
      },
      {
        id: 2,
        text: 'How easy is it for you to get eye contact with your child?',
        options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
      },
      {
          id: 3,
          text: 'Does your child point to indicate that s/he wants something? (e.g. a toy that is out of reach)',
          options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
        },
        {
          id: 4,
          text: 'Does your child point to share interest with you? (e.g. pointing at an interesting sight)',
          options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
        },
        {
          id: 5,
          text: 'Does your child pretend? (e.g. care for dolls, talk on a toy phone)',
          options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
        },
        {
          id: 6,
          text: 'Does your child follow where you are looking?',
          options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
        },
        {
          id: 7,
          text: 'If you or someone else in the family is visibly upset, does your child show signs of wanring to comfort them? (e.g. stroking hair, hugging them)',
          options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
        },
        {
          id: 8,
          text: 'Would you describe your childs first words as:',
          options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
        },
        {
          id: 9,
          text: 'Does your child use simple gestures? (e.g. wave goodbye)',
          options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
        },
        {
          id: 10,
          text: 'Does your child stare at nothing with no apparent purpose?',
          options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
        },
    // Add more questions as needed
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [Prediction, setPrediction] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [signup, isSignup] = useState(false);
  const navigate = useNavigate()

  useEffect(() => { 
    if (localStorage.getItem("name") !== null ){
      isSignup(true)
    }
    if (localStorage.getItem("name") === ''){
      isSignup(false)
    }
  }, [])

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
     // Trigger animation on each question change
    setTimeout(() => setAnimate(false), 1000);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setAnimate(true); // Trigger animation on each question change
    setTimeout(() => setAnimate(false), 1000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  // Get the current question's selected option  
  //const selectedOption = answers[currentQuestionIndex];

  // Conditionally set the value to be passed to the model
  const modelValues = answers.map((selectedOption) => (
    selectedOption === 'Always' || selectedOption === 'Usually' ? 0 : 1
  ));

  try {
    const response = await axios.post('https://final-ps-ml1.onrender.com/apredict', {
      // Assuming the model expects 10 features, create an array with 10 zeros
      answers: modelValues
    });
      // Assuming the API response has a 'prediction' field
      setPrediction(Math.round(response.data.prediction));
      setSubmitted(true);
      try {
        const scr = await axios.post('https://final-ps-backend.vercel.app/api/autisam', {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        score: Math.round(response.data.prediction),
      })
      } catch (error) {
        console.error('Error submitting survey :', error);
      }

    } catch (error) {
      console.error('Error submitting survey:', error);
    }
    
  };

  const handlenav = async () =>
  {
    navigate("/Login")
  }

    return (
      <div className='servey d-flex align-items-center justify-content-center z-2'>
        {signup ? (
          <div className='d-flex mt-5 shadow-lg rounded-5 flex-column w-50 gap-3 pt-5 ps-5 h-100'>
            <div className='progress-container'>
              <div
                className={`progress-bar ${animate ? 'animate' : ''}`}
                style={{ width: `${progress}%` }}
              />
            </div>
  
            <h2>Survey Form</h2>
            {submitted ? (
              <div>
                <p>Thank you for submitting the survey!</p>
                {Prediction !== null && (
                  <div>
                  <p>Your Score: {Prediction}</p>
                  <p>
                    {
                        `${Prediction}` >= `4` ? "You have chances of autism" : "You are fine"
                    }
                  </p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {questions.length > 0 && (
                  <div className='d-flex flex-column align-items-start justify-content-center h-100'>
                    <p style={{ fontFamily: 'Poppins', fontWeight: "600", fontSize: "18px" }}>{questions[currentQuestionIndex].text}</p>
                    {questions[currentQuestionIndex].options.map((option) => (
                      <label key={option} className='d-flex flex-row gap-1 m-1' style={{ fontFamily: 'Poppins', fontSize: "18px" }}>
                        <input
                          type="radio"
                          name={`question_${currentQuestionIndex}`}
                          value={option}
                          checked={answers[currentQuestionIndex] === option}
                          onChange={() => handleRadioChange(option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
                <div>
                  <button type="button" onClick={handlePrev} className='btn' disabled={currentQuestionIndex === 0}>
                    Previous
                  </button>
                  <button type="button" onClick={handleNext} className='btn' disabled={currentQuestionIndex === questions.length - 1 || answers[currentQuestionIndex] === undefined}>
                    Next
                  </button>
                  {currentQuestionIndex === questions.length - 1 && (
                    <button className='btn' disabled={answers[currentQuestionIndex] === undefined} type="submit">Submit</button>
                  )}
                </div>
              </form>
            )}
          </div>
        ) : (
          <div>
            <p>Please Signup to continue</p>
            <button onClick={handlenav}>Signup</button>
          </div>
        )}
      </div>
    );
};


export default Autisam;