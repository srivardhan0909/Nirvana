

// Inside MotivationalParticle.js
import React, { useEffect, useState } from "react";
import "../Css/Particle.css"; // Import the CSS file

function MotivationalParticle({ text, fontFamily, onRemove }) {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimate(false);
      onRemove();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [onRemove]);

  return (
    <div className={`motivational-particle ${animate ? "fade-in" : "fade-out"}`} style={{ fontFamily ,justifyContent:'center',alignItems:'center',display:'flex',}}>
      {text}
    </div>
  );
}

export default MotivationalParticle;