import React from 'react';
import { Login } from '../modules/Login';
import { Home } from '../modules/Home';

import { Switch, Route } from 'react-router-dom';

const Main = () => (
  <Switch>
    <Route exact path='/Login' component={Login} />
    <Route exact path='/' component={Home} />
  </Switch>
)

export default Main;