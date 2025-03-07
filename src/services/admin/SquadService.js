import axios from "axios";
import API_ENDPOINTS from "../environment-config";

export const listSquads = () => {
  return axios.get(API_ENDPOINTS.SQUAD_LIST);
};

export const createSquad = (squad) => {
  return axios.post(API_ENDPOINTS.CREATE_SQUAD, squad);
};

export const getSquadById = (squadId) => {
  return axios.get(API_ENDPOINTS.GET_SQUAD_BY_ID(squadId));
};

export const updateSquad = (squadId, squad) => {
  return axios.put(API_ENDPOINTS.UPDATE_SQUAD(squadId), squad);
};

export const deleteSquad = (squadId) => {
  return axios.delete(API_ENDPOINTS.DELETE_SQUAD(squadId));
};

export const listSquadsByTeam = (teamId) => {
  return axios.get(API_ENDPOINTS.GET_SQUAD_BY_TEAM(teamId));
};
