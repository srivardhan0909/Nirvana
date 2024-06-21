import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import logo2 from "../Navbar/icons8-health-64.png";
import user_icon from "../Navbar/user-circle.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./nav.css";

function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [propt, setPropt] = useState(localStorage.getItem("name"));
  const [signup, setSignup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(
    localStorage.getItem("questionnaireCompleted") === "true"
  );

  useEffect(() => {
    setPropt(localStorage.getItem("name"));
    if (localStorage.getItem("name")) {
      setSignup(true);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/Login") {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  function handleClick() {
    localStorage.clear();
    setSignup(false);
    navigate("/");
  }

  function handleDoubleClick() {
    setShowDropdown((prev) => !prev);
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar navbar-expand-lg fixed-top navbar-shadow navbar-custom"
    >
      <Container fluid>
        <Navbar.Brand className="navbar-brand" href="/">
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Poppins" }}>
            <img src={logo2} style={{ height: "50px" }} alt="logo" />
            <span className="" style={{ fontWeight: 900, fontSize: 35 }}>NIRVANA</span>
          </div>
        </Navbar.Brand>
        <div style={{ flexGrow: 3 }}></div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{ fontFamily: "Poppins" }}>
            <CustomNavLink href="/" isActive={location.pathname === "/"}>Home</CustomNavLink>
            {signup && (
              <>
                <CustomNavLink href="/activities" isActive={location.pathname === "/activities"}>Activities</CustomNavLink>
                <CustomNavLink href="/gamepage" isActive={location.pathname === "/gamepage"}>Relax-Play</CustomNavLink>
                <CustomNavLink href="/Dashboard" isActive={location.pathname === "/Dashboard"}>Dashboard</CustomNavLink>
                <CustomNavLink href="/journal" isActive={location.pathname === "/journal"}>Journal</CustomNavLink>
              </>
            )}
            <CustomNavLink href="/about" isActive={location.pathname === "/about"}>About</CustomNavLink>
          </Nav>
          <Nav style={{ fontFamily: "Poppins" }}>
            <div className="d-flex gap-1">
              {signup ? (
                <div className="user-icon-container" onDoubleClick={handleDoubleClick}>
                  <img
                    src={user_icon}
                    alt="User"
                    width="40"
                    height="40"
                    className="user-icon"
                  />
                  {showDropdown && (
                    <div className="user-dropdown" ref={dropdownRef}>
                      <h6>Welcome back,</h6>
                      <h5>{propt}</h5>
                      <button
                        style={{ borderRadius: "20px", height: "45px" }}
                        onClick={handleClick}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Nav.Link
                  href="/questionnaire"
                  className={`nav-link ${location.pathname === "/Login" ? "active" : ""}`}
                  onClick={() => {
                    if (!questionnaireCompleted) {
                      alert("Please complete the questionnaire before logging in.");
                      navigate("/questionnaire");
                    } else {
                      navigate("/Login");
                    }
                  }}
                >
                  Login
                </Nav.Link>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const CustomNavLink = ({ href, isActive, children }) => {
  return (
    <div className={`nav-link-container ${isActive ? "active" : ""}`}>
      <Nav.Link
        href={href}
        className={`nav-link ${isActive ? "active" : ""}`}
        style={{ marginRight: "5px" }}
      >
        {children}
      </Nav.Link>
    </div>
  );
};

export default TopNavbar;
