import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Budget Buddy</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>
            {/* Insturctions link */}
            <Link className="navLink" to="/instructions">
              Instructions
            </Link>
            {/* Income link */}
            <Link className="navLink" to="/income">
              Income
            </Link>
            {/* Needs link */}
            <Link className="navLink" to="/needs">
              Needs
            </Link>
            {/* Wants link */}
            <Link className="navLink" to="/wants">
              Wants
            </Link>
            {/* Savgings & Debts link */}
            <Link className="navLink" to="/savingsdebts">
              Savings&Debts
            </Link>
            {/* Audit link */}
            <Link className="navLink" to="/audit">
              Audit
            </Link>
            {/* Resources link */}
            <Link className="navLink" to="/resources">
              Resources
            </Link>


            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
