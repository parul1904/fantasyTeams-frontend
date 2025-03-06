import axios from 'axios';

const BASE_REST_API_URL = 'http://192.168.1.114:8080/api/v1';

export const getPlayers = () => {
    return axios.get(`${BASE_REST_API_URL}/players`);
};

export const getTeams = () => {
    return axios.get(`${BASE_REST_API_URL}/teams`);
};

export const getPlayerById = (playerId) => {
    return axios.get(`${BASE_REST_API_URL}/players/${playerId}`);
};

export const getTeamById = (teamId) => {
    return axios.get(`${BASE_REST_API_URL}/teams/${teamId}`);
};