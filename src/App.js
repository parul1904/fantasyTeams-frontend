import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HeaderComponent from './components/admin/HeaderComponent';
import FooterComponent from './components/admin/FooterComponent';
import HomeComponent from './components/admin/HomeComponent';
import ListPlayerComponent from './components/admin/player/ListPlayerComponent';
import AddPlayerComponent from './components/admin/player/AddPlayerComponent';
import EditPlayerComponent from './components/admin/player/EditPlayerComponent';
import ListTeamComponent from './components/admin/team/ListTeamComponent';
import AddTeamComponent from './components/admin/team/AddTeamComponent';
import EditTeamComponent from './components/admin/team/EditTeamComponent';
import AddMatchComponent from './components/admin/match/AddMatchComponent';
import ListMatchComponent from './components/admin/match/ListMatchComponent';
import EditMatchComponent from './components/admin/match/EditMatchComponent';
import AddSquadComponent from './components/admin/squad/AddSquadComponent';
import ListSquadComponent from './components/admin/squad/ListSquadComponent';
import EditSquadComponent from './components/admin/squad/EditSquadComponent';
import ListStatsComponent from './components/admin/stats/ListStatsComponent';
import ListStatsPerMatchComponent from './components/admin/stats/ListStatsPerMatchComponent';
import AddStatsComponent from './components/admin/stats/AddStatsComponent';
import EditStatsComponent from './components/admin/stats/EditStatsComponent';
import ListSquadDetailsComponent from './components/admin/squad/ListSquadComponent';
import PlayerProfileComponent from './components/admin/player/PlayerProfileComponent';
import ComparisonComponent from './components/admin/comparison/ComparisonComponent';
import TeamPage from './components/team/TeamPage';
import LoginPage from './components/LoginPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');

    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                {loggedIn && <HeaderComponent userRole={userRole} />}
                <div className="container flex-grow-1">
                    <Routes>
                        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setUserRole={setUserRole} />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/home" element={loggedIn ? <HomeComponent /> : <Navigate to="/login" />} />
                        <Route path="/players" element={loggedIn ? <ListPlayerComponent userRole={userRole} /> : <Navigate to="/login" />} />
                        <Route path="/add-player" element={loggedIn ? <AddPlayerComponent /> : <Navigate to="/login" />} />
                        <Route path="/edit-player/:id" element={loggedIn ? <EditPlayerComponent /> : <Navigate to="/login" />} />
                        <Route path="/teams" element={loggedIn ? <ListTeamComponent userRole={userRole} /> : <Navigate to="/login" />} />
                        <Route path="/add-team" element={loggedIn ? <AddTeamComponent /> : <Navigate to="/login" />} />
                        <Route path="/edit-team/:id" element={loggedIn ? <EditTeamComponent /> : <Navigate to="/login" />} />
                        <Route path="/matches" element={loggedIn ? <ListMatchComponent userRole={userRole} /> : <Navigate to="/login" />} />
                        <Route path="/add-match" element={loggedIn ? <AddMatchComponent /> : <Navigate to="/login" />} />
                        <Route path="/edit-match/:id" element={loggedIn ? <EditMatchComponent /> : <Navigate to="/login" />} />
                        <Route path="/add-squad" element={loggedIn ? <AddSquadComponent /> : <Navigate to="/login" />} />
                        <Route path="/squads" element={loggedIn ? <ListSquadComponent userRole={userRole} /> : <Navigate to="/login" />} />
                        <Route path="/edit-squad/:id" element={loggedIn ? <EditSquadComponent /> : <Navigate to="/login" />} />
                        <Route path="/stats" element={loggedIn ? <ListStatsComponent userRole={userRole} /> : <Navigate to="/login" />} />
                        <Route path="/stats/match" element={loggedIn ? <ListStatsPerMatchComponent userRole={userRole} /> : <Navigate to="/login" />} />
                        <Route path="/add-stats" element={loggedIn ? <AddStatsComponent /> : <Navigate to="/login" />} />
                        <Route path="/edit-stats/:id" element={loggedIn ? <EditStatsComponent /> : <Navigate to="/login" />} />
                        <Route path="/squad" element={loggedIn ? <ListSquadDetailsComponent userRole={userRole} /> : <Navigate to="/login" />} />
                        <Route path="/player-profile/:playerId" element={loggedIn ? <PlayerProfileComponent userRole={userRole} /> : <Navigate to="/login" />} />
                        <Route path="/comparison" element={loggedIn ? <ComparisonComponent userRole={userRole} /> : <Navigate to="/login" />} />
                        <Route path="/dreamTeam" element={loggedIn ? <TeamPage userRole={userRole} /> : <Navigate to="/login" />} />
                    </Routes>
                </div> 
                <FooterComponent />
            </div>
        </Router>
    );
}

export default App;