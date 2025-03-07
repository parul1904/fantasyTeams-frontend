import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import { listMatchs, deleteMatch } from '../../../services/admin/MatchService';

const ListMatchComponent = ({ userRole }) => {
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllMatches();
    }, []);

    useEffect(() => {
        if (matches.length > 0) {
            if ($.fn.dataTable.isDataTable('#matchesTable')) {
                $('#matchesTable').DataTable().destroy();
            }
            $('#matchesTable').DataTable({
                paging: true,
                searching: true,
                ordering: true,
                order: [[0, 'desc']],
                info: true,
                responsive: true
            });
        }
    }, [matches]);

    const getAllMatches = () => {
        listMatchs().then((response) => {
            setMatches(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const removeMatch = (matchId) => {
        deleteMatch(matchId).then(() => {
            getAllMatches();
        }).catch(error => {
            console.log(error);
        });
    };

    const addNewMatch = () => {
        navigate('/add-match');
    };

    const updateMatch = (id) => {
        navigate(`/edit-match/${id}`);
    };

    return (
        <div className="container">
            <br />
            {userRole === 'admin' && (
                <button className="btn btn-primary mb-2" onClick={addNewMatch}>Add Match</button>
            )}
            <table id="matchesTable" className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Season</th>
                        <th>Match No.</th>
                        <th>Team 1</th>
                        <th>Team 2</th>
                        <th>Venue</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Winner</th>
                        <th>Margin</th>
                        <th>Player of Match</th>
                        <th>MVP</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match.matchId}>
                            <td>{match.matchId}</td>
                            <td>{match.seasonYear}</td>
                            <td>{match.matchNo}</td>
                            <td>
                                <img src={match.team1} 
                                    alt="Team 1" 
                                    className="img-thumbnail" 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            </td>
                            <td>
                                <img 
                                    src={match.team2} 
                                    alt="Team 2" 
                                    className="img-thumbnail" 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            </td>
                            <td>{match.venueName}</td>
                            <td>{new Date(match.matchDate).toLocaleDateString()}</td>
                            <td>{match.matchTime}</td>
                            <td>
                                <img
                                    src={match.winnerTeam} 
                                    alt="Winner Team" 
                                    className="img-thumbnail" 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            </td>
                            <td>{match.winningMargin}</td>
                            <td>{match.playerOfTheMatch}</td>
                            <td>{match.mvp}</td>
                            <td>
                                <i 
                                    className="fas fa-edit text-info me-3" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => updateMatch(match.matchId)}
                                ></i>
                                <i 
                                    className="fas fa-trash-alt text-danger" 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => removeMatch(match.matchId)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListMatchComponent;