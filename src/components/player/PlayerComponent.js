import React, {useState, useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import { updatePlayer, createPlayer, getPlayerById} from '../../services/PlayerService';

const PlayerComponent = () => {

    const [playerName, setPlayerName] = useState('')
    const [nickName, setNickName] = useState('')
    const [playerImgUrl, setPlayerImgUrl] = useState('')
    const [role, setRole] = useState('')
    const [country, setCountry] = useState('')

    const navigate = useNavigate();
    const {id} = useParams();

    const saveOrUpdatePlayer = (e) => {
        e.preventDefault();

        const player = {playerName, nickName, playerImgUrl, role, country}

        console.log(player);
        if(id){
            updatePlayer(id, player).then((response) => {
                navigate('/players')
            }).catch(error => {
                console.log(error)
            })

        }else{
            createPlayer(player).then((response) =>{
                console.log(response.data)
                    navigate('/players');
                }).catch(error => {
                console.log(error)
            })
        }
        
    }

    useEffect(() => {
        if(id){
            getPlayerById(id).then((response) =>{
                setPlayerName(response.data.playerName)
                setNickName(response.data.nickName)
                setPlayerImgUrl(response.data.playerImgUrl)
                setRole(response.data.role)
                setCountry(response.data.country)
            }).catch(error => {
                console.log(error)
            })
        }

    }, [id])

    const pageTitle = () => {

        if(id){
            return <h2 className = "text-center">Update Player</h2>
        }else{
            return <h2 className = "text-center">Add Player</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           pageTitle()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Player Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Player name"
                                        name = "playerName"
                                        className = "form-control"
                                        value = {playerName}
                                        onChange = {(e) => setPlayerName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Nick Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Nick name"
                                        name = "nickName"
                                        className = "form-control"
                                        value = {nickName}
                                        onChange = {(e) => setNickName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Player Img Url :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter email Id"
                                        name = "playerImgUrl"
                                        className = "form-control"
                                        value = {playerImgUrl}
                                        onChange = {(e) => setPlayerImgUrl(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Player Role :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Player Role"
                                        name = "role"
                                        className = "form-control"
                                        value = {role}
                                        onChange = {(e) => setRole(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Player Country :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Player Country"
                                        name = "country"
                                        className = "form-control"
                                        value = {country}
                                        onChange = {(e) => setCountry(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdatePlayer(e)} >Submit </button>
                                {/* <Link to="/players" className="btn btn-danger"> Cancel </Link> */}
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default PlayerComponent