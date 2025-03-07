import axios from 'axios'

const TEAM_BASE_REST_API_URL = 'http://43.204.102.164:8080/api/v1/teams';

export const listTeams = () => {
    return axios.get(TEAM_BASE_REST_API_URL)
};

export const createTeam = (team) => {
    return axios.post(TEAM_BASE_REST_API_URL + '/add-team', team);
}

export const getTeamById = (teamId) => {
    return axios.get(TEAM_BASE_REST_API_URL + '/' + teamId);
}

export const updateTeam = (teamId, team) => {
    return axios.put(TEAM_BASE_REST_API_URL + '/' +teamId, team);
}

export const deleteTeam = (teamId) => {
    return axios.delete(TEAM_BASE_REST_API_URL + '/' + teamId);
}