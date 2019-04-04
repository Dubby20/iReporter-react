import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/home';
import NotFoundPage from './containers/404Page/notFound';
import { Signup } from './components/SignUp/signup';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={Signup} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default Router;
