// Inside Page.js
import React, { useEffect, useState } from "react";
import "../Css/Page.css"; // Import the CSS file
import MotivationalParticle from "./MotivationalParticle"; // Import the MotivationalParticle component
import sun2 from "./assests/sun2.png";
import { useNavigate } from "react-router-dom"; 
function Page() {
    const navigate=useNavigate()
  const [showTextADHD, setShowTextADHD] = useState(false);
  const [showTextDyslexia, setShowTextDyslexia] = useState(false);
  const [showTextAutism, setShowTextAutism] = useState(false);
  const [motivationalText, setMotivationalText] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    startMotivationalText();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const startMotivationalText = () => {
    const texts = [
      "Your potential is limitless.",
      "Believe in yourself.",
      "Stay focused, stay positive.",
      "Success begins with you.",
      "Keep pushing forward.",
      "Make today amazing.",
      "You've got this!",
      "Be unstoppable.",
      "Every day is a new beginning.",
      "Chase your dreams.",
      "You are enough.",
      "Seize the day.",
      "Stay positive, stay fighting.",
      "Small steps lead to big results.",
      "You are a force of nature.",
      "Hard work pays off.",
      "Rise and grind.",
      "Your journey matters.",
      "Start where you are.",
      "You are in control.",
      "Stay determined.",
      "Believe in your potential.",
      "You are capable of amazing things.",
      "Strive for progress, not perfection.",
      "Today's mindset determines tomorrow's success.",
      "The best is yet to come.",
      "Keep moving forward.",
      "You are stronger than you know.",
      "Your vibe attracts your tribe.",
      "Progress, not perfection.",
      "Your time is now.",
      "Small changes, big results.",
      "Make it happen.",
      "Stay positive, work hard, make it happen.",
      "Do it with passion or not at all.",
      "Every moment is a fresh beginning.",
      "Be the energy you want to attract.",
      "You are the creator of your own destiny.",
      "Strive for greatness.",
      "Your effort is your contribution.",
      "You are on the path to success.",
      "Believe in the magic within you.",
      "The future is bright.",
      "Success is a journey, not a destination.",
      "You are one decision away from a different life.",
      "Your potential is your power.",
      "Stay positive, work hard, and make it happen.",
      "You have the power to create change.",
      "Every day is a new opportunity to change your life.",
      "Strive for progress, not perfection.",
      "Believe in the process.",
      "Your attitude determines your direction.",
      "You are capable of more than you know.",

      "You're closer than you were yesterday.",
      "The best way to predict the future is to create it.",
      "Your only limit is you.",
      "The secret of getting ahead is getting started.",
      "Believe in yourself and all that you are.",
      "Don't stop until you're proud.",
      "Your potential is endless.",
      "Doubt kills more dreams than failure ever will.",

      "It always seems impossible until it's done.",
      "Don't count the days, make the days count.",
    ];

    let index = 0;

    const id = setInterval(() => {
      setMotivationalText(texts[index]);
      index = (index + 1) % texts.length;
    }, 5000);

    setIntervalId(id);
  };

  const removeMotivationalText = () => {
    setMotivationalText(""); // Clear the text
  };
  console.log(window.innerWidth);

  return (
    <div className="">
      <div id="" className="" style={{ zIndex: 1 }}></div>
      <div className="d-flex flex-row">
        <div className=" gap-3  m-3 d-flex flex-column">
          <button
            className="square-button b"
            onClick={()=>{navigate('/dquiz')}}
            onMouseEnter={() => setShowTextDyslexia(true)}
            onMouseLeave={() => setShowTextDyslexia(false)}
          >
            Dyslexia
          </button>
          <button
            className="square-button b1"
            onClick={()=>{navigate('/autism')}}
            onMouseEnter={() => setShowTextAutism(true)}
            onMouseLeave={() => setShowTextAutism(false)}
          >
            Autism
          </button>
        </div>
        <div className="square-button2 b4 text-center  me-3 my-3 d-flex flex-column">
          {motivationalText ? (
            <MotivationalParticle
              key={1}
              text={motivationalText}
              onRemove={removeMotivationalText}
            />
          ) : (
            <h1
              style={{
                fontSize: "25px",
                color: "#ff730042", // Default color
                fontWeight: "bold",
              }}
            >
              Dream it. Believe it. Achieve it.
            </h1>
          )}
          <img src={sun2} className="rotating-image" alt="Sun"></img>
          {showTextDyslexia && (
            <>
              <div className="d-flex flex-column justify-content-center align-items-center ">
                <div className="">
                  <h1>Dyslexia</h1>
                </div>

                <div className="d-flex flex-row mt-4  ">
                  <div
                    className="text-section "
                    style={{
                      gap: "100px",
                      paddingInlineStart: "20px",
                      paddingInlineEnd: "20px",
                    }}
                  >
                    Dyslexia is a common learning difference affecting reading, writing, and spelling.
                    Despite normal intelligence, individuals with dyslexia 
                    struggle with decoding words and comprehending text.
                  </div>
                  {window.innerWidth >= 750 && (
                    <div
                      className="text-section "
                      style={{
                        gap: "100px",
                        borderLeft: "3.5px dashed #000",
                        borderRight: "2px dashed #000",
                        paddingInlineStart: "20px",
                        paddingInlineEnd: "20px",
                      }}
                    >
                      Dyslexia's roots lie in brain structure differences affecting language processing.
                      Genetics and early language exposure influence its severity.
                    </div>
                  )}
                  {window.innerWidth >= 620 && (
                    <div
                      className="text-section "
                      style={{
                        borderLeft: "2px dashed #000",
                        gap: "100px",
                        paddingInlineStart: "20px",
                      }}
                    >
                      Early detection and tailored interventions, like structured literacy 
                      programs and assistive tech, help individuals with dyslexia succeed academically.
                      Inclusive environments and accommodations are vital for their full potential.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {showTextAutism && (
            <>
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="">
                  <h1>Autism</h1>
                </div>

                <div className="d-flex flex-row mt-4 ">
                  <div
                    className="text-section "
                    style={{
                      gap: "100px",
                      paddingInlineStart: "20px",
                      paddingInlineEnd: "20px",
                    }}
                  >
                    Autism Spectrum Disorder (ASD) is a complex
                    neurodevelopmental condition that manifests in diverse
                    behaviors, social interactions, communication styles, and
                    interests.
                  </div>
                  {window.innerWidth >= 750 && (
                    <div
                      className="text-section "
                      style={{
                        gap: "100px",
                        borderLeft: "3.5px dashed #000",
                        borderRight: "2px dashed #000",
                        paddingInlineStart: "20px",
                        paddingInlineEnd: "20px",
                      }}
                    >
                      Individuals with autism may experience challenges in
                      social communication and engage in repetitive behaviors.
                    </div>
                  )}
                  {window.innerWidth >= 620 && (
                    <div
                      className="text-section "
                      style={{
                        borderLeft: "2px dashed #000",
                        gap: "100px",
                        paddingInlineStart: "20px",
                      }}
                    >
                      The autism spectrum encompasses a broad range of abilities
                      and challenges, and early intervention, supportive
                      therapies, and individualized education plans can enhance
                      quality of life.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
