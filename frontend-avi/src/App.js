import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FantasyHome from "./components/Home/FantasyHome";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Teams from "./components/Teams/Teams";
import Matches from "./components/Matches/Matches";
import AboutUs from "./components/AboutUs/AboutUs";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [userClicked, setUserClicked] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<FantasyHome onUserClick={() => setUserClicked(true)} />}
        />
        {userClicked && (
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            {/* <Route path="/performance" element={<Performance />} /> */}
            <Route path="/matches" element={<Matches />} />
            <Route path="/aboutus" element={<AboutUs />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
