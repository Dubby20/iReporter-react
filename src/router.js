import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/home';
import NotFoundPage from './containers/404Page/notFound';
import Signup from './components/SignUp/signup';
import Login from './components/Login/login';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default Router;
