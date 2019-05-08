import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions/userActions';
import './header.scss';



export class Header extends Component {


  componentDidMount() {
    const mainNav = document.getElementById('js-menu');
    const navBarToggle = document.getElementById('js-navbar-toggle');
    if (navBarToggle) {
      navBarToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
      });
    }
  }

  render() {
    const { logOut, isLoggedIn } = this.props;
    return (
      <div className="container header-container">
        <div className="centered">
          <dt className="logo">
            i
            <span className="logo-name">Reporter</span>
          </dt>
          <dd className="logo-text">Speak up. Ask for help.</dd>
        </div>
        <hr />
        <div>
          <nav id="nav" role="navigation" className="navbar">
            <span className="navbar-toggle" id="js-navbar-toggle">
              <i className="fas fa-bars" />
            </span>
            <ul className="main-nav" id="js-menu">
              {
                isLoggedIn ? (
                  <>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">My Profile</Link></li>
                    <li><Link to="/report">Report</Link></li>
                    <li>
                      <Link to="/redFlag">Red-flags</Link>
                    </li>
                    <li>
                      <Link to="/intervention">Interventions</Link>
                    </li>
                    <li><Link to="/" onClick={logOut}>Log out</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Register</Link></li>
                  </>
                  )
              }
            </ul>
          </nav>
        </div>
      </div>
    );
  }

}


const mapStateToProps = state => ({
  user: state.authReducer.user.user,
  isLoggedIn: state.authReducer.isLoggedIn
});

const connectedHeader = connect(mapStateToProps, { logOut })(Header);
export default connectedHeader;
