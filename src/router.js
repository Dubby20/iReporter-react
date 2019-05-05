/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AdminRoute from './helpers/AdminRoute';
import UserRoute from './helpers/UserRoute';
import Home from './components/Home/Home';
import NotFoundPage from './containers/404Page/NotFound';
import Signup from './components/SignUp/Signup';
import Login from './components/Login/Login';
import Report from './components/Report/Report';
import RedFlag from './components/RedFlag/RedFlag';
import Intervention from './components/Intervention/Intervention';
import SingleRecord from './components/SingleRecord/SingleRecord';
import Admin from './components/Admin/Admin';
import Profile from './components/Profile/Profile';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <UserRoute exact path="/report" component={Report} />
    <UserRoute exact path="/redFlag" component={RedFlag} />
    <UserRoute exact path="/intervention" component={Intervention} />
    <UserRoute exact path="/records/:type/:id" component={SingleRecord} />
    <AdminRoute exact path="/admin" component={Admin} />
    <UserRoute exact path="/profile" component={Profile} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default Router;
