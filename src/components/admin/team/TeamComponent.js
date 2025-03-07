import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateTeam,
  createTeam,
  getTeamById,
} from "../../../services/admin/TeamService";

const TeamComponent = () => {
  const [teamName, setTeamName] = useState("");
  const [teamShortName, setTeamShortName] = useState("");
  const [teamLogoUrl, setTeamLogoUrl] = useState("");
  const [captain, setCaptain] = useState("");
  const [coach, setCoach] = useState("");
  const [venue, setVenue] = useState("");
  const [titleWon, setTitleWon] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateTeam = (e) => {
    e.preventDefault();

    const team = {
      teamName,
      teamShortName,
      teamLogoUrl,
      captain,
      coach,
      venue,
      titleWon,
    };

    console.log(team);
    if (id) {
      updateTeam(id, team)
        .then((response) => {
          navigate("/teams");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createTeam(team)
        .then((response) => {
          console.log(response.data);
          navigate("/teams");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      getTeamById(id)
        .then((response) => {
          setTeamName(response.data.teamName);
          setTeamShortName(response.data.teamShortName);
          setTeamLogoUrl(response.data.teamLogoUrl);
          setCaptain(response.data.captain);
          setCoach(response.data.coach);
          setVenue(response.data.venue);
          setTitleWon(response.data.titleWon);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Team</h2>;
    } else {
      return <h2 className="text-center">Add Team</h2>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {userRole === "admin" && pageTitle()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Team Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Team name"
                    name="teamName"
                    className="form-control"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Team Short Name :</label>
                  <input
                    type="text"
                    placeholder="Enter Team Short name"
                    name="teamShortName"
                    className="form-control"
                    value={teamShortName}
                    onChange={(e) => setTeamShortName(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Team Logo Url :</label>
                  <input
                    type="text"
                    placeholder="Enter Logo Url"
                    name="teamLogoUrl"
                    className="form-control"
                    value={teamLogoUrl}
                    onChange={(e) => setPlayerImgUrl(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Team Captain :</label>
                  <input
                    type="text"
                    placeholder="Enter Team Captain"
                    name="captain"
                    className="form-control"
                    value={captain}
                    onChange={(e) => setRole(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Team Coach :</label>
                  <input
                    type="text"
                    placeholder="Enter Team Coach"
                    name="coach"
                    className="form-control"
                    value={coach}
                    onChange={(e) => setRole(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Team Venue :</label>
                  <input
                    type="text"
                    placeholder="Enter Team Venue"
                    name="venue"
                    className="form-control"
                    value={venue}
                    onChange={(e) => setRole(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Title Won :</label>
                  <input
                    type="text"
                    placeholder="Enter Title Won"
                    name="titleWon"
                    className="form-control"
                    value={titleWon}
                    onChange={(e) => setRole(e.target.value)}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateTeam(e)}
                >
                  Submit{" "}
                </button>
                {/* <Link to="/teams" className="btn btn-danger"> Cancel </Link> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerComponent;
