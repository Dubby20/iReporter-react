/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';


const Header = () => (
  <div className="container">
    <div className="centered">
      <dt className="logo">
        i
        <span className="logo-name">Reporter</span>
      </dt>
      <dd className="logo-text">Speak up. Ask for help.</dd>
    </div>
    <hr />
    <div>
      <nav id="nav" role="navigation">
        <ul>
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/report">Report</Link></li>
          <li>
            <Link to="/redFlag">Red-flags</Link>
          </li>
          <li>
            <Link to="/intervention">Interventions</Link>
          </li>
          <li><Link to="">Log out</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Register</Link></li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
