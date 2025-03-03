import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSquad, getSquadById } from '../../services/SquadService';
import { getTeams, getSeasons, getPlayers } from '../../services/DropDownService';
import Select from 'react-select';

const EditSquadComponent = () => {
    const [squad, setSquad] = useState({
        seasonId: '',
        teamId: '',
        playerId: ''
    });

    const [teams, setTeams] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getSquadById(id).then(response => {
            setSquad(response.data);
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

        getPlayers().then(response => {
            setPlayers(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, [id]);

    const handleSelectChange = (selectedOption, actionMeta) => {
        setSquad({ ...squad, [actionMeta.name]: selectedOption ? selectedOption.value : '' });
    }

    const saveSquad = (e) => {
        e.preventDefault();
        updateSquad(id, squad).then(response => {
            navigate('/squads');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h2 className="text-center">Edit Squad</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <label>Season</label>
                            <Select
                                name="seasonId"
                                options={seasons.map(season => ({ value: season.id, label: season.name }))}
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                value={seasons.find(season => season.id === squad.seasonId) ? { value: squad.seasonId, label: seasons.find(season => season.id === squad.seasonId).name } : null}
                                isClearable
                            />
                        </div>

                        <div className="form-group">
                            <label>Team</label>
                            <Select
                                name="teamId"
                                options={teams.map(team => ({ value: team.id, label: team.name }))}
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                value={teams.find(team => team.id === squad.teamId) ? { value: squad.teamId, label: teams.find(team => team.id === squad.teamId).name } : null}
                                isClearable
                            />
                        </div>

                        <div className="form-group">
                            <label>Player</label>
                            <Select
                                name="playerId"
                                options={players.map(player => ({ value: player.id, label: player.name }))}
                                className="basic-single"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                                value={players.find(player => player.id === squad.playerId) ? { value: squad.playerId, label: players.find(player => player.id === squad.playerId).name } : null}
                                isClearable
                            />
                        </div>
                    
                        <button className="btn btn-success" onClick={saveSquad}>Update Squad</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditSquadComponent;