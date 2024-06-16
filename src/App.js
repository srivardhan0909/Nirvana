import React from 'react';
import './output.css';
import UserForm from "./Components/Profile/profileform";
import ProfilePage from "./Components/Profile/profile";
import SuccessPage from "./Components/Profile/successp";
import TopNavbar from "./Components/Navbar/Navbar";
import About from "./Components/About/about";
import Side from "./Components/Activities/side";
import UpdateUser from "./Components/Profile/updateUser";
import FirstLayout from "./Components/FirstSlide/First";
import ForgotPassword from "./Components/accountBox/Forgotpass";
import ResetPassword from "./Components/accountBox/Resetpass";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./Components/accountBox/Authform";
import Sidebar from "./Components/Dashboard/sidebar";
import GradioButton from './Components/chat_bot/GradioButton';
import './Components/chat_bot/GradioButton.css';
import Autisam from "./Components/ML_MODEL/Autisam/auti";
import DQuiz from "./Components/ML_MODEL/Dyslexia/templates/quiz"
import DSurvey from "./Components/ML_MODEL/Dyslexia/templates/survey";
import DResult from "./Components/ML_MODEL/Dyslexia/templates/result";
import Page from './Components/diseases/page'
import Anagram from "./Components/Game/Anagram";
import PuzzleApp from "./Components/PuzzleGame/components/PuzzleApp";
import DashboardMain from "./Components/Dashboard/dashboard-main";
import "./Components/Css/loginform.css"
import Gamepage from "./Components/GamePages/Gamepage";
import EmotionGame from "./Components/emotions/Game";
import Wackapp from "./Components/wack/App"
import ColourGame from "./Components/Colorgame/Colourgame";
import "./Components/Css/Navbar.css"
import Journal from './Components/journal/journal';
import Contact from './Components/contact/contact';
import Questionnaire from './Components/questionnaire/questionnaire';
function App() {
  return (
    <div>
      <BrowserRouter>
        <TopNavbar />
        <div className="content-wrappers"></div>
        <GradioButton />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FirstLayout />
              </>
            }
          ></Route>
          <Route
            path="/Dashboard"
            element={
              <div className="m-3">
                <DashboardMain />
              </div>
            }
          ></Route>
            <Route
              path="/updateUser"
              element={
                <div className="d-flex flex-row m-3 ">
                  <Sidebar />
                  <UpdateUser />
                </div>
              }
            ></Route>
            <Route
            path="/about"
            element ={
              <About/>
            }
            ></Route>
            <Route
            path="/journal"
            element ={
              <Journal/>
            }
            ></Route>
            <Route
            path="/contact"
            element ={
              <Contact/>
            }
            ></Route>
            <Route
            path="/activities"
            element ={
              <div>
                <Side/>
              </div>
            }
            ></Route>
          <Route
            path="/ProfileForm"
            element={
              <div className="d-flex flex-row m-3 ">
                <UserForm />
              </div>
            }
          ></Route>

          <Route
            path="/Profile"
            element={
              <div className="d-flex flex-row m-3 ">
                <Sidebar />
                <ProfilePage />
              </div>
            }
          ></Route>
          <Route
            path="/Successpage"
            element={
              <div className="d-flex flex-row m-3 ">
                <Sidebar />
                <SuccessPage />
              </div>
            }
          ></Route>
          <Route
            path="/login"
            element={
             <AuthForm/>
            }
          ></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path='/reset_password/:id/:token' element={<ResetPassword />}></Route>
          <Route
            path="/autism"
            element={ 
            <div className=" m-0 gap-0 "><Autisam></Autisam></div>}>
          </Route>
          <Route
            path="/DQuiz"
            element={
                <DQuiz />
            }
          ></Route>
          <Route
            path="/DSurvey"
            element={
                <DSurvey />
            }
          ></Route>
          <Route
            path="/DResult"
            element={
                <DResult />
            }
          ></Route>
          <Route path='/questionnaire'
          element={
                <Questionnaire/>
          }>
          </Route>
          <Route path="/AnagramGame"
          element={
                <Anagram/>
          }>
          </Route>
          <Route path="/PuzzleGame"
          element={
            <>
            <PuzzleApp/>
                </>
          }>
          </Route>
          <Route path="/gamepage" 
          element={
            <Gamepage/>
            }>
          </Route>
          <Route path="/EmotionGame" 
          element={
            <EmotionGame/>
            }>
          </Route>
          <Route path="/WackGame" 
          element={
            <Wackapp/>
            }>
          </Route>
          <Route path="/ColourGame" 
          element={
            <ColourGame/>
            }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
