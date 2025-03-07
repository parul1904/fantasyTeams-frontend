import axios from "axios";
import API_ENDPOINTS from "../environment-config";

export const listStats = () => {
  return axios.get(API_ENDPOINTS.STATS_LIST);
};

export const createStats = (stats) => {
  return axios.post(API_ENDPOINTS.CREATE_STATS, stats);
};

export const getStatsById = (statsId) => {
  return axios.get(API_ENDPOINTS.GET_STATS_BY_ID(statsId));
};

export const getStatsByMatchId = (matchId) => {
  return axios.get(API_ENDPOINTS.GET_STATS_BY_MATCH_ID(matchId));
};

export const updateStats = (statsId, stats) => {
  return axios.put(API_ENDPOINTS.UPDATE_STATS(statsId), stats);
};

export const deleteStats = (statsId) => {
  return axios.delete(API_ENDPOINTS.DELETE_STATS(statsId));
};

export const getPlayerDetails = (playerId) => {
  return axios.get(API_ENDPOINTS.GET_PLAYER_DETAILS(playerId));
};
