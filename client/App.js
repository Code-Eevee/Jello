import React, { Component, useState } from 'react';
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
import Footer from './components/Footer';

import SignUp from './pages/SignUp';
import SignOut from './pages/SignOut';
import Navigation from './components/Navigation';
import './scss/styles.scss';

const App = (props) => {
  const [email, setEmail] = useState(() => '');
  const [password, setPassword] = useState(() => '');
  const [userID, setUserID] = useState(() => 0);
  const [firstName, setFirstName] = useState(() => '');
  const [lastName, setLastName] = useState(() => '');

  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/home" exact>
            <Home userID={userID} />
          </Route>
          <Route path="/" exact>
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              userID={userID}
              setUserID={setUserID}
            />
          </Route>
          <Route path="/signUp" exact>
            <SignUp
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              userID={userID}
              setUserID={setUserID}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
            />
          </Route>
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/signOut" exact component={SignOut} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/signOut" exact component={SignOut} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
