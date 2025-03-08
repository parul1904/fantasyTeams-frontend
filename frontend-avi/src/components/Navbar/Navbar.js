import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../../assets/Navbar/logo.png";

export default function NavBar() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  const handleTeams = () => {
    navigate("/teams");
  };

  const handleMatches = () => {
    navigate("/matches");
  };

  const handleMatchCentre = () => {
    navigate("/matchcentre");
  };

  const handleAboutUs = () => {
    navigate("/aboutus");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img
            src={logo}
            alt="brandLogo"
            style={{
              height: "3rem",
              marginRight: "0.5rem",
            }}
          />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <div className="nav-item nav-link" onClick={handleHome}>
              Home
            </div>
            <div className="nav-item nav-link" onClick={handleTeams}>
              Teams
            </div>
            <div className="nav-item nav-link" onClick={handleMatches}>
              Matches
            </div>
            <div className="nav-item nav-link" onClick={handleAboutUs}>
              About Us
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
