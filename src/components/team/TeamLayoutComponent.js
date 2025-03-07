import React from "react";
import "./TeamLayout.css";

const TeamLayoutComponent = ({ players }) => {
  const getPlayersByRole = (role) => {
    return players.filter((player) => player.playerRole === role);
  };

  const captain = players.reduce((prev, current) =>
    prev.dream11OldPoints > current.dream11OldPoints ? prev : current
  );
  const viceCaptain = players
    .filter((player) => player.playerId !== captain.playerId)
    .reduce((prev, current) =>
      prev.dream11OldPoints > current.dream11OldPoints ? prev : current
    );

  const totalPoints = players.reduce((sum, player) => {
    if (player.playerId === captain.playerId) {
      return sum + 2 * player.dream11OldPoints;
    } else if (player.playerId === viceCaptain.playerId) {
      return sum + 1.5 * player.dream11OldPoints;
    } else {
      return sum + player.dream11OldPoints;
    }
  }, 0);

  return (
    <div className="cricket-field">
      <div className="total-points-box">
        <h4>Total Points</h4>
        <p>{totalPoints}</p>
      </div>
      <div className="field-section wicket-keeper">
        {getPlayersByRole("Wicket Keeper").map((player) => (
          <PlayerCard
            key={player.playerId}
            allPlayers={players}
            player={player}
          />
        ))}
      </div>

      <div className="field-section batters">
        {getPlayersByRole("Batter").map((player) => (
          <PlayerCard
            key={player.playerId}
            allPlayers={players}
            player={player}
          />
        ))}
      </div>

      <div className="field-section all-rounders">
        {getPlayersByRole("All Rounder").map((player) => (
          <PlayerCard
            key={player.playerId}
            allPlayers={players}
            player={player}
          />
        ))}
      </div>

      <div className="field-section bowlers">
        {getPlayersByRole("Bowler").map((player) => (
          <PlayerCard
            key={player.playerId}
            allPlayers={players}
            player={player}
          />
        ))}
      </div>
    </div>
  );
};

const PlayerCard = ({ player, allPlayers }) => {
  const captain = allPlayers.reduce((prev, current) =>
    prev.dream11OldPoints > current.dream11OldPoints ? prev : current
  );
  const viceCaptain = allPlayers
    .filter((player) => player.playerId !== captain.playerId)
    .reduce((prev, current) =>
      prev.dream11OldPoints > current.dream11OldPoints ? prev : current
    );
  return (
    <div className="player-card">
      <div
        className={
          player.playerId === captain.playerId ||
          player.playerId === viceCaptain.playerId
            ? "player-image-container player-image-container-captain"
            : "player-image-container"
        }
      >
        <div className="player-image-container-img">
          <img src={player.playerImgUrl} alt={player.playerNickName} />
        </div>
        {player.playerId === captain.playerId && (
          <p className="player-leadership-role player-leadership-role-captain">
            C
          </p>
        )}
        {player.playerId === viceCaptain.playerId && (
          <p className="player-leadership-role player-leadership-role-vice-captain">
            VC
          </p>
        )}
      </div>
      <div className="player-info">
        <div
          className={
            player.playerId === captain.playerId ||
            player.playerId === viceCaptain.playerId
              ? "player-name player-name-captain"
              : "player-name"
          }
        >
          {player.playerNickName}
        </div>
        <div className="player-points">
          {player.playerId === captain.playerId
            ? 2 * player.dream11OldPoints
            : player.playerId === viceCaptain.playerId
            ? 1.5 * player.dream11OldPoints
            : player.dream11OldPoints}
        </div>
      </div>
    </div>
  );
};

export default TeamLayoutComponent;