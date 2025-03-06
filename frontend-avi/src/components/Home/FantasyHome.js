import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home({ onUserClick }) {
  const navigate = useNavigate();

  const handleUserClick = () => {
    onUserClick();
    navigate("/home");
  };

  return (
    <div className="fantasyHome">
      <div className="adminBtn">Admin</div>
      <div className="userBtn" onClick={handleUserClick}>
        User
      </div>
    </div>
  );
}
