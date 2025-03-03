import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { createStats } from '../../services/StatsService';
import { getSeasons, getMatches, getPlayers } from '../../services/DropDownService';
import { getMatchDetails } from '../../services/MatchService';

const AddStatsComponent = () => {
    const [stats, setStats] = useState({
        seasonId: '',
        matchId: '',
        playerId: '',
        runsScored: '',
        fours: '',
        sixes: '',
        strikeRate: '',
        catchTaken: '',
        stumping: '',
        directRunout: '',
        inDirectRunout: '',
        isImpactPlayer: false,
        overs: '',
        totalWickets: '',
        bowledLbw: '',
        otherDismissal: '',
        dots: '',
        maiden: '',
        economyRate: ''
    });

    const [seasons, setSeasons] = useState([]);
    const [matches, setMatches] = useState([]);
    const [matchDetails, setMatchDetails] = useState([]);
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    const loadSeasons = async () => {
        try {
            const response = await getSeasons();
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
            console.log('Season ID:', seasonId);
            const response = await getMatches(seasonId);
            console.log(response.data);
            const matchOptions = response.data.map(match => ({
                value: match.id,
                label: 'Match-' + match.name
            }));
            setMatches(matchOptions);
        } catch (error) {
            console.error('Error loading matches:', error);
        }
    };

    const loadMatchDetails = async (matchId) => {
        try {
            console.log('matchId ID:', matchId);
            const response = await getMatchDetails(matchId);
            console.log(response.data);
            const matchOptions = response.data.map(match => ({
                team1: match.team1Name, //team1 stores the image Url of team1
                team2: match.team2Name,  //team2 stores the image Url of team2
                matchDate: match.matchDate
            }));
            setMatchDetails(matchOptions);
        } catch (error) {
            console.error('Error loading match details:', error);
        }
    };

    const loadPlayers = async () => {
        try {
            const response = await getPlayers();
            console.log('response:: ',response.data);
            const playerOptions = response.data.map(player => ({
                value: player.id,
                label: player.name
            }));
            setPlayers(playerOptions);
        } catch (error) {
            console.error('Error loading players:', error);
        }
    };

    useEffect(() => {
        loadSeasons();
        loadPlayers();
    }, []);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setStats({
            ...stats,
            [name]: type === 'radio' ? value === 'true' : value
        });
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setStats({
            ...stats,
            [name]: selectedOption.value
        });
        if (name === 'seasonId') {
            loadMatches(selectedOption.value);
        }
        if (name === 'matchId') {
            loadMatchDetails(selectedOption.value);
        }
    };

    
    const convertOversToBalls = (overs) => {
        const [wholeOvers, partialOvers] = overs.toString().split('.').map(Number);
        return (wholeOvers * 6) + (partialOvers || 0);
    };

    const saveStats = (e) => {
        e.preventDefault();
        const calculatedStats = {
            ...stats,
            strikeRate: stats.runsScored && stats.ballFaced ? ((stats.runsScored / stats.ballFaced) * 100).toFixed(2) : 0,
            economyRate: stats.overs && stats.runsConceded ? ((stats.runsConceded / convertOversToBalls(stats.overs))*6).toFixed(2) : 0
        };
        createStats(calculatedStats).then(response => {
            navigate('/stats');
        }).catch(error => {
            console.log(error);
        });
    };


    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Add Match Statistics</h2>
            <form>
                {/* Player Section */}
                <div className="card mb-4">
                    <div className="card-header bg-primary text-white">
                        Player Section
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Season</label>
                                    <Select
                                        name="seasonId"
                                        options={seasons}
                                        onChange={(option) => handleSelectChange(option, { name: 'seasonId' })}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Match</label>
                                    <Select
                                        name="matchId"
                                        options={matches}
                                        onChange={(option) => handleSelectChange(option, { name: 'matchId' })}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Match Between</label>
                                    {matchDetails.map(detail => (
                                        <div key={detail.matchDate}>
                                            <img src={detail.team1} alt='team1' style={{ width: '50px', height: '50px' }} /> VS
                                            <img src={detail.team2} alt='team2' style={{ width: '50px', height: '50px' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Match Date</label>
                                    {matchDetails.map(detail => (
                                        <div>
                                            <span>{detail.matchDate}</span>  
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Player</label>
                                    <Select
                                        name="playerId"
                                        options={players}
                                        onChange={(option) => handleSelectChange(option, { name: 'playerId' })}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Batting Section */}
                <div className="card mb-4">
                    <div className="card-header bg-success text-white">
                        Batting Section
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Runs Scored</label>
                                    <input type="number" name="runsScored" className="form-control" value={stats.runsScored} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Ball Faced</label>
                                    <input type="number" name="ballFaced" className="form-control" value={stats.ballFaced} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Strike Rate</label>
                                    <input type="number" step="0.01" name="strikeRate" className="form-control"  disabled
                                     value={stats.runsScored && stats.ballFaced ? ((stats.runsScored / stats.ballFaced) * 100).toFixed(2) : 0} />
                                </div>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Fours</label>
                                    <input type="number" name="fours" className="form-control" value={stats.fours} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Sixes</label>
                                    <input type="number" name="sixes" className="form-control" value={stats.sixes} onChange={handleChange} min="0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fielding Section */}
                <div className="card mb-4">
                    <div className="card-header bg-info text-white">
                        Fielding Section
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Catches Taken</label>
                                    <input type="number" name="catchTaken" className="form-control" value={stats.catchTaken} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Stumping</label>
                                    <input type="number" name="stumping" className="form-control" value={stats.stumping} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Impact Player</label>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="isImpactPlayer"
                                            value="true"
                                            checked={stats.isImpactPlayer === true}
                                            onChange={handleChange}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="isImpactPlayer"
                                            value="false"
                                            checked={stats.isImpactPlayer === false}
                                            onChange={handleChange}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Direct Runout</label>
                                    <input type="number" name="directRunout" className="form-control" value={stats.directRunout} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Indirect Runout</label>
                                    <input type="number" name="inDirectRunout" className="form-control" value={stats.inDirectRunout} onChange={handleChange} min="0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bowling Section */}
                <div className="card mb-4">
                    <div className="card-header bg-warning">
                        Bowling Section
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Overs</label>
                                    <input type="number" step="0.1" name="overs" className="form-control" value={stats.overs} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Runs Conceded</label>
                                    <input type="number" step="0.1" name="runsConceded" className="form-control" value={stats.runsConceded} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Economy Rate</label>
                                    <input type="number" step="0.01" name="economyRate" className="form-control"
                                     value={stats.overs && stats.runsConceded ? ((stats.runsConceded / convertOversToBalls(stats.overs))*6).toFixed(2) : 0} 
                                     disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Total Wickets</label>
                                    <input type="number" name="totalWickets" className="form-control" value={stats.totalWickets} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Bowled/LBW</label>
                                    <input type="number" name="bowledLbw" className="form-control" value={stats.bowledLbw} onChange={handleChange} min="0" />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Dot Balls</label>
                                    <input type="number" name="dots" className="form-control" value={stats.dots} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Maiden Overs</label>
                                    <input type="number" name="maiden" className="form-control" value={stats.maiden} onChange={handleChange} min="0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary btn-lg" onClick={saveStats}>Save Statistics</button>
                </div>
            </form>
        </div>
    );
};

export default AddStatsComponent;