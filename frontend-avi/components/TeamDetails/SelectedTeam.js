import React from "react";
import "./SelectedTeam.css";
import Squad from "../Squad/Squad";

export default function SelectedTeam({ selectedTeam }) {
  return (
    <div className="selectedTeam">
      <div
        className="teamDetailsSection card"
        style={{ backgroundColor: `${selectedTeam.color}` }}
      >
        <div className="w-25 fw-bold">
          <img
            src={selectedTeam.image}
            alt="captain"
            stlye={{ height: "5rem" }}
          />
          <p>{selectedTeam.titleYears}</p>
        </div>
        <div className="w-75 d-flex flex-column align-items-center fw-bold">
          <table>
            <tbody>
              <tr>
                <td className="rowHeader">
                  Captain<span> : </span>
                </td>
                <td className="rowData">{selectedTeam.captain}</td>
              </tr>
              <tr>
                <td className="rowHeader">
                  Coach<span> : </span>
                </td>
                <td className="rowData">{selectedTeam.coach}</td>
              </tr>
              <tr>
                <td className="rowHeader">
                  Owner<span> : </span>
                </td>
                <td className="rowData">{selectedTeam.owner}</td>
              </tr>
              <tr>
                <td className="rowHeader">
                  Home Venue<span> : </span>
                </td>
                <td className="rowData">{selectedTeam.homeVenue}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <Squad selectedTeam={selectedTeam} />
    </div>
  );
}
