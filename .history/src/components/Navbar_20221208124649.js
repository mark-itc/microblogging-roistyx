import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { StaticExample } from "../contexts/ProfileModal";
import "./Navbar.css";

export default function Navbar() {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState();
  console.log(currentUser);
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
      // console.log(error
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
        <Button
          variant="link"
          onClick={handleLogout}
          className="link-element"
          to="/profile"
        >
          Log Out
        </Button>
      ) : (
        <Button onClick={() => navigate("/login")}>Log in</Button>
      )}

      {!currentUser ? (
        ""
      ) : (
        <span className="menu-items">
          <strong>Logged in as {currentUser.email}</strong>
        </span>
      )}
      <Button onClick={<StaticExample />}></Button>
    </div>
  );
}
