import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTeam, getTeamById } from '../../services/TeamService';

const EditTeamComponent = () => {
    const [team, setTeam] = useState({ teamName: '', teamShortName: '', teamLogoUrl: '', captain: '', coach: '', venue: '', titleWon: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTeamById(id).then(response => {
            setTeam(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeam({ ...team, [name]: value });
    }

    const saveTeam = (e) => {
        e.preventDefault();
        updateTeam(id, team).then(response => {
            navigate('/teams');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h2 className="text-center">Add Team</h2>
            <form>
                <div className="form-group">
                    <label>Team Name</label>
                    <input type="text" name="teamName" className="form-control" value={team.teamName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Team Short Name</label>
                    <input type="text" name="teamShortName" className="form-control" value={team.teamShortName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Team Logo Url</label>
                    <input type="text" name="teamLogoUrl" className="form-control" value={team.teamLogoUrl} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Team Captain</label>
                    <input type="text" name="captain" className="form-control" value={team.captain} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Team Coach</label>
                    <input type="text" name="coach" className="form-control" value={team.coach} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Team Venue</label>
                    <input type="text" name="venue" className="form-control" value={team.venue} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Title Won</label>
                    <input type="text" name="titleWon" className="form-control" value={team.titleWon} onChange={handleChange} />
                </div>
                <button className="btn btn-success" onClick={saveTeam}>Save</button>
            </form>
        </div>
    );
}

export default EditTeamComponent;