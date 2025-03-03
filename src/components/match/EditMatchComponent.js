import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateMatch, getMatchById } from '../../services/MatchService';
import { getTeams, getSeasons, getVenues, getPlayers } from '../../services/DropDownService';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

const EditMatchComponent = () => {
    const [match, setMatch] = useState({
        seasonId: '',
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
                matchDate: new Date(response.data.matchDate) // Ensure the date is in the correct format
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
        <div className="container">
            <h2 className="text-center">Edit Match</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <label>Season</label>
                            <select name="seasonId" className="form-control" value={match.seasonId} onChange={handleChange}>
                                <option value="">Select Season</option>
                                {seasons.map(season => (
                                    <option key={season.id} value={season.id}>{season.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Match #</label>
                            <input type="text" name="matchNo" placeholder='Match-' className="form-control" value={match.matchNo} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Team 1</label>
                            <Select
                                name="team1Id"
                                options={teams.map(team => ({ value: team.id, label: team.name }))}
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                value={teams.find(team => team.id === match.team1Id) ? { value: match.team1Id, label: teams.find(team => team.id === match.team1Id).name } : null}
                                isClearable
                            />
                        </div>

                        <div className="form-group">
                            <label>Team 2</label>
                            <Select
                                name="team2Id"
                                options={teams.map(team => ({ value: team.id, label: team.name }))}
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                value={teams.find(team => team.id === match.team2Id) ? { value: match.team2Id, label: teams.find(team => team.id === match.team2Id).name } : null}
                                isClearable
                            />
                        </div>

                        <div className="form-group">
                            <label>Venue</label>
                            <select name="venueId" className="form-control" value={match.venueId} onChange={handleChange}>
                                <option value="">Select Venue</option>
                                {venues.map(venue => (
                                    <option key={venue.id} value={venue.id}>{venue.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Match Date</label>
                            <DatePicker
                                selected={match.matchDate}
                                onChange={handleDateChange}
                                className="form-control"
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>

                        <div className="form-group">
                            <label>Match Time</label>
                            <select name="matchTime" className="form-control" value={match.matchTime} onChange={handleChange}>
                                <option value="">Select Match Time</option>
                                <option value="03:30 pm IST">03:30 pm IST</option>
                                <option value="07:30 pm IST">07:30 pm IST</option>                        
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Winner Team</label>
                            <Select
                                name="winnerTeamId"
                                options={match.team1Id && match.team2Id ? teams.filter(team => team.id === match.team1Id || team.id === match.team2Id).map(team => ({ value: team.id, label: team.name })) : []}
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                value={teams.find(team => team.id === match.winnerTeamId) ? { value: match.winnerTeamId, label: teams.find(team => team.id === match.winnerTeamId).name } : null}
                                isClearable
                            />
                        </div>

                        <div className="form-group">
                            <label>Winning Margin</label>
                            <input type="text" name="winningMargin" className="form-control" value={match.winningMargin} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Player of the Match</label>
                            <Select
                                name="playerOfTheMatch"
                                options={players.map(player => ({ value: player.id, label: player.name }))}
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                value={players.find(player => player.id === match.playerOfTheMatch) ? { value: match.playerOfTheMatch, label: players.find(player => player.id === match.playerOfTheMatch).name } : null}
                                isClearable
                            />
                        </div>

                        <div className="form-group">
                            <label>MVP</label>
                            <Select
                                name="mvp"
                                options={players.map(player => ({ value: player.id, label: player.name }))}
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                value={players.find(player => player.id === match.mvp) ? { value: match.mvp, label: players.find(player => player.id === match.mvp).name } : null}
                                isClearable
                            />
                        </div>
                    
                        <button className="btn btn-success" onClick={saveMatch}>Update Match</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditMatchComponent;