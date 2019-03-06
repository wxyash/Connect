import React from 'react';
import { Login } from '../modules/Login';
import { Home } from '../modules/Home';
import { Switch, Route } from 'react-router-dom';
import withStyles from './../modules/Login';


const Main = () => (
  <Switch>
    <Route exact path='/' component={withStyles} />
  </Switch>
)

export default Main;