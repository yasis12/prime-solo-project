import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useState} from 'react';

function Nav() {
  const user = useSelector((store) => store.user);
  const [showDropDown, setShowDropDown] = useState(false);

  // Dropdown functionality
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

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
            <div className="navLink dropdown">
              Audit
              <div className="dropdown-content">
              <Link to="/instructions">Instructions</Link>
                <Link to="/income">Income</Link>
                <Link to="/needs">Needs</Link>
                <Link to="/wants">Wants</Link>
                <Link to="/savingsdebts">Savings&Debts</Link>
                <Link to="/audit">Audit</Link>
              </div>
            </div>
            {/* Comments Link */}
            <Link className="navLink" to="/budgetcomments">
              Comments
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
