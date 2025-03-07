import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getPlayerById } from "../../../services/admin/PlayerService";
import { getPlayerDetails } from "../../../services/admin/StatsService";

const PlayerProfileComponent = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetchPlayerData();
  }, []);

  const fetchPlayerData = async () => {
    try {
      const response = await getPlayerDetails(playerId);
      setPlayer(response.data);
      console.log("Player Stats:: ", response.data);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  if (!player) {
    return <div>Loading...</div>;
  }

return (
    <div className="container mt-4">
        <h2 className="text-center mb-4">Player Profile</h2>
        <div className="card mb-4">
            <div className="card-header bg-primary text-white">Basic Details</div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-3 position-relative text-center" style={{ border: "5px solid rgb(7, 7, 7)", borderRadius: "10px", padding: "20px" }}>
                      <LazyLoadImage
                            src={player.playerImgUrl}
                            alt={player.player}
                            className="card-img-top"
                            style={{
                                width: "100%",
                                height: "300px",
                                objectFit: "cover",
                                objectPosition: "top",
                            }}
                        />
                       <LazyLoadImage
                            src={`https://fantasyteams.s3.ap-south-1.amazonaws.com/others/${player.playerCountry}.png`}
                            alt={player.playerCountry}
                            className="position-absolute"
                            style={{
                                width: "50px",
                                height: "35px",
                                top: "10px",
                                right: "10px",
                            }}
                        />
                        <h3
                            className="card-text"
                            style={{
                                width: "100%",
                                margin: "0",
                            }}
                        >
                            <strong>{player.player}</strong>
                        </h3>
                    </div>
                </div>
            </div>
        </div>

        <div className="card mb-4">
            <div className="card-header bg-success text-white">
                Batting & Fielding Stats
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Matches</th>
                                <th>Innings</th>
                                <th>Runs</th>
                                <th>Balls Faced</th>
                                <th>4's</th>
                                <th>6's</th>
                                <th>Average</th>
                                <th>Strike Rate</th>
                                <th>Fifties</th>
                                <th>Hundreds</th>
                                <th>Best Batting Score</th>
                                <th>Catches</th>
                                <th>Stumping</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{player.seasonYear}</td>
                                <td>{player.matchesPlayed}</td>
                                <td>{player.battingInnsPlayed}</td>
                                <td>{player.runsScored}</td>
                                <td>{player.ballFaced}</td>
                                <td>{player.fours}</td>
                                <td>{player.sixes}</td>
                                <td>{player.battingAverage}</td>
                                <td>{player.strikeRate}</td>
                                <td>{player.halfCentury}</td>
                                <td>{player.century}</td>
                                <td>{player.bestScore}</td>
                                <td>{player.catchTaken}</td>
                                <td>{player.stumping}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="card mb-4">
            <div className="card-header bg-warning text-white">Bowling Stats</div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Matches</th>
                                <th>Innings</th>
                                <th>Balls</th>
                                <th>Runs</th>
                                <th>Wickets</th>
                                <th>Best Bowling Figure</th>
                                <th>Average</th>
                                <th>Economy Rate</th>
                                <th>Strike Rate</th>
                                <th>Three Wicket Hauls</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{player.seasonYear}</td>
                                <td>{player.matchesPlayed}</td>
                                <td>{player.bowlingInnsPlayed}</td>
                                <td>{player.overs}</td>
                                <td>{player.runsConceded}</td>
                                <td>{player.totalWickets}</td>
                                <td>{player.bestFigure}</td>
                                <td>{player.bowlingAverage}</td>
                                <td>{player.economyRate}</td>
                                <td>{player.bowlingStrikeRate}</td>
                                <td>{player.threeWicketHauls}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);
};

export default PlayerProfileComponent;
