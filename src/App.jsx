import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import './App.scss';


import Router from './router';

const App = () => (
  <BrowserRouter>
    <Header />
    <Router />
    <Footer />
  </BrowserRouter>
);

export default App;
