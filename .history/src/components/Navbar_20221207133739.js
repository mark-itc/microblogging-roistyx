import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState();

  async function handleLogout(currentUser) {
    setError("");

    try {
      await logout();
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }

  return (
    <div className="navbar">
      <span className="menu-items">
        <Link className="link-element" to="/">
          Home
        </Link>
      </span>
      <Button
        variant="link"
        onClick={handleLogout}
        className="link-element"
        to="/profile"
      >
        Log Out
      </Button>
      <span className="menu-items">
        <strong>Logged in as {currentUser.email}</strong>
      </span>
    </div>
  );
}
