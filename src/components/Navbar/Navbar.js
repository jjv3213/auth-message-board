import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isSignedIn, username, onStatusChange }) => {
  if (isSignedIn) {
    return (
      <div className="navbar navbar-fixed">
        <nav className="blue-grey">
          <div className="container">
            <Link to="/" className="brand-logo left">
              Message Board
            </Link>
            <ul className="right">
              <li>
                <a href="#">{username}</a>
              </li>
              <li>
                <Link to="/" onClick={() => onStatusChange("signout")}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navbar navbar-fixed">
        <nav className="blue-grey">
          <div className="container">
            <Link to="/" className="brand-logo left">
              Message Board
            </Link>
            <ul className="right">
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
