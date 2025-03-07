import axios from "axios";
import API_ENDPOINTS from "../environment-config";

export const getPlayers = () => {
  return axios.get(API_ENDPOINTS.PLAYERS);
};

export const getTeams = () => {
  return axios.get(API_ENDPOINTS.TEAMS);
};

export const getPlayerById = (playerId) => {
  return axios.get(API_ENDPOINTS.PLAYER_BY_ID(playerId));
};

export const getTeamById = (teamId) => {
  return axios.get(API_ENDPOINTS.TEAM_BY_ID(teamId));
};
