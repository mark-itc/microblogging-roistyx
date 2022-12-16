import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
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
    </div>
  );
}
