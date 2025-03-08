import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <main style={{height: "90vh", overflowY: "auto"}}>
        <Outlet />
      </main>
    </div>
  );
}
