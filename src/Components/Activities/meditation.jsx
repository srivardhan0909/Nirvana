import React, { useState, useEffect, useRef } from "react";
import BreatheBubble from "./BreatheBubble";
import './medi.css'; // Ensure you import the CSS

function Meditation() {
  const [seconds, setSeconds] = useState(300); // 5 minutes default countdown
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(300); // Store initial time
  const [inputMinutes, setInputMinutes] = useState(''); // Input for minutes
  const audioRef = useRef(null); // Reference to the audio element

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            if (audioRef.current) {
              audioRef.current.play(); // Play the alarm sound
            }
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleRestart = () => {
    setIsActive(false);
    setSeconds(initialTime);
  };

  const handleTimeChange = (e) => {
    const timeInMinutes = e.target.value;
    setInputMinutes(timeInMinutes);
    const timeInSeconds = timeInMinutes * 60;
    setIsActive(false);
    setSeconds(timeInSeconds);
    setInitialTime(timeInSeconds);
  };

  document.body.style.overflow = "hidden";

  return (
    <div className="container-fluids d-flex flex-column justify-content-center align-items-center" style={{ overflow: "hidden" }}>
      <div className="row justify-content-center mb-4 w-100">
        <div className="col-md-8 text-center">
          <div className="d-flex xl-2 p-2 justify-content-between align-items-center">
            <div className="form-floating" style={{ width: "700px", marginLeft: "170px" }}>
              <input
                type="number"
                className="form-control"
                id="floatingTimeInput"
                value={inputMinutes}
                onChange={handleTimeChange}
                min="1"
                placeholder="Enter time in minutes for meditation"
              />
              <label htmlFor="floatingTimeInput">Enter time in minutes for meditation</label>
            </div>
          </div>
          <div className="timer mt-1" style={{ display: "flex", alignItems: "center", fontFamily: 'Poppins', marginLeft: "200px" }}>
            {formatTime(seconds)}
            <div className="mt-1" style={{ flexGrow: 0.3, marginLeft: "20px" }}></div>
            <h4>Meditation Timer</h4>
          </div>
          <div style={{ marginLeft: "210px", marginTop: "70px", marginBottom: "80px" }}>
            <BreatheBubble isActive={isActive} />
          </div>
          <div className="btn-group" role="group" aria-label="Basic outlined example" style={{ marginLeft: "120px" }}>
            <button className="btn btn-primary me-2" onClick={handleStart}>
              Start
            </button>
            <button className="btn btn-danger me-2" onClick={handleStop}>
              Stop
            </button>
            <button className="btn btn-warning" onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src="https://www.orangefreesounds.com/wp-content/uploads/2020/05/Alarm-ringtone.mp3" preload="auto"></audio> {/* Alarm sound */}
    </div>
  );
}

export default Meditation;
