import axios from "axios";

const PLAYER_BASE_REST_API_URL = "http://192.168.1.114:8080/api/v1/players";

export const listPlayers = () => {
  return axios.get(PLAYER_BASE_REST_API_URL);
};

export const createPlayer = (player) => {
  return axios.post(PLAYER_BASE_REST_API_URL + "/add-player", player);
};

export const getPlayerById = (playerId) => {
  return axios.get(PLAYER_BASE_REST_API_URL + "/" + playerId);
};

export const updatePlayer = (playerId, player) => {
  return axios.put(PLAYER_BASE_REST_API_URL + "/" + playerId, player);
};

export const deletePlayer = (playerId) => {
  return axios.delete(PLAYER_BASE_REST_API_URL + "/" + playerId);
};
