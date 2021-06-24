import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({
    email,
    setEmail,
    password,
    setPassword,
    setUserID
}) => {
    const [loginFailedNotification, setLoginFailedNotification] = useState(() => []);
    const history = useHistory();
    
    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const login = async () => {
        await fetch('/data/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.userVerified) {
                    setUserID(response.userID);
                    history.push('/');
                } else {
                    setLoginFailedNotification([<div>Check email/password or sign up.</div>]);
                }
            })
    }
    
    //might need signup page
    const signup = () => {
        history.push('/signUp');
    }
    
    return (
        <div>
            <h1> LOGIN PAGE</h1>
            <div className="login-form">
                <label id="user-email-label">Email: </label>
                <input id="user-email-input" type="text" placeholder="Enter your Email" onChange={updateEmail}></input>
                <label id="user-password-label">Password: </label>
                <input id="user-password-input" type="text" placeholder="Enter your password" onChange={updatePassword}></input>
                <button id="login-button" onClick={login}>Login</button>
                <button id="signup-button" onClick={signup}>Sign Up</button>
            </div>
            {loginFailedNotification}
        </div>
    )
}

export default Login;
