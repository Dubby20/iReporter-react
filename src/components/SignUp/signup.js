/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';
import './signup.scss';

const Signup = () => (
  <div className="page-container">
    <div className="signUp-login">
      <h3>Create an account</h3>
      <form id="registerForm" action="" method="POST">
        <div className="msg-div" id="msg-error" />
        <div className="form-group">
          <input type="text" name="firstname" placeholder="Firstname" autoFocus required minLength="3" id="firstname" className="form-control" />
        </div>
        <div className="form-group">
          <input type="text" name="lastname" placeholder="Lastname" required minLength="3" id="lastname" className="form-control" />
        </div>
        <div className="form-group">
          <input type="text" name="othernames" placeholder="Other names" required minLength="3" id="othernames" className="form-control" />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email" required id="email" className="form-control" />
        </div>
        <div className="form-group">
          <input type="tel" name="phoneNumber" placeholder="Phone Number" required id="phoneNumber" className="form-control" />
        </div>
        <div className="form-group">
          <input type="text" name="username" placeholder="Username" required minLength="3" id="username" className="form-control" />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" required minLength="6" id="password" className="form-control" />
        </div>
        <div className="form-group">
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required minLength="6" id="confirmPassword" className="form-control" />
        </div>
        <div className="form-group btn-div">
          <input type="submit" value="SIGN UP" className="auth-btn" />
        </div>
        <div className="loader">
          <img src={require('../../../public/images/spinner.gif')} alt="spinner" className="" />
        </div>
      </form>
    </div>
    <div className="account">
      <p>
Already have an account?
        <Link to="/login"> Login</Link>
      </p>
    </div>
  </div>
);

export default Signup;
