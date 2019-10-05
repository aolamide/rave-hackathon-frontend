import React from 'react';
import './App.css';
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import  { HashRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <Router >
        <Switch>
          <Route exact path='/' component = {Home}/>
          <Route path='/login' component = {LogIn}/>
          <Route path='/register' component = {SignUp}/>
          <Route path='/:userId' component = {Profile} />
        </Switch>
      </Router>
  );
}

export default App;
