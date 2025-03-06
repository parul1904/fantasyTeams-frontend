import React, { useState, useEffect } from "react";
import Select from "react-select";
import TeamLayoutComponent from "./TeamLayoutComponent";
import { getDreamTeamByMatchNo } from "../../services/admin/DreamTeamService";
import { getSeasons, getMatches } from "../../services/admin/DropDownService";

const TeamPage = () => {
  const [seasons, setSeasons] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRes, setIsRes] = useState(false);

  useEffect(() => {
    loadSeasons();
  }, []);

  const loadSeasons = async () => {
    try {
      const response = await getSeasons();
      const seasonOptions = response.data.map((season) => ({
        value: season.id,
        label: season.name,
      }));
      setSeasons(seasonOptions);
    } catch (error) {
      console.error("Error loading seasons:", error);
    }
  };

  const loadMatches = async (seasonId) => {
    try {
      const response = await getMatches(seasonId);
      const matchOptions = response.data.map((match) => ({
        value: match.id,
        label: `Match-${match.name}`,
      }));
      setMatches(matchOptions);
    } catch (error) {
      console.error("Error loading matches:", error);
    }
  };

  const handleSeasonChange = (selectedOption) => {
    setSelectedSeason(selectedOption);
    setSelectedMatch(null);
    setPlayers([]);
    if (selectedOption) {
      loadMatches(selectedOption.value);
    } else {
      setMatches([]);
    }
  };

  // const handleMatchChange = async (selectedOption) => {
  //     setSelectedMatch(selectedOption);
  //     if (selectedOption) {
  //         try {
  //             const response = await getDreamTeamByMatchNo(selectedOption.value);
  //             console.log("Dream Team Data:", response.data); // Log the response data
  //             setPlayers(response.data);
  //         } catch (error) {
  //             console.error("Error loading dream team:", error);
  //         }
  //     } else {
  //         setPlayers([]);
  //     }
  // };

  const handleMatchChange = async (selectedOption) => {
    setSelectedMatch(selectedOption);
    setError(null);

    if (selectedOption) {
      setLoading(true);
      try {
        const response = await getDreamTeamByMatchNo(selectedOption.value);
        console.log("Dream Team Data:", response.data); // Log the response data
        if (response.data && Array.isArray(response.data)) {
          setPlayers(response.data);
          setError(null);
        } else {
          setError("Invalid data format received");
          setPlayers([]);
        }
      } catch (error) {
        console.error("Error loading dream team:", error);
        setError("Failed to load team data. Please try again.");
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    } else {
      setPlayers([]);
    }
  };

  return (
    <div className="container">
      <div className="row my-2">
        <div className="col-md-6 mt-2">
          <Select
            name="seasonId"
            options={seasons}
            onChange={handleSeasonChange}
            className="basic-single"
            classNamePrefix="select"
            isClearable
            placeholder="Select Season"
            isSearchable={true}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </div>
        <div className="col-md-6 mt-2">
          <Select
            name="matchId"
            options={matches}
            onChange={handleMatchChange}
            className="basic-single"
            classNamePrefix="select"
            isClearable
            placeholder="Select Match"
            isSearchable={true}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </div>
      </div>

      <h2 className="text-center">Dream Team</h2>

      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && players.length > 0 && (
        <TeamLayoutComponent players={players.slice(0,11)} />
      )}

      {!loading && !error && players.length === 0 && selectedMatch && (
        <div className="alert alert-info text-center" role="alert">
          No team data available for this match
        </div>
      )}
    </div>
  );
};

export default TeamPage;
