import React, { useState, useEffect } from 'react';
import { listSquadsByTeam } from '../../../services/external/SquadService';
import { listTeams } from '../../../services/admin/TeamService';

const ListSquadDetailsComponent = () => {
    const [teamDetails, setTeamDetails] = useState(null);
    const [playerDetails, setPlayerDetails] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        loadTeams();
    }, []);

    const loadTeams = async () => {
        try {
            const response = await listTeams();
            setTeams(response.data);
            console.log('Team Data:: ',response.data);
        } catch (error) {
            console.error('Error loading teams:', error);
        }
    };

    const fetchSquadData = async (teamId) => {
        try {
            const response = await listSquadsByTeam(teamId);
            console.log(response.data);
            setPlayerDetails(response.data.playerDetails);
            setTeamDetails(response.data.teamDetails);
        } catch (error) {
            console.error('Error fetching squad data:', error);
        }
    };

    const handleTeamClick = (teamId) => {
        setSelectedTeam(teamId);
        fetchSquadData(teamId);
    };

    const categorizePlayers = (players) => {
        const categories = {
            Batters: [],
            'Wicket Keepers': [],
            'All Rounders': [],
            Bowlers: [],
            Staff: []
        };

        players.forEach(player => {
            switch (player.playerRole) {
                case 'Batter':
                    categories.Batters.push(player);
                    break;
                case 'Wicket Keeper':
                    categories['Wicket Keepers'].push(player);
                    break;
                case 'All Rounder':
                    categories['All Rounders'].push(player);
                    break;
                case 'Bowler':
                    categories.Bowlers.push(player);
                    break;
                default:
                    categories.Staff.push(player);
                    break;
            }
        });

        return categories;
    };

    const categorizedPlayers = categorizePlayers(playerDetails);

    useEffect(() => {
        fetchSquadData(1); // Fetch data for teamId 1 by default
        setSelectedTeam(1);
    }, []);

    const handlePlayerClick = (playerId) => {
        window.location.href = `/player-profile/${playerId}`;
    };

    return (
        <div className="container mt-4">
            <div className="row mb-4 justify-content-center">
                {teams.filter(team => team.teamName !== 'TBD').map(team => (
                    <div className="col-md-1 mb-1 position-relative" key={team.teamId}>
                        <img 
                            src={team.teamLogoUrl} 
                            alt={team.teamName} 
                            onClick={() => handleTeamClick(team.teamId)} 
                            style={{ 
                                width: '100%', 
                                height: 'auto', 
                                cursor: 'pointer', 
                                transition: 'transform 0.3s', 
                                transform: selectedTeam === team.teamId ? 'scale(1.1)' : 'scale(1)' 
                            }} 
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
                            onMouseLeave={(e) => e.currentTarget.style.transform = selectedTeam === team.teamId ? 'scale(1.1)' : 'scale(1)'} 
                        />
                        {selectedTeam === team.teamId && (
                            <i className="fas fa-check-circle position-absolute" style={{ top: '10px', right: '10px', color: 'orange', fontSize: '24px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', transform: 'rotate(-45deg)' }}></i>
                        )}
                    </div>
                ))}
            </div>
            {teamDetails && (
                <div className="card mb-4">
                    <div className="card-header bg-primary text-white">
                        Team Details
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                <img src={teamDetails.teamLogo} alt="Team Logo" style={{ width: '100%', height: '225px'}} />    
                            </div>
                            <div className="col-md-3">
                                <h3>{teamDetails.teamName}</h3>                                
                                <p><img src='https://fantasyteams.s3.ap-south-1.amazonaws.com/others/team-trophy.png' alt="Trophy"/> {teamDetails.titleWon}</p>
                                
                            </div>
                            <div className="col-md-6">
                                <p><strong>Captain:</strong> {teamDetails.teamCaptain}</p>                                
                                <p><strong>Coach:</strong> {teamDetails.teamCoach}</p>
                                <p><strong>Venue:</strong> {teamDetails.teamVenue}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {Object.keys(categorizedPlayers).map(category => (
                categorizedPlayers[category].length > 0 && (
                    <div className="card mb-4" key={category}>
                        <div className={`card-header bg-${category === 'Staff' ? 'secondary' : 'success'} text-white`}>
                            {category}
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {categorizedPlayers[category].map(player => (
                                    <div className="col-md-3 mb-3" key={player.playerName}>
                                        <div className="card position-relative" onClick={() => handlePlayerClick(player.playerId)} style={{ cursor: 'pointer' }}>
                                            <img src={player.playerImage} alt={player.playerName} className="card-img-top" style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'top' }} />
                                            {player.playerCountry !== 'India' && (
                                                <i className="fas fa-plane position-absolute" style={{ top: '10px', right: '10px', color: 'red', fontSize: '24px' }}></i>
                                            )}
                                            <div className="card-body d-flex flex-column align-items-center"></div>
                                                <p className="card-text text-center" style={{ backgroundColor: 'orange', width: '100%', margin: '0' }}><strong>{player.playerName}</strong></p>
                                                <p className="card-text d-flex justify-content-between w-100 mt-2">
                                                    <img 
                                                        src={`https://fantasyteams.s3.ap-south-1.amazonaws.com/others/${player.playerCountry}.png`} 
                                                        alt={player.playerCountry} 
                                                        style={{ width: '50px', height: '35px' }} 
                                                    />
                                                    <img 
                                                        src={`https://fantasyteams.s3.ap-south-1.amazonaws.com/others/${player.playerRole}.png`} 
                                                        alt={player.playerRole} 
                                                        style={{ width: '75px', height: '40px' }} 
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default ListSquadDetailsComponent;