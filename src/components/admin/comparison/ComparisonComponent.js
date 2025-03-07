import React, { useState, useEffect } from "react";
import Select from "react-select";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  getPlayerById,
  listPlayers,
} from "../../../services/admin/PlayerService";
import { getTeamById, listTeams } from "../../../services/admin/TeamService";
import { getPlayerDetails } from "../../../services/admin/StatsService";
import Modal from "react-modal";

const ComparisonComponent = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedType, setSelectedType] = useState("player");
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [showSearch1, setShowSearch1] = useState(false);
  const [showSearch2, setShowSearch2] = useState(false);
  const [activeTab, setActiveTab] = useState("batting");

  useEffect(() => {
    loadPlayers();
    loadTeams();
  }, []);

  const loadPlayers = async () => {
    try {
      const response = await listPlayers();
      setPlayers(response.data);
      console.log("Players Data:: ", response.data);
    } catch (error) {
      console.error("Error loading players:", error);
    }
  };

  const loadTeams = async () => {
    try {
      const response = await listTeams();
      setTeams(response.data);
      console.log("Teams Data:: ", response.data);
    } catch (error) {
      console.error("Error loading teams:", error);
    }
  };

  const fetchData = async (id, setData) => {
    try {
      const response = await (selectedType === "player"
        ? getPlayerDetails(id)
        : getTeamById(id));
      setData(response.data);
      console.log("Data here is::", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTypeChange = (type) => {
    console.log("Type:: ", type);
    setSelectedType(type);
    setSelectedOption1(null);
    setSelectedOption2(null);
    setData1(null);
    setData2(null);
  };

  const handleOptionChange1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
    fetchData(selectedOption.value, setData1);
    setShowSearch1(false);
  };

  const handleOptionChange2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
    fetchData(selectedOption.value, setData2);
    setShowSearch2(false);
  };

  const playerOptions = players.map((player) => ({
    value: player.playerId,
    label: player.playerName,
    image: player.playerImgUrl,
  }));

  const teamOptions = teams.map((team) => ({
    value: team.teamId,
    label: team.teamName,
    image: team.teamLogoUrl,
  }));

  const options = selectedType === "player" ? playerOptions : teamOptions;

  const renderData = (data1, data2) => {
    if (!data1 || !data2) return null;

    const attributes = {
      batting: [
        { label: "Matches", key: "matchesPlayed" },
        { label: "Runs", key: "runsScored" },
        { label: "Average", key: "battingAverage" },
        { label: "Strike Rate", key: "strikeRate" },
        { label: "Fours", key: "fours" },
        { label: "Sixes", key: "sixes" },
        { label: "Half Centuries", key: "halfCentury" },
        { label: "Centuries", key: "century" },
        { label: "Best Score", key: "bestScore" },
      ],
      bowling: [
        { label: "Matches", key: "matchesPlayed" },
        { label: "Wickets", key: "totalWickets" },
        { label: "Average", key: "bowlingAverage" },
        { label: "Economy Rate", key: "economyRate" },
        { label: "Strike Rate", key: "bowlingStrikeRate" },
        { label: "3 Wicket Hauls", key: "threeWicketHauls" },
      ],
      fielding: [
        { label: "Matches", key: "matchesPlayed" },
        { label: "Catches", key: "catchTaken" },
        { label: "Stumpings", key: "stumping" },
      ],
    };

    const formatValue = (value) => {
      return typeof value === 'number' ? value.toFixed(2) : value;
    };

    return (
      <table className="table table-bordered table-striped" style={{width: "fit-content", margin: "0 auto"}}>
        <thead>
          <tr style={{ verticalAlign: "middle", textAlign: "center" }}>
            <th>{selectedOption1.label}</th>
            <th>Attribute</th>
            <th>{selectedOption2.label}</th>
          </tr>
        </thead>
        <tbody>
          {attributes[activeTab].map((attribute) => (
            <tr key={attribute.key} style={{textAlign: "center"}}>
              <td>{formatValue(data1[attribute.key])}</td>
              <td className="text-center">{attribute.label}</td>
              <td>{formatValue(data2[attribute.key])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6 text-center">
          <button
            className={`btn btn-${
              selectedType === "player" ? "primary" : "secondary"
            } m-2`}
            onClick={() => handleTypeChange("player")}
          >
            Player
          </button>
          <button
            className={`btn btn-${
              selectedType === "team" ? "primary" : "secondary"
            } m-2`}
            onClick={() => handleTypeChange("team")}
          >
            Team
          </button>
        </div>
      </div>
      <div className="row mb-4 d-flex justify-content-around flex-nowrap">
        <div className="col-5 d-flex position-relative">
          <div
            className="image-box text-center"
            onClick={() => setShowSearch1(true)}
            style={{
              border: "5px solid rgb(7, 7, 7)",
              borderRadius: "10px",
              padding: "2rem",
              cursor: "pointer",
              height: "30vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedOption1 ? (
             <LazyLoadImage
                src={selectedOption1.image}
                alt={selectedOption1.label}
                className="img-fluid"
                style={{
                  height: "30vh",
                  objectFit: "contain",
                  marginBottom: "1rem",
                }}
              />
            ) : (
              <span>
                Select {selectedType === "player" ? "Player" : "Team"} 1
              </span>
            )}
          </div>
          <Modal
            isOpen={showSearch1}
            onRequestClose={() => setShowSearch1(false)}
            contentLabel="Select Player or Team 1"
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "75%",
                height: "55%",
                maxWidth: "500px",
              },
            }}
          >
            <h2>Select {selectedType === "player" ? "Player" : "Team"} 1</h2>
            <Select
              options={options}
              onChange={handleOptionChange1}
              value={selectedOption1}
              placeholder={`Select ${
                selectedType === "player" ? "Player" : "Team"
              } 1`}
            />
          </Modal>
        </div>
        <div className="col-2 d-flex position-relative justify-content-center align-items-center">Vs</div>
        <div className="col-5 d-flex position-relative">
          <div
            className="image-box text-center"
            onClick={() => setShowSearch2(true)}
            style={{
              border: "5px solid rgb(7, 7, 7)",
              borderRadius: "10px",
              padding: "2rem",
              cursor: "pointer",
              height: "30vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedOption2 ? (
              <LazyLoadImage
                src={selectedOption2.image}
                alt={selectedOption2.label}
                className="img-fluid"
                style={{
                  height: "30vh",
                  objectFit: "contain",
                  marginBottom: "1rem",
                }}
              />
            ) : (
              <span>
                Select {selectedType === "player" ? "Player" : "Team"} 2
              </span>
            )}
          </div>
          <Modal
            isOpen={showSearch2}
            onRequestClose={() => setShowSearch2(false)}
            contentLabel="Select Player or Team 2"
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "75%",
                height: "55%",
                maxWidth: "500px",
              },
            }}
          >
            <h2>Select {selectedType === "player" ? "Player" : "Team"} 2</h2>
            <Select
              options={options}
              onChange={handleOptionChange2}
              value={selectedOption2}
              placeholder={`Select ${
                selectedType === "player" ? "Player" : "Team"
              } 2`}
            />
          </Modal>
        </div>
      </div>
      <div className="row mb-4 justify-content-center">
        <div className="col-md-8 text-center">
          <button
            className={`btn btn-${
              activeTab === "batting" ? "primary" : "secondary"
            } m-2`}
            onClick={() => setActiveTab("batting")}
          >
            Batting
          </button>
          <button
            className={`btn btn-${
              activeTab === "bowling" ? "primary" : "secondary"
            } m-2`}
            onClick={() => setActiveTab("bowling")}
          >
            Bowling
          </button>
          <button
            className={`btn btn-${
              activeTab === "fielding" ? "primary" : "secondary"
            } m-2`}
            onClick={() => setActiveTab("fielding")}
          >
            Fielding
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {data1 && data2 && renderData(data1, data2)}
        </div>
      </div>
    </div>
  );
};

export default ComparisonComponent;
