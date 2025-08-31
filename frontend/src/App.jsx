import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function App() {
  const loc = useLocation();
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20, fontFamily: "system-ui" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>AI Reel Generator</h2>
        <nav style={{ display: "flex", gap: 12 }}>
          {loc.pathname !== "/dashboard" && <Link to="/dashboard">Dashboard</Link>}
          {loc.pathname !== "/login" && <Link to="/login">Login</Link>}
          {loc.pathname !== "/register" && <Link to="/register">Register</Link>}
        </nav>
      </header>
      <hr />
      <Outlet />
    </div>
  );
}
