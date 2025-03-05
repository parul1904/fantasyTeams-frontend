import axios from 'axios'

const DROPDOWN_BASE_REST_API_URL = 'http://192.168.1.114:8080/api/v1/dropdown';

export const getTeams = () => {
    return axios.get(DROPDOWN_BASE_REST_API_URL + "/teams")
};

export const getSeasons = () => {
    return axios.get(DROPDOWN_BASE_REST_API_URL + "/seasons")
};

export const getVenues = () => {
    return axios.get(DROPDOWN_BASE_REST_API_URL + "/venues")
};

export const getPlayers = () => {
    return axios.get(DROPDOWN_BASE_REST_API_URL + "/players")
};

export const getAllMatches = () => {
    return axios.get(DROPDOWN_BASE_REST_API_URL + "/matches")
};

export const getMatches = (seasonId) => {
    return axios.get(DROPDOWN_BASE_REST_API_URL + "/matches/" + seasonId)
};