import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from 'pages/login';
import Page404 from 'pages/Page404';
import Layout from 'layout';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/home" />} />
      <Route path="/app" component={Layout} />
      <Route exact path="/login" component={Login} />
      <Route component={Page404} />
    </Switch>
  </Router>
)