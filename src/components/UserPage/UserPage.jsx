import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function UserPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const handleYes = () => { 
    history.push('/instructions')
  };

  const handleNotYet = () => {
    history.push('/resources')
  };

  return (
    <div className="container">
      <h2>Welcome to Budget Buddy {user.username}!</h2>
      <p>You are user number: {user.id}</p>
      <p>Are you ready to better your financial future?</p>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNotYet}>Not Yet</button>
      <br /> 

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
