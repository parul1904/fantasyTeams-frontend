import axios from "axios";
import API_ENDPOINTS from "../environment-config";

export const listPlayers = () => {
  return axios.get(API_ENDPOINTS.PLAYERS_LIST);
};

export const createPlayer = (player) => {
  return axios.post(API_ENDPOINTS.CREATE_PLAYER, player);
};

export const getPlayerById = (playerId) => {
  return axios.get(API_ENDPOINTS.GET_PLAYER_BY_ID(playerId));
};

export const updatePlayer = (playerId, player) => {
  return axios.put(API_ENDPOINTS.UPDATE_PLAYER(playerId), player);
};

export const deletePlayer = (playerId) => {
  return axios.delete(API_ENDPOINTS.DELETE_PLAYER(playerId));
};
