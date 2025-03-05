import axios from 'axios'

const MATCH_BASE_REST_API_URL = 'http://192.168.1.114:8080/api/v1/matches';

export const listMatchs = () => {
    return axios.get(MATCH_BASE_REST_API_URL)
};

export const createMatch = (match) => {
    return axios.post(MATCH_BASE_REST_API_URL + '/add-match', match);
}

export const getMatchById = (matchId) => {
    return axios.get(MATCH_BASE_REST_API_URL + '/' + matchId);
}

export const updateMatch = (matchId, match) => {
    return axios.put(MATCH_BASE_REST_API_URL + '/' +matchId, match);
}

export const deleteMatch = (matchId) => {
    return axios.delete(MATCH_BASE_REST_API_URL + '/' + matchId);
}

export const getMatchDetails = (matchId) => {
    return axios.get(MATCH_BASE_REST_API_URL + '/matchId/' + matchId);
}