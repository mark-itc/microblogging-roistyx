import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Navbar.css";

export default function Navbar() {
  function handleLogout() {}

  return (
    <div className="navbar">
      <span className="menu-items">
        <Link className="link-element" to="/">
          Home
        </Link>
      </span>
      <span className="menu-items">
        <Link className="link-element" to="/profile">
          Profile
        </Link>
      </span>
      <span className="menu-items">
        <Button
          variant="link"
          onClick={handleLogout}
          className="link-element"
          to="/profile"
        >
          Profile
        </Button>
      </span>
    </div>
  );
}
