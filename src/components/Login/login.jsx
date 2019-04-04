/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';


class Login extends Component {
    state = { }

    render() {
      return (
        <div className="page-container">
          <div className="signUp-login">
            <h3>Login</h3>
            <form id="loginForm" action="" method="POST">
              <div className="msg-div" id="msg-error" />
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" autoFocus required id="email" className="form-control" />
              </div>

              <div className="form-group">
                <input type="password" name="password" placeholder="Password" required id="password" className="form-control" />
              </div>

              <div className="form-group">
                <div className="form-link">
                  <label For="checkbox">
                    <input type="checkbox" />
                     Remember Me
                  </label>
                  <Link to="#" class="float-right forget">Forgot Password?</Link>
                </div>
              </div>
              <div className="form-group btn-div">
                <input type="submit" value="LOGIN" className="auth-btn" />
              </div>
              <div className="loginLoader loader">
                <img src="./assets/images/spinner.gif" alt="spinner" />
              </div>
            </form>
          </div>
          <div className="account">
            <p>
                Don't have an account yet?
              <Link to="register.html"> Create an account</Link>
            </p>
          </div>
        </div>
      );
    }
}

export default Login;
