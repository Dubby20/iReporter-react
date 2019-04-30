import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/home';
import NotFoundPage from './containers/404Page/notFound';
import Signup from './components/SignUp/Signup';
import Login from './components/Login/login';
import Report from './components/Report/report';
import RedFlag from './components/RedFlag/RedFlag';
import Intervention from './components/Intervention/Intervention';
import SingleRecord from './components/SingleRecord/singleRecord';
import Admin from './components/Admin/Admin';
import Profile from './components/Profile/Profile';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/report" component={Report} />
    <Route exact path="/redFlag" component={RedFlag} />
    <Route exact path="/intervention" component={Intervention} />
    <Route exact path="/records/:type/:id" component={SingleRecord} />
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/profile" component={Profile} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default Router;
