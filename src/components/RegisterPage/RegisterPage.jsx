import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css'

function RegisterPage() {
  const history = useHistory();

  return (
    <div className='register-page'>
      <br /><br />
      <div id='register-form'>
       <RegisterForm />
      </div>
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
