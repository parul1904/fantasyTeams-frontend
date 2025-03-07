import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import { listStats, deleteStats } from '../../../services/admin/StatsService';

const ListStatsComponent = ({ userRole })  => {
    const [stats, setStats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllStats();
    }, []);

    useEffect(() => {
        if (stats.length > 0) {
            if ($.fn.dataTable.isDataTable('#statsTable')) {
                $('#statsTable').DataTable().destroy();
            }
            $('#statsTable').DataTable({
                paging: true,
                searching: true,
                ordering: true,
                order: [[0, 'desc']],
                info: true,
                responsive: true
            });
        }
    }, [stats]);

    const getAllStats = () => {
        listStats().then((response) => {
            setStats(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const removeStats = (statsId) => {
        deleteStats(statsId).then(() => {
            getAllStats();
        }).catch(error => {
            console.log(error);
        });
    };

    const addNewStats = () => {
        navigate('/add-stats');
    };

    const updateStats = (id) => {
        navigate(`/edit-stats/${id}`);
    };

    return (
        <div className="container">
            <br /><br />
            <h2 className="text-center">List Statistics</h2>
            {userRole === 'admin' && (
            <button className="btn btn-primary mb-2" onClick={addNewStats}>Add Statistics</button>
            )}
            <table id="statsTable" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Season</th>
                        <th>Match</th>
                        <th>Match Date</th>
                        <th>Player</th>
                        <th>Dream11 Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map(stat => (
                        <tr key={stat.id}>
                            <td>{stat.seasonYear}</td>
                            <td><img 
                                    src={stat.team1} 
                                    alt="Team 1" 
                                    className="img-thumbnail" 
                                    style={{ width: '50px', height: '50px' }} 
                                /> VS
                                <img 
                                    src={stat.team2} 
                                    alt="Team 1" 
                                    className="img-thumbnail" 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            </td>
                            <td>{stat.matchDate}</td>
                            <td>{stat.playerName}</td>
                            <td>{stat.dream11Points}</td>
                           
                            <td>
                                <i 
                                    className="fas fa-edit text-info me-3" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => updateStats(stat.id)}
                                ></i>
                                <i 
                                    className="fas fa-trash-alt text-danger" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => removeStats(stat.id)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListStatsComponent;