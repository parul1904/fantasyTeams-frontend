import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <HeaderComponent />
                <div className="container flex-grow-1">
                    <Routes>
                        <Route path="/" element={<HomeComponent />} />
                        <Route path="/players" element={<ListPlayerComponent />} />
                        <Route path="/add-player" element={<AddPlayerComponent />} />
                        <Route path="/edit-player/:id" element={<EditPlayerComponent />} />
                        <Route path="/teams" element={<ListTeamComponent />} />
                        <Route path="/add-team" element={<AddTeamComponent />} />
                        <Route path="/edit-team/:id" element={<EditTeamComponent />} />
                        <Route path="/matches" element={<ListMatchComponent />} />
                        <Route path="/add-match" element={<AddMatchComponent />} />
                        <Route path="/edit-match/:id" element={<EditMatchComponent />} />
                        <Route path="/add-squad" element={<AddSquadComponent />} />
                        <Route path="/squads" element={<ListSquadComponent />} />
                        <Route path="/edit-squad/:id" element={<EditSquadComponent />} />
                        <Route path="/stats" element={<ListStatsComponent />} />
                        <Route path="/stats/match" element={<ListStatsPerMatchComponent />} />
                        <Route path="/add-stats" element={<AddStatsComponent />} />
                        <Route path="/edit-stats/:id" element={<EditStatsComponent />} />
                        <Route path="/squad" element={<ListSquadDetailsComponent />} />
                        <Route path="/player-profile/:playerId" element={<PlayerProfileComponent />} />
                        <Route path="/comparison" element={<ComparisonComponent />} />
                        <Route path="/dreamTeam" element={<TeamPage />} />
                    </Routes>
                </div> 
                <FooterComponent />
            </div>
        </Router>
    );
}

export default App;