import axios from "axios";
import API_ENDPOINTS from "../environment-config";

export const listTeams = () => {
  return axios.get(API_ENDPOINTS.TEAMS_LIST);
};

export const createTeam = (team) => {
  return axios.post(API_ENDPOINTS.CREATE_TEAM, team);
};

export const getTeamById = (teamId) => {
  return axios.get(API_ENDPOINTS.GET_TEAM_BY_ID(teamId));
};

export const updateTeam = (teamId, team) => {
  return axios.put(API_ENDPOINTS.UPDATE_TEAM(teamId), team);
};

export const deleteTeam = (teamId) => {
  return axios.delete(API_ENDPOINTS.DELETE_TEAM(teamId));
};
