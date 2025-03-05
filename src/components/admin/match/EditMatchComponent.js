import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateMatch, getMatchById } from '../../../services/admin/MatchService';
import { getTeams, getSeasons, getVenues, getPlayers } from '../../../services/admin/DropDownService';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

const EditMatchComponent = () => {
    const [match, setMatch] = useState({
        seasonId: '',
        matchNo: '',
        team1Id: '',
        team2Id: '',
        venueId: '',
        matchDate: new Date(),
        matchTime: '',
        winnerTeamId: '',
        winningMargin: '',
        playerOfTheMatch: '',
        mvp: ''
    });

    const [teams, setTeams] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [venues, setVenues] = useState([]);
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getMatchById(id).then(response => {
            setMatch({
                ...response.data,
                matchDate: new Date(response.data.matchDate)
            });
        }).catch(error => {
            console.log(error);
        });

        getTeams().then(response => {
            setTeams(response.data);
        }).catch(error => {
            console.log(error);
        });

        getSeasons().then(response => {
            setSeasons(response.data);
        }).catch(error => {
            console.log(error);
        });

        getVenues().then(response => {
            setVenues(response.data);
        }).catch(error => {
            console.log(error);
        });

        getPlayers().then(response => {
            setPlayers(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMatch({ ...match, [name]: value });
    }

    const handleSelectChange = (selectedOption, actionMeta) => {
        setMatch({ ...match, [actionMeta.name]: selectedOption ? selectedOption.value : '' });
    }

    const handleDateChange = (date) => {
        setMatch({ ...match, matchDate: date });
    }

    const saveMatch = (e) => {
        e.preventDefault();
        updateMatch(id, match).then(response => {
            navigate('/matches');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Edit Match</h2>
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
                                        options={seasons.map(season => ({ value: season.id, label: season.name }))}
                                        onChange={handleSelectChange}
                                        value={seasons.find(season => season.id === match.seasonId) ? { value: match.seasonId, label: seasons.find(season => season.id === match.seasonId).name } : null}
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
                                    <label>Team 1</label>
                                    <Select
                                        name="team1Id"
                                        options={teams.map(team => ({ value: team.id, label: team.name }))}
                                        onChange={handleSelectChange}
                                        value={teams.find(team => team.id === match.team1Id) ? { value: match.team1Id, label: teams.find(team => team.id === match.team1Id).name } : null}
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
                                        options={teams.map(team => ({ value: team.id, label: team.name }))}
                                        onChange={handleSelectChange}
                                        value={teams.find(team => team.id === match.team2Id) ? { value: match.team2Id, label: teams.find(team => team.id === match.team2Id).name } : null}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Venue</label>
                                    <Select
                                        name="venueId"
                                        options={venues.map(venue => ({ value: venue.id, label: venue.name }))}
                                        onChange={handleSelectChange}
                                        value={venues.find(venue => venue.id === match.venueId) ? { value: match.venueId, label: venues.find(venue => venue.id === match.venueId).name } : null}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Match Date</label>
                                    <DatePicker
                                        selected={match.matchDate}
                                        onChange={handleDateChange}
                                        className="form-control"
                                        dateFormat="yyyy-MM-dd"
                                    />
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
                                        options={[
                                            { value: match.team1Id, label: teams.find(team => team.id === match.team1Id)?.name },
                                            { value: match.team2Id, label: teams.find(team => team.id === match.team2Id)?.name }
                                        ].filter(option => option.label)}
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
                                        options={teams.map(team => ({ value: team.id, label: team.name }))}
                                        onChange={handleSelectChange}
                                        value={teams.find(team => team.id === match.winnerTeamId) ? { value: match.winnerTeamId, label: teams.find(team => team.id === match.winnerTeamId).name } : null}
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
                                    <Select
                                        name="playerOfTheMatch"
                                        options={players.map(player => ({ value: player.id, label: player.name }))}
                                        onChange={handleSelectChange}
                                        value={players.find(player => player.id === match.playerOfTheMatch) ? { value: match.playerOfTheMatch, label: players.find(player => player.id === match.playerOfTheMatch).name } : null}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>MVP</label>
                                    <Select
                                        name="mvp"
                                        options={players.map(player => ({ value: player.id, label: player.name }))}
                                        onChange={handleSelectChange}
                                        value={players.find(player => player.id === match.mvp) ? { value: match.mvp, label: players.find(player => player.id === match.mvp).name } : null}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isClearable
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary btn-lg" onClick={saveMatch}>Update Match</button>
                </div>
            </form>
        </div>
    );
}

export default EditMatchComponent;