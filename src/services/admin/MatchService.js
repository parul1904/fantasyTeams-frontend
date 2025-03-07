import axios from "axios";
import API_ENDPOINTS from "../environment-config";

export const listMatchs = () => {
  return axios.get(API_ENDPOINTS.MATCHES);
};

export const createMatch = (match) => {
  return axios.post(API_ENDPOINTS.CREATE_MATCH, match);
};

export const getMatchById = (matchId) => {
  return axios.get(API_ENDPOINTS.GET_MATCH_BY_ID(matchId));
};

export const updateMatch = (matchId, match) => {
  return axios.put(API_ENDPOINTS.UPDATE_MATCH(matchId), match);
};

export const deleteMatch = (matchId) => {
  return axios.delete(API_ENDPOINTS.DELETE_MATCH(matchId));
};

export const getMatchDetails = (matchId) => {
  return axios.get(API_ENDPOINTS.GET_MATCH_DETAILS(matchId));
};
