import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";


import Login from './components/login/Login';
import Connections from './components/connections/Connections';

import Profile from './components/profile/Profile';
import Timeline from './components/timeline/Timeline';
import Trello from './components/trello/Trello.js';
import App from './App';

export default (
  <Router history={hashHistory}>
    <Route path="/login" component={Login} />
    <Route path="/" component={App}>
      <IndexRoute component={Timeline}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/trello" component={Trello}/>
      <Route path="/connections" component={Connections}/>
    </Route>
  </Router>
);
