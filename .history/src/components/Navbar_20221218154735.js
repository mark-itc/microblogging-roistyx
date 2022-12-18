import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { logout, currentUser } = useAuth();
  const [setError] = useState();

  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="navbar">
      <span className="menu-items">
        <Link className="link-element" to="/">
          Home
        </Link>
      </span>
      {currentUser ? (
        <span className="menu-items">
          <Link className="link-element" to="/profile">
            Profile
          </Link>
        </span>
      ) : (
        ""
      )}
      {currentUser ? (
        <Button
          variant="link"
          onClick={handleLogout}
          className="link-element"
          to="/profile"
        >
          Log Out
        </Button>
      ) : (
        <Button variant="link" onClick={() => navigate("/login")}>
          Log in
        </Button>
      )}
      {/* {!currentUser ? (
        ""
      ) : (
        <div className="menu-items">
          {currentUser.email ? (
            <span>
              Logged in as <strong> {currentUser.email}</strong>
            </span>
          ) : (
            <span>Hello guest!</span>
          )}
        </div>
      )} */}
    </div>
  );
}
