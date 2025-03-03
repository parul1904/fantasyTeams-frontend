import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import HomeComponent from './components/HomeComponent';
import ListPlayerComponent from './components/player/ListPlayerComponent';
import AddPlayerComponent from './components/player/AddPlayerComponent';
import EditPlayerComponent from './components/player/EditPlayerComponent';
import ListTeamComponent from './components/team/ListTeamComponent';
import AddTeamComponent from './components/team/AddTeamComponent';
import EditTeamComponent from './components/team/EditTeamComponent';
import AddMatchComponent from './components/match/AddMatchComponent';
import ListMatchComponent from './components/match/ListMatchComponent';
import EditMatchComponent from './components/match/EditMatchComponent';
import AddSquadComponent from './components/squad/AddSquadComponent';
import ListSquadComponent from './components/squad/ListSquadComponent';
import EditSquadComponent from './components/squad/EditSquadComponent';
import ListStatsComponent from './components/stats/ListStatsComponent';
import ListStatsPerMatchComponent from './components/stats/ListStatsPerMatchComponent';
import AddStatsComponent from './components/stats/AddStatsComponent';
import EditStatsComponent from './components/stats/EditStatsComponent';

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
                    </Routes>
                </div>
                <FooterComponent />
            </div>
        </Router>
    );
}

export default App;