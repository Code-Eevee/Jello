import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignOut from './pages/SignOut';
import Navigation from './components/Navigation';
import './scss/styles.scss';

const App = (props) => {
  return <div>
    <Router>
    <Navigation />
      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Login} />
      <Route path="/calendar" exact component={Calendar}/>
      <Route path="/signOut" exact component={SignOut}/>

      </Switch>
    
    </Router>
    </div>;
};

export default App;
