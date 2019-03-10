import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../modules/Login'
import Register from '../modules/Register'
import Home from '../modules/Home'



const Main = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route exact path='/Register' component={Register} />
    <Route exact path='/Home' component={Home} />
  </Switch>
)

export default Main;