import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUp = ({
  email,
  setEmail,
  password,
  setPassword,
  setUserID,
  firstName,
  setFirstName,
  lastName,
  setLastName
}) => {
  const history = useHistory();
  
  //firstname function
  const saveFirstName = (e) => {
    setFirstName(e.target.value);
  };

  //lastname function
  const saveLastName = (e) => {
    setLastName(e.target.value);
  };

  //email function
  const saveEmail = (e) => {
    setEmail(e.target.value);
  };

  //password function
  const savePassword = (e) => {
    setPassword(e.target.value);
  };

  //complete signup function
  const finishSignup = async () => {
    await fetch('/data/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({first_name: firstName, last_name: lastName, email: email, password: password })
    })
      .then(response => response.json())
      .then(response => {
        console.log('signed up', response)
      })
      .catch(err => {
        console.log('there was an error in signup', err);
      });
  };


  return (
    <div>
      <h1> Sign Up Page</h1>
      <div className="signup-form">
        <label id="user-firstname-label">First Name: </label>
        <input id="user-firstname-input" type="text" placeholder="Enter first name" onChange={saveFirstName}></input>
        <label id="user-lastname-label">Last Name: </label>
        <input id="user-lastname-input" type="text" placeholder="Enter last name" onChange={saveLastName}></input>
        <label id="user-email-label">Email: </label>
        <input id="user-email-input" type="text" placeholder="Enter email" onChange={saveEmail}></input>
        <label id="user-password-label">Password: </label>
        <input id="user-password-input" type="text" placeholder="Enter password" onChange={savePassword}></input>
        <button id="signup-finish" onClick={finishSignup}>Finish Signup</button>
      </div>
    </div>
  )
};

export default SignUp;