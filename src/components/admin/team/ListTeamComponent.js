import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { listTeams, deleteTeam } from '../../../services/admin/TeamService'
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import { listPlayers, deletePlayer } from '../../../services/admin/PlayerService';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ListTeamComponent = () => {

    const [teams, setTeams] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllTeams();
    }, [])

    useEffect(() => {
        if (teams.length > 0) {
            if ($.fn.dataTable.isDataTable('#teamsTable')) {
                $('#teamsTable').DataTable().destroy();
            }
            $('#teamsTable').DataTable({
                paging: true,
                searching: true,
                ordering: true,
                order: [[2, 'asc']],
                info: true,
                responsive: true
            });
        }
    }, [teams]);

    const getAllTeams = () => {
        listTeams().then((response) => {
            setTeams(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const removeTeam = (teamId) => {
       deleteTeam(teamId).then((response) =>{
        getAllTeams();

       }).catch(error =>{
           console.log(error);
       })
        
    }

    function addNewTeam() {
        navigate('/add-team')
    }

    const updateTeam = (id) => {
        navigate(`/edit-team/${id}`)
    }

    return (
        <div className = "container">
            <br />
            <button className = "btn btn-primary mb-2" onClick={addNewTeam }>Add Team</button>
            <table id="teamsTable" className="table table-striped table-bordered">
                <thead>   
                    <tr>
                        <th> Logo </th>
                        <th> Name </th>
                        <th> Short Name </th>
                        <th> Captain </th>
                        <th> Coach </th>
                        <th> Venue </th>
                        <th> Title Won </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teams.map(
                            team =>
                            <tr key = {team.id}>
                                <td>
                                <img 
                                    src={team.teamLogoUrl} 
                                    alt={team.teamShortName} 
                                    className="img-thumbnail" 
                                    style={{ width: '50px', height: '50px' }} 
                                />
                            </td>
                                <td> {team.teamName} </td>
                                <td>{team.teamShortName}</td>
                                <td>{team.captain}</td>
                                <td>{team.coach}</td>
                                <td>{team.venue}</td>
                                <td>{team.titleWon}</td>
                                <td>
                                    <i 
                                        className="fas fa-edit text-info me-3" 
                                        style={{ cursor: 'pointer' }} 
                                        onClick={() => updateTeam(team.teamId)}
                                    ></i>
                                    <i 
                                        className="fas fa-trash-alt text-danger" 
                                        style={{ cursor: 'pointer' }} 
                                        onClick={() => removeTeam(team.teamId)}
                                    ></i>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListTeamComponent