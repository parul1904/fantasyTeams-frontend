import axios from "axios";

const STATS_BASE_REST_API_URL = "http://43.204.102.164:8080/api/v1/stats";

export const listStats = () => {
  return axios.get(STATS_BASE_REST_API_URL);
};

export const createStats = (stats) => {
  return axios.post(STATS_BASE_REST_API_URL + "/add-stats", stats);
};

export const getStatsById = (statsId) => {
  return axios.get(STATS_BASE_REST_API_URL + "/" + statsId);
};

export const getStatsByMatchId = (matchId) => {
  return axios.get(STATS_BASE_REST_API_URL + "/match/" + matchId);
};

export const updateStats = (statsId, stats) => {
  return axios.put(STATS_BASE_REST_API_URL + "/" + statsId, stats);
};

export const deleteStats = (statsId) => {
  return axios.delete(STATS_BASE_REST_API_URL + "/" + statsId);
};

export const getPlayerDetails = (playerId) => {
  return axios.get(STATS_BASE_REST_API_URL + "/player/" + playerId);
};
