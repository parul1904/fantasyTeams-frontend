import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import { listSquads, deleteSquad } from '../../services/SquadService';

const ListSquadComponent = () => {
    const [squads, setSquads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllSquads();
    }, []);

    useEffect(() => {
        if (squads.length > 0) {
            if ($.fn.dataTable.isDataTable('#squadsTable')) {
                $('#squadsTable').DataTable().destroy();
            }
            $('#squadsTable').DataTable({
                paging: true,
                searching: true,
                ordering: true,
                order: [[0, 'desc']],
                info: true,
                responsive: true
            });
        }
    }, [squads]);

    const getAllSquads = () => {
        listSquads().then((response) => {
            setSquads(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const removeSquad = (squadId) => {
        deleteSquad(squadId).then(() => {
            getAllSquads();
        }).catch(error => {
            console.log(error);
        });
    };

    const addNewSquad = () => {
        navigate('/add-squad');
    };

    const updateSquad = (squadId) => {
        navigate(`/edit-squad/${squadId}`);
    };

    return (
        <div className="container">
            <br />
            <button className="btn btn-primary mb-2" onClick={addNewSquad}>Add Squad</button>
            <table id="squadsTable" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Season</th>
                        <th>Player</th>
                        <th>Image</th>
                        <th>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {squads.map(squad => (
                        <tr key={squad.squadId}>
                            <td>{squad.squadId}</td>
                            <td>{squad.seasonYear}</td>
                            <td>{squad.playerName}</td>
                            <td> <img 
                                    src={squad.playerImage} 
                                    alt="Team Logo" 
                                    className="img-thumbnail" 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            </td>
                            <td><img 
                                    src={squad.teamLogo} 
                                    alt="Team Logo" 
                                    className="img-thumbnail" 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            </td>
                            
                           
                            <td>
                                <i 
                                    className="fas fa-edit text-info me-3" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => updateSquad(squad.squadId)}
                                ></i>
                                <i 
                                    className="fas fa-trash-alt text-danger" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => removeSquad(squad.squadId)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListSquadComponent;