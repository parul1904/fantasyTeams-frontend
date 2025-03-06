import React, { useState } from "react";
import "./teamDetails.css";
import teamDetailsData from "./teamDetailsData.json";
import SelectedTeam from "./SelectedTeam";

export default function TeamDetails() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="teamDetails lg-expand">
      <div className="teamRow">
        {teamDetailsData.map((team) => {
          const imagePath = require(`../../assets/teamLogo/${team.image}`);
          return (
            <div
              className={`card teamCard ${
                selectedTeam && selectedTeam.id === team.id ? "selected" : ""
              }`}
              key={team.id}
              style={{ backgroundColor: `${team.color}` }}
              onClick={() => handleTeamClick(team)}
            >
              <img src={imagePath} alt={team.name} style={{ height: "5rem" }} />
            </div>
          );
        })}
      </div>
      {selectedTeam && <SelectedTeam selectedTeam={selectedTeam} />}
    </div>
  );
}
