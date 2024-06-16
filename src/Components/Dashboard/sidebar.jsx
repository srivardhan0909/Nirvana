import React from 'react'

import "../Css/Main.css"

import Icon from "./assests/main icon.png"
import DashboardIcon from "./assests/Frame.png"
import CalenderIcon from "./assests/Frame2.png"
import PersonIcon from "./assests/person-outline.png"
import ActivityIcon from "./assests/Activity.svg"

import { useNavigate } from "react-router-dom"; 
import SettingIcon from "./assests/Frame5.svg"
function Sidebar() {
  
  const navigate=useNavigate();
  return (
    <div className='bg-white box5  '>
      <div className='d-flex flex-column gap-5  align-items-center mt-4'>
        <button onClick={()=>{navigate('/Dashboard')}} className='  bg-white   border-0'><img className='img2 ' src={DashboardIcon}>
        </img></button>
        <button onClick={()=>{navigate('/profile')}} className='  bg-white   border-0'>
        <img style={{width:24}} src={PersonIcon}>
        </img></button>
      </div>
    </div>
  )
}

export default Sidebar