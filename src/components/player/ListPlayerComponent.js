import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import { listPlayers, deletePlayer } from '../../services/PlayerService';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ListPlayerComponent = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPlayers();
    }, []);

    useEffect(() => {
        if (players.length > 0) {
            if ($.fn.dataTable.isDataTable('#playersTable')) {
                $('#playersTable').DataTable().destroy();
            }
            $('#playersTable').DataTable({
                paging: true,
                searching: true,
                ordering: true,
                order: [[0, 'desc']],
                info: true,
                responsive: true
            });
        }
    }, [players]);

    const getAllPlayers = () => {
        listPlayers().then((response) => {
            setPlayers(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const removePlayer = (playerId) => {
        deletePlayer(playerId).then((response) => {
            getAllPlayers();
        }).catch(error => {
            console.log(error);
        });
    };

    const addNewPlayer = () => {
        navigate('/add-player');
    };

    const updatePlayer = (playerId) => {
        navigate(`/edit-player/${playerId}`);
    };

    return (
        <div className="container">
            <br />
            <button className="btn btn-primary mb-2" onClick={addNewPlayer}>Add Player</button>
            <table id="playersTable" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Player Name</th>
                        <th>Nick Name</th>
                        <th>Role</th>
                        <th>Country</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => (
                        <tr key={player.playerId}>
                            <td>{player.playerId}</td>
                            <td>
                                <img 
                                    src={player.playerImgUrl} 
                                    alt={player.playerName} 
                                    className="img-thumbnail" 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            </td>
                            <td>{player.playerName}</td>
                            <td>{player.nickName}</td>
                            <td>{player.role}</td>
                            <td>{player.country}</td>
                            <td>
                                <i 
                                    className="fas fa-edit text-info me-3" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => updatePlayer(player.playerId)}
                                ></i>
                                <i 
                                    className="fas fa-trash-alt text-danger" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => removePlayer(player.playerId)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListPlayerComponent;