import React from 'react'
import '../scss/navigation.scss';
import {
    NavLink,
  } from 'react-router-dom';
function Navigation(props) {
    return (
      <nav className="navbar">
        <ul>
        <li>
               <NavLink exact to="/signOut">
              Sign Out
            </NavLink>
          </li>
      
        <li>
            <NavLink exact to="/calendar">
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/home">
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
  

export default Navigation
