import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './questionnaire.css';

const preLoginQuestions = [
  {
    question: "Rate your mood (down, depressed, or hopeless).",
    imageUrl: "https://img.freepik.com/premium-photo/man-with-depression-mental-health-concept-ai-generated_145713-7751.jpg"
  },
  {
    question: "Rate your interest or pleasure in activities.",
    imageUrl: "https://img.freepik.com/premium-photo/vector-students-sitting-circle_731790-11862.jpg?w=360"
  },
  {
    question: "Rate your anxiety or worry.",
    imageUrl: "https://neurosciencenews.com/files/2021/11/ai-anxiety-neurosinces-public.jpg"
  },
  {
    question: "Rate your sleep quality.",
    imageUrl: "https://media.licdn.com/dms/image/D4D10AQGuFwgVhGNdqA/image-shrink_800/0/1690246803076?e=2147483647&v=beta&t=knzoIKCPnxU8IwWqz_Jv9jbNQ8EPjpbuFgs_4_aCZ-U"
  }
];

const postLoginQuestions = [
  {
    question: "Rate your mood today vs. when you started using our website.",
    imageUrl: "https://qwaiting.com/images/feedback.png"
  },
  {
    question: "Improvement in managing stress since using our website?",
    imageUrl: "https://media.licdn.com/dms/image/D4D12AQHO5VB375BfdQ/article-cover_image-shrink_720_1280/0/1685096016721?e=2147483647&v=beta&t=7iFAFOWp4Rr1evHjgYTDmP83lMg33GgJuaQKv8-7BjM"
  },
  {
    question: "Frequency of practicing coping strategies from our website?",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnc3tiH40q5sVODZRbDEewWKaZa1H8I5Eb-Acw4rRTATYic4EfUWKmMsiHZiXtjiwMZto&usqp=CAU"
  },
  {
    question: "Effectiveness of our resources and tools for mental health?",
    imageUrl: "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_23295_16680815010862881.jpg"
  },
  {
    question: "Rate your memory and cognitive functions since using our website.",
    imageUrl: "https://altoida.com/wp-content/uploads/2022/01/shutterstock_1979718854-scaled.jpg"
  },
  {
    question: "Rate your overall happiness since using our website.",
    imageUrl: "https://the-happy-manager.com/wp-content/uploads/smiley-2979107_1920-300x169.jpg"
  },
  {
    question: "Rate your ability to handle depressive symptoms since using our website.",
    imageUrl: "https://images.everydayhealth.com/images/emotional-health/depression/coping-with-depression-a-guide-to-good-treatment-1440x810.jpg"
  }
];

function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("name") !== null);
  }, []);

  useEffect(() => {
    const questions = isLoggedIn ? postLoginQuestions : preLoginQuestions;
    setResponses(Array(questions.length).fill(1));
  }, [isLoggedIn]);

  const questions = isLoggedIn ? postLoginQuestions : preLoginQuestions;

  const handleResponseChange = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = parseInt(value, 10);
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const poorResponses = responses.filter(response => response < 3).length;
      if (poorResponses > 2 && !isLoggedIn) {
        navigate('/contact');
      } else {
        localStorage.setItem("questionnaireCompleted", "true");
        alert('Questionnaire completed. You can now continue using the platform.');
        if (!isLoggedIn) {
          navigate('/Login');
        } else {
          const scores = calculateScores(responses);
          localStorage.setItem("postLoginScores", JSON.stringify(scores));
          navigate('/');
        }
      }
    }
  };

  const calculateScores = (responses) => {
    return {
      normal: responses[0] > 3 ? 'high' : 'avg',
      depression: responses[1] > 3 ? 'low' : 'high',
      anxiety: responses[2] > 3 ? 'low' : 'high',
      relax: responses[3] > 3 ? 'low' : 'high',
      memory: responses[4] > 3 ? 'high' : 'avg',
      happy: responses[5] > 3 ? 'high' : 'avg',
      depressiveSymptoms: responses[6] > 3 ? 'low' : 'high',
    };
  };

  const getScalePercentage = () => {
    return (responses[currentQuestionIndex] / 5) * 100;
  };

  return (
    <div className="questionnaire-modal">
      <h1>Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        <div className="question">
          <div className="content">
            <label>{questions[currentQuestionIndex].question}</label>
            <div className="options">
              <label>
                <input
                  type="radio"
                  name="response"
                  value={1}
                  checked={responses[currentQuestionIndex] === 1}
                  onChange={() => handleResponseChange(1)}
                />
                <div>Poor</div>
              </label>
              <label>
                <input
                  type="radio"
                  name="response"
                  value={2}
                  checked={responses[currentQuestionIndex] === 2}
                  onChange={() => handleResponseChange(2)}
                />
                <div>Unwell</div>
              </label>
              <label>
                <input
                  type="radio"
                  name="response"
                  value={3}
                  checked={responses[currentQuestionIndex] === 3}
                  onChange={() => handleResponseChange(3)}
                />
                <div>Average</div>
              </label>
              <label>
                <input
                  type="radio"
                  name="response"
                  value={4}
                  checked={responses[currentQuestionIndex] === 4}
                  onChange={() => handleResponseChange(4)}
                />
                <div>Well</div>
              </label>
              <label>
                <input
                  type="radio"
                  name="response"
                  value={5}
                  checked={responses[currentQuestionIndex] === 5}
                  onChange={() => handleResponseChange(5)}
                />
                <div>Good</div>
              </label>
            </div>
            <div className="scale-bar">
              <div className="scale-fill" style={{ width: `${getScalePercentage()}%` }}></div>
            </div>
          </div>
          <img src={questions[currentQuestionIndex].imageUrl} alt="question visual" />
        </div>
        <button type="submit">{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default Questionnaire;
