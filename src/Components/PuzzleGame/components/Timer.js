import React, { useEffect } from "react";

const Timer = ({ time, timerActive, setTime }) => {
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive, setTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return <span>{formatTime(time)}</span>;
};

export default Timer;
