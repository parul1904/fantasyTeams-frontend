import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { updatePlayer, getPlayerById } from '../../../services/admin/PlayerService';

const EditPlayerComponent = () => {
    const [player, setPlayer] = useState({ playerName: '', nickName: '', playerImgUrl: '', role: '', country: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getPlayerById(id).then(response => {
            setPlayer(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer({ ...player, [name]: value });
    }

    const savePlayer = (e) => {
        e.preventDefault();
        updatePlayer(id, player).then(response => {
            navigate('/players');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container">
            <h2 className="text-center">Edit Player</h2>
            <form>
                <div className="form-group">
                    <label>Player Name</label>
                    <input type="text" name="playerName" className="form-control" value={player.playerName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Nick Name</label>
                    <input type="text" name="nickName" className="form-control" value={player.nickName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Player Img Url</label>
                    <input type="text" name="playerImgUrl" className="form-control" value={player.playerImgUrl} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select name="role" className="form-control" value={player.role} onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="Batter">Batter</option>
                        <option value="Bowler">Bowler</option>
                        <option value="All Rounder">All Rounder</option>
                        <option value="Wicket Keeper">Wicket Keeper</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Batting Style</label>
                    <select name="battingStyle" className="form-control" value={player.battingStyle} onChange={handleChange}>
                        <option value="">Select Batting Style</option>
                        <option value="Right Handed Bat">Right Handed Bat</option>
                        <option value="Left Handed Bat">Left Handed Bat</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Bowling Style</label>
                    <select name="bowlingStyle" className="form-control" value={player.bowlingStyle} onChange={handleChange}>
                        <option value="">Select Bowling Style</option>
                        <option value="Right Arm Fast">Right Arm Fast</option>
                        <option value="Left Arm Fast">Left Arm Fast</option>
                        <option value="Right Arm Medium Fast">Right Arm Medium Fast</option>
                        <option value="Left Arm Medium Fast">Left Arm Medium Fast</option>
                        <option value="Off-Spinner">Off-Spinner</option>
                        <option value="Leg-Spinner">Leg-Spinner</option>
                        <option value="Orthodox">Orthodox</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="country" className="form-control" value={player.country} onChange={handleChange} />
                </div>
                <button className="btn btn-success" onClick={savePlayer}>Save</button>
            </form>
        </div>
    );
}

export default EditPlayerComponent;