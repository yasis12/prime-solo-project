import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserPage.css';
import { number } from 'prop-types';

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
    <div className="container user-page">
      <div id='user-card'>
      <h2>Welcome to Budget Buddy <span className="green-username">{user.username}</span>!</h2>
        <p>You and {user.id} other users</p>
        <p>have signed up to improve their financial future!</p>
      
        <div className='better-future'>
          <h4>Are you ready begin?</h4>
        </div>
        <div className='button-container'>
          <button onClick={handleYes}>Yes</button>
          <button onClick={handleNotYet}>Not Yet</button>
        </div>
        
      </div>
      
    </div>
  );
}

export default UserPage;
