import React from "react";
import "./Squad.css";

export default function Squad({ selectedTeam }) {
  return (
    <div
      className="card p-2 sqaudCard"
      style={{ backgroundColor: `${selectedTeam.color}` }}
    ></div>
  );
}
