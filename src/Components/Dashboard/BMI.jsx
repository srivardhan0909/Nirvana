import React from "react";
import "../Css/Main.css";
import heightBar from "./assests/height-bar.png"
function BMI() {
  return (
    <div className=" d-flex gap-2 flex-column box5 text-white">
      <div className="m-4">BMI Calculator</div>
      <div className="grid box6 d-flex text-black align-items-center ms-4 row">
        <img src={heightBar } className="img1">
        </img>
        <div className="mb-4 d-flex flex-row gap-5">
        
            Height
            <div>
                170cm
            </div>
        </div>

      </div>
      <div className="grid box7 d-flex text-black align-items-center ms-4 row">
        <img src={heightBar } className="img1">
        </img>
        <div className="mb-4 d-flex flex-row gap-5">
           Weight
            <div>
               72kg
            </div>
        </div>

      </div>
    </div>
  );
}

export default BMI;
