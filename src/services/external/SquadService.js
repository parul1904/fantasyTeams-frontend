import axios from "axios";
import API_ENDPOINTS from "../environment-config";

export const listSquadsByTeam = (teamId) => {
  return axios.get(API_ENDPOINTS.SQUAD_LIST_BY_TEAM, teamId);
};
