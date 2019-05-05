/* eslint-disable import/no-named-as-default */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';

const App = () => (
  <BrowserRouter>
    <Header />
    <Router />
    <Footer />
  </BrowserRouter>
);

export default App;
