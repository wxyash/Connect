import React from 'react';
import { Home } from '../modules/Home';
import { Switch, Route } from 'react-router-dom';
// import withStyles from '../modules/Login';
// if
// import withStyles from '../modules/Register';
import Login from '../modules/Login'
import Register from '../modules/Register'



const Main = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route exact path='/Register' component={Register} />
  </Switch>
)

export default Main;