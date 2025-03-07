import axios from 'axios';
import API_ENDPOINTS from "../environment-config";

export const getDreamTeamByMatchNo = (matchNo) => {
    return axios.get(API_ENDPOINTS.DREAM_TEAM_BY_MATCH_NUM(matchNo));
};

