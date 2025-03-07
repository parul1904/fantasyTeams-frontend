import axios from 'axios';

const BASE_REST_API_URL = 'http://43.204.102.164:8080/api/v1/dreamTeam';

export const getDreamTeamByMatchNo = (matchNo) => {
    return axios.get(`${BASE_REST_API_URL}/match/${matchNo}`);
};

