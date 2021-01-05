import React from 'react';
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom"
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Alert from "./components/layout/Alert"
import About from "./components/pages/About"
import Home from './components/pages/Home'

import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

import './App.css';

// have to extend core react component class - includes lifecycle methods 
const App = () => {

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="Github Finder" icon="fab fa-github"/>
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/github_profile_finder/" component={Home} />
                <Route exact path ="/github_profile_finder/about" component={About} />
                <Route exact path="/github_profile_finder/user/:login" component={User}/>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
