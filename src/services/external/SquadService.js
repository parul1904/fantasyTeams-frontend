import axios from 'axios'

const SQUAD_BASE_REST_API_URL = 'http://192.168.1.114:8080/api/v1/squads';

export const listSquadsByTeam = (teamId) => {
    return axios.get(SQUAD_BASE_REST_API_URL + '/team', teamId)
};