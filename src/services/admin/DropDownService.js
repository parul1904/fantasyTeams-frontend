import axios from "axios";
import API_ENDPOINTS from "../environment-config";

export const getTeams = () => {
  return axios.get(API_ENDPOINTS.GET_TEAMS);
};

export const getSeasons = () => {
  return axios.get(API_ENDPOINTS.GET_SEASONS);
};

export const getVenues = () => {
  return axios.get(API_ENDPOINTS.GET_VENUES);
};

export const getPlayers = () => {
  return axios.get(API_ENDPOINTS.GET_PLAYERS);
};

export const getAllMatches = () => {
  return axios.get(API_ENDPOINTS.GET_MATCHES);
};

export const getMatches = (seasonId) => {
  return axios.get(API_ENDPOINTS.GET_MATCHES_BY_SEASON(seasonId));
};
