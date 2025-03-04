import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { createMatch } from '../../services/MatchService';
import { getSeasons, getTeams, getVenues } from '../../services/DropDownService';

const AddMatchComponent = () => {
    const [match, setMatch] = useState({
        seasonId: '',
        matchNo: '',
        team1Id: '',
        team2Id: '',
        venueId: '',
        matchDate: '',
        matchTime: '',
        winnerTeamId: '',
        winningMargin: '',
        playerOfTheMatch: '',
        mvp: ''
    });

    const [seasons, setSeasons] = useState([]);
    const [teams, setTeams] = useState([]);
    const [venues, setVenues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadSeasons();
        loadTeams();
        loadVenues();
    }, []);

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

    const loadTeams = async () => {
        try {
            const response = await getTeams();
            const teamOptions = response.data.map(team => ({
                value: team.id,
                label: team.name
            }));
            setTeams(teamOptions);
        } catch (error) {
            console.error('Error loading teams:', error);
        }
    };

    const loadVenues = async () => {
        try {
            const response = await getVenues();
            const venueOptions = response.data.map(venue => ({
                value: venue.id,
                label: venue.name
            }));
            setVenues(venueOptions);
        } catch (error) {
            console.error('Error loading venues:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMatch({
            ...match,
            [name]: value
        });
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setMatch({
            ...match,
            [name]: selectedOption ? selectedOption.value : ''
        });
    };

    const saveMatch = (e) => {
        e.preventDefault();
        createMatch(match).then(response => {
            navigate('/matches');
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Add Match</h2>
            <form>
                {/* Basic Match Details Section */}
                <div className="card mb-4">
                    <div className="card-header bg-primary text-white">
                        Basic Match Details
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
                                    <label>Match No</label>
                                    <input type="number" name="matchNo" className="form-control" value={match.matchNo} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Venue</label>
                                    <Select
                                        name="venueId"
                                        options={venues}
                                        onChange={(option) => handleSelectChange(option, { name: 'venueId' })}
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
                                    <label>Team 1</label>
                                    <Select
                                        name="team1Id"
                                        options={teams}
                                        onChange={(option) => handleSelectChange(option, { name: 'team1Id' })}
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
                                    <label>Team 2</label>
                                    <Select
                                        name="team2Id"
                                        options={teams}
                                        onChange={(option) => handleSelectChange(option, { name: 'team2Id' })}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Match Date</label>
                                    <input type="date" name="matchDate" className="form-control" value={match.matchDate} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Match Time</label>
                                    <select name="matchTime" className="form-control" value={match.matchTime} onChange={handleChange}>
                                        <option value="">Select Match Time</option>
                                        <option value="03:30 pm IST">03:30 pm IST</option>
                                        <option value="07:30 pm IST">07:30 pm IST</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Score Section */}
                 <div className="card mb-4">
                    <div className="card-header bg-danger text-white">
                    Score Section
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Toss Won By</label>
                                    <Select
                                        name="tossWonBy"
                                        options={teams.filter(team => team.value === match.team1Id || team.value === match.team2Id)}
                                        onChange={handleSelectChange}
                                        value={
                                            match.tossWonBy
                                                ? { value: match.tossWonBy, label: teams.find(team => team.id === match.tossWonBy)?.name }
                                                : null
                                        }
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Toss Decision</label>
                                    <select name="tossDecision" className="form-control" value={match.tossDecision} onChange={handleChange}>
                                        <option value="">Opts</option>
                                        <option value="Bat First">Bat First</option>
                                        <option value="Ball First">Ball First</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>First Inn Score</label>
                                    <input type="text" name="firstInnRuns" className="form-control" value={match.firstInnRuns} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>First Inn Wickets</label>
                                    <input type="text" name="firstInnWickets" className="form-control" value={match.firstInnWickets} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Second Inn Score</label>
                                    <input type="text" name="secondInnRuns" className="form-control" value={match.secondInnRuns} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Second Inn Wickets</label>
                                    <input type="text" name="secondInnWickets" className="form-control" value={match.secondInnWickets} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Wkt By Pacer</label>
                                    <input type="text" name="wicketTakenByPacer" className="form-control" value={match.wicketTakenByPacer} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Wkt By Spinner</label>
                                    <input type="text" name="wicketTakenBySpinner" className="form-control" value={match.wicketTakenBySpinner} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* Results Section */}
                <div className="card mb-4">
                    <div className="card-header bg-success text-white">
                        Results Section
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Winner Team</label>
                                    <Select
                                        name="winnerTeamId"
                                        options={teams}
                                        onChange={(option) => handleSelectChange(option, { name: 'winnerTeamId' })}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Winning Margin</label>
                                    <input type="text" name="winningMargin" className="form-control" value={match.winningMargin} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Player of the Match</label>
                                    <input type="text" name="playerOfTheMatch" className="form-control" value={match.playerOfTheMatch} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>MVP</label>
                                    <input type="text" name="mvp" className="form-control" value={match.mvp} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary btn-lg" onClick={saveMatch}>Save Match</button>
                </div>
            </form>
        </div>
    );
};

export default AddMatchComponent;