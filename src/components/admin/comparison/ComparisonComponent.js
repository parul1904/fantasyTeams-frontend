import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getPlayerById, listPlayers } from "../../../services/admin/PlayerService";
import { getTeamById, listTeams } from "../../../services/admin/TeamService";
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

  const handleTypeChange = (type) => {
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

  const fetchData = async (id, setData) => {
    try {
      const response = await (selectedType === "player"
        ? getPlayerById(id)
        : getTeamById(id));
      setData(response.data);
      console.log('Data here is::',response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Comparison</h2>
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3 text-center">
          <button
            className={`btn btn-${selectedType === "player" ? "primary" : "secondary"} m-2`}
            onClick={() => handleTypeChange("player")}
          >
            Player
          </button>
          <button
            className={`btn btn-${selectedType === "team" ? "primary" : "secondary"} m-2`}
            onClick={() => handleTypeChange("team")}
          >
            Team
          </button>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 position-relative">
          <div
            className="col-md-6 position-relative text-center" style={{ border: "5px solid rgb(7, 7, 7)", borderRadius: "10px", padding: "20px" }}
            onClick={() => setShowSearch1(true)}
          >
            {selectedOption1 ? (
              <img
              src={selectedOption1.image}
              alt={selectedOption1.label}
              className="card-img-top"
              style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  objectPosition: "top",
              }}
          />
            ) : (
              <span>Select {selectedType === "player" ? "Player" : "Team"} 1</span>
            )}
          </div>
          <Modal
            isOpen={showSearch1}
            onRequestClose={() => setShowSearch1(false)}
            contentLabel="Select Player or Team 1"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: '500px',
              },
            }}
          >
            <h2>Select {selectedType === "player" ? "Player" : "Team"} 1</h2>
            <Select
              options={options}
              onChange={handleOptionChange1}
              value={selectedOption1}
              placeholder={`Select ${selectedType === "player" ? "Player" : "Team"} 1`}
            />
          </Modal>
        </div>
        <div className="col-md-6 position-relative">
        <div
            className="col-md-6 position-relative text-center" style={{ border: "5px solid rgb(7, 7, 7)", borderRadius: "10px", padding: "20px" }}
            onClick={() => setShowSearch2(true)}
          >
            {selectedOption2 ? (
              <img
              src={selectedOption2.image}
              alt={selectedOption2.label}
              className="card-img-top"
              style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  objectPosition: "top",
              }}
          />
            ) : (
              <span>Select {selectedType === "player" ? "Player" : "Team"} 2</span>
            )}
          </div>
          <Modal
            isOpen={showSearch2}
            onRequestClose={() => setShowSearch2(false)}
            contentLabel="Select Player or Team 2"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: '500px',
              },
            }}
          >
            <h2>Select {selectedType === "player" ? "Player" : "Team"} 2</h2>
            <Select
              options={options}
              onChange={handleOptionChange2}
              value={selectedOption2}
              placeholder={`Select ${selectedType === "player" ? "Player" : "Team"} 2`}
            />
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {data1 && (
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                {selectedOption1.label}
              </div>
              <div className="card-body">
                {/* Display data1 details here */}
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6">
          {data2 && (
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                {selectedOption2.label}
              </div>
              <div className="card-body">
                {/* Display data2 details here */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonComponent;