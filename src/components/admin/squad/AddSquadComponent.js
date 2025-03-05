import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSquad } from "../../../services/admin/SquadService";
import {
  getTeams,
  getSeasons,
  getPlayers,
} from "../../../services/admin/DropDownService";
import Select from "react-select";

const AddSquadComponent = () => {
  const [squad, setSquad] = useState({
    seasonId: "",
    teamId: "",
    playerId: "",
  });

  const [teams, setTeams] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTeams()
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getSeasons()
      .then((response) => {
        setSeasons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getPlayers()
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSquad({ ...squad, [name]: value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setSquad({
      ...squad,
      [actionMeta.name]: selectedOption ? selectedOption.value : "",
    });
  };

  const saveSquad = (e) => {
    e.preventDefault();
    createSquad(squad)
      .then((response) => {
        navigate("/squads");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Add Squad</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label>Season</label>
              <Select
                name="seasonId"
                options={seasons.map((season) => ({
                  value: season.id,
                  label: season.name,
                }))}
                className="basic-single"
                classNamePrefix="select"
                onChange={handleSelectChange}
                isClearable
              />
            </div>

            <div className="form-group">
              <label>Team</label>
              <Select
                name="teamId"
                options={teams.map((team) => ({
                  value: team.id,
                  label: team.name,
                }))}
                className="basic-single"
                classNamePrefix="select"
                onChange={handleSelectChange}
                isClearable
              />
            </div>

            <div className="form-group">
              <label>Player</label>
              <Select
                name="playerId"
                options={players.map((player) => ({
                  value: player.id,
                  label: player.name,
                }))}
                className="basic-single"
                classNamePrefix="select"
                onChange={handleSelectChange}
                isClearable
              />
            </div>

            <button className="btn btn-success" onClick={saveSquad}>
              Save Squad
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSquadComponent;
