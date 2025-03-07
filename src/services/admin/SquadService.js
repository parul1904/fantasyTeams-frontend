import axios from 'axios'

const SQUAD_BASE_REST_API_URL = 'http://43.204.102.164:8080/api/v1/squads';

export const listSquads = () => {
    return axios.get(SQUAD_BASE_REST_API_URL)
};

export const createSquad = (squad) => {
    return axios.post(SQUAD_BASE_REST_API_URL + '/add-squad', squad);
}

export const getSquadById = (squadId) => {
    return axios.get(SQUAD_BASE_REST_API_URL + '/' + squadId);
}

export const updateSquad = (squadId, squad) => {
    return axios.put(SQUAD_BASE_REST_API_URL + '/' +squadId, squad);
}

export const deleteSquad = (squadId) => {
    return axios.delete(SQUAD_BASE_REST_API_URL + '/' + squadId);
}

export const listSquadsByTeam = (teamId) => {
    console.log('teamID from Service:: ', SQUAD_BASE_REST_API_URL +  teamId);
    return axios.get(SQUAD_BASE_REST_API_URL + '/team/' + teamId)
};