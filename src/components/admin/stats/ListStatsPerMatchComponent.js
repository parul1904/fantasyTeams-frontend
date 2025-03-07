import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getSeasons, getMatches } from '../../../services/admin/DropDownService';
import { getStatsByMatchId } from '../../../services/admin/StatsService';

const ListStatsPerMatchComponent = () => {
    const [seasons, setSeasons] = useState([]);
    const [matches, setMatches] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        loadSeasons();
    }, []);

    const loadSeasons = async () => {
        try {
            const response = await getSeasons();
            console.log('Seasons response:', response.data); // Log the response data
            const seasonOptions = response.data.map(season => ({
                value: season.id,
                label: season.name
            }));
            setSeasons(seasonOptions);
        } catch (error) {
            console.error('Error loading seasons:', error);
        }
    };

    const loadMatches = async (seasonId) => {
        try {
            const response = await getMatches(seasonId);
            console.log('Matches response:', response.data); // Log the response data
            const matchOptions = response.data.map(match => ({
                value: match.id,
                label: `Match-${match.name}`
            }));
            setMatches(matchOptions);
        } catch (error) {
            console.error('Error loading matches:', error);
        }
    };

    const handleSeasonChange = (selectedOption) => {
        setSelectedSeason(selectedOption);
        setSelectedMatch(null);
        setStats([]);
        if (selectedOption) {
            loadMatches(selectedOption.value);
        } else {
            setMatches([]);
        }
    };

    const handleMatchChange = async (selectedOption) => {
        setSelectedMatch(selectedOption);
        if (selectedOption) {
            try {
                const response = await getStatsByMatchId(selectedOption.value);
                console.log('Stats response:', response.data); // Log the response data
                setStats(response.data);
            } catch (error) {
                console.error('Error loading stats:', error);
            }
        } else {
            setStats([]);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">List Statistics Per Match</h2>
            <div className="row mb-4">
                <div className="col-md-6 offset-md-3">
                    <Select
                        name="seasonId"
                        options={seasons}
                        onChange={handleSeasonChange}
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable
                        placeholder="Select Season"
                    />
                </div>
            </div>
            {selectedSeason && (
                <div className="row mb-4">
                    <div className="col-md-6 offset-md-3">
                        <Select
                            name="matchId"
                            options={matches}
                            onChange={handleMatchChange}
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable
                            placeholder="Select Match"
                        />
                    </div>
                </div>
            )}

            {selectedMatch && stats.length === 0 && (
                <div className="text-center">
                    <h3>Match not Played</h3>
                </div>
            )}

            {selectedMatch && stats.length > 0 && (
                <div>
                    <h3 className="text-center mb-4">Match Details</h3>
                    <div className="row">
                        <div className="col-md-12">
                            <h4>Match Statistics</h4>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Player</th>
                                        <th>Player Name</th>
                                        <th>Runs Scored</th>
                                        <th>Fours</th>
                                        <th>Sixes</th>
                                        <th>Strike Rate</th>
                                        <th>Overs</th>
                                        <th>Total Wickets</th>
                                        <th>Bowled/LBW</th>
                                        <th>Maiden</th>
                                        <th>Economy Rate</th>
                                        <th>Catch Taken</th>
                                        <th>Impact Player</th>
                                        <th>Dream 11 (New System)</th>
                                        <th>Dream 11 (Old System)</th>
                                        <th>My 11 Circle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.slice(0, 11).map(stat => (
                                        <tr key={stat.playerImage}>
                                            <td><img src={stat.playerImage} alt="Player" style={{ width: '50px', height: '50px' }} /></td>
                                            <td>{stat.playerName}</td>
                                            <td>{stat.runsScored || 0}</td>
                                            <td>{stat.fours || 0}</td>
                                            <td>{stat.sixes || 0}</td>
                                            <td>{stat.strikeRate || 0}</td>
                                            <td>{stat.overs || 0}</td>
                                            <td>{stat.totalWickets || 0}</td>
                                            <td>{stat.bowledLbw || 0}</td>
                                            <td>{stat.maiden || 0}</td>
                                            <td>{stat.economyRate || 0}</td>
                                            <td>{stat.catchTaken || 0}</td>
                                            <td>{stat.isImpactPlayer ? 'Yes' : 'No'}</td>
                                            <td>{stat.totalPointDream11NewSystem || 0}</td>
                                            <td>{stat.totalPointDream11OldSystem || 0}</td>
                                            <td>{stat.totalPointDream11OldSystem || 0}</td>
                                        </tr>
                                    ))}
                                    <tr><td colSpan="15"><p style={{ textAlign: 'center' }}><strong>All above players are part of Dream Team</strong></p></td></tr>
                                    {stats.slice(11).map(stat => (
                                        <tr key={stat.playerImage}>
                                            <td><img src={stat.playerImage} alt="Player" style={{ width: '50px', height: '50px' }} /></td>
                                            <td>{stat.playerName || 0}</td>
                                            <td>{stat.runsScored || 0}</td>
                                            <td>{stat.fours || 0}</td>
                                            <td>{stat.sixes || 0}</td>
                                            <td>{stat.strikeRate || 0}</td>
                                            <td>{stat.overs || 0}</td>
                                            <td>{stat.totalWickets || 0}</td>
                                            <td>{stat.bowledLbw || 0}</td>
                                            <td>{stat.maiden || 0}</td>
                                            <td>{stat.economyRate || 0}</td>
                                            <td>{stat.catchTaken || 0}</td>
                                            <td>{stat.isImpactPlayer ? 'Yes' : 'No'}</td>
                                            <td>{stat.totalPointDream11NewSystem || 0}</td>
                                            <td>{stat.totalPointDream11OldSystem || 0}</td>
                                            <td>{stat.totalPointDream11OldSystem || 0}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListStatsPerMatchComponent;