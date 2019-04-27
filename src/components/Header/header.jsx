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
          <li><Link to="/" className="showBtn active">Home</Link></li>
          <li><Link to="/profile" className="showBtn">My Profile</Link></li>
          <li><Link to="/report" className="showBtn">Report</Link></li>
          <li>
            <Link to="/redFlag" className="showBtn">Red-flags</Link>
          </li>
          <li>
            <Link to="/intervention" className="showBtn">Interventions</Link>
          </li>
          <li><a href="#" className="showBtn logOut">Log out</a></li>
          <li><Link to="/login" className="hideBtn">Login</Link></li>
          <li><Link to="/signup" className="hideBtn">Register</Link></li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Header;
