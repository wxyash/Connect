import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../modules/Login'
import Register from '../modules/Register'
import Home from '../modules/Home'
import AdminRegister from '../modules/AdminRegister';
import AdminLogin from '../modules/AdminLogin';


const Main = () => (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route exact path='/Register' component={Register} />
    <Route exact path='/Home' component={Home} />
    <Route exact path='/AdminRegister' component={AdminRegister} />
    <Route exact path='/AdminLogin' component={AdminLogin} />
  </Switch>
)

export default Main;