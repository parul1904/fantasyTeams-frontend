const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://43.204.102.164:8080/api/v1";

export const API_ENDPOINTS = {
  // Login
  LOGIN: `${API_BASE_URL}/auth/login`,

  // ComparisonServices
  PLAYERS: `${API_BASE_URL}/players`,
  PLAYER_BY_ID: (id) => `${API_BASE_URL}/players/${id}`,
  TEAMS: `${API_BASE_URL}/teams`,
  TEAM_BY_ID: (id) => `${API_BASE_URL}/teams/${id}`,

  // DreamTeamServices
  DREAM_TEAM_BY_MATCH_NUM: (matchNo) =>
    ` ${API_BASE_URL}/dreamTeam/match/${matchNo}`,

  // DropDownServices
  GET_TEAMS: `${API_BASE_URL}/dropdown/teams`,
  GET_SEASONS: `${API_BASE_URL}/dropdown/seasons`,
  GET_VENUES: `${API_BASE_URL}/dropdown/venues`,
  GET_PLAYERS: `${API_BASE_URL}/dropdown/players`,
  GET_MATCHES: `${API_BASE_URL}/dropdown/matches`,
  GET_MATCHES_BY_SEASON: (seasonId) =>
    `${API_BASE_URL}/dropdown/matches/${seasonId}`,

  //   MatchServices
  MATCHES: `${API_BASE_URL}/matches`,
  CREATE_MATCH: `${API_BASE_URL}/matches/add-match`,
  GET_MATCH_BY_ID: (id) => `${API_BASE_URL}/matches/${id}`,
  UPDATE_MATCH: (id) => `${API_BASE_URL}/matches/${id}`,
  DELETE_MATCH: (id) => `${API_BASE_URL}/matches/${id}`,
  GET_MATCH_DETAILS: (id) => `${API_BASE_URL}/matches/matchId/${id}`,

  //   PlayerServices
  PLAYERS_LIST: `${API_BASE_URL}/players`,
  CREATE_PLAYER: `${API_BASE_URL}/players/add-player`,
  GET_PLAYER_BY_ID: (id) => `${API_BASE_URL}/players/${id}`,
  UPDATE_PLAYER: (id) => `${API_BASE_URL}/players/${id}`,
  DELETE_PLAYER: (id) => `${API_BASE_URL}/players/${id}`,

  //   SquadServices
  SQUAD_LIST: `${API_BASE_URL}/squads`,
  CREATE_SQUAD: `${API_BASE_URL}/squads/add-squad`,
  GET_SQUAD_BY_ID: (id) => `${API_BASE_URL}/squads/${id}`,
  UPDATE_SQUAD: (id) => `${API_BASE_URL}/squads/${id}`,
  DELETE_SQUAD: (id) => `${API_BASE_URL}/squads/${id}`,
  GET_SQUAD_BY_TEAM: (id) => `${API_BASE_URL}/squads/team/${id}`,

  // StatsServices
  STATS_LIST: `${API_BASE_URL}/stats`,
  CREATE_STATS: `${API_BASE_URL}/stats/add-stats`,
  GET_STATS_BY_ID: (id) => `${API_BASE_URL}/stats/${id}`,
  UPDATE_STATS: (id) => `${API_BASE_URL}/stats/${id}`,
  DELETE_STATS: (id) => `${API_BASE_URL}/stats/${id}`,
  GET_STATS_BY_MATCH_ID: (id) => `${API_BASE_URL}/stats/match/${id}`,
  GET_PLAYER_DETAILS: (playerId) => `${API_BASE_URL}/stats/player/${playerId}`,

  // TeamServices
  TEAMS_LIST: `${API_BASE_URL}/teams`,
  CREATE_TEAM: `${API_BASE_URL}/teams/add-team`,
  GET_TEAM_BY_ID: (id) => `${API_BASE_URL}/teams/${id}`,
  UPDATE_TEAM: (id) => `${API_BASE_URL}/teams/${id}`,
  DELETE_TEAM: (id) => `${API_BASE_URL}/teams/${id}`,

  // SquadServices
  SQUAD_LIST_BY_TEAM: `${API_BASE_URL}/squads//team`,
};

export default API_ENDPOINTS;
