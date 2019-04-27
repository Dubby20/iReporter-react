/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable global-require */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../actions/userActions';
import './signup.scss';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstname: '',
        lastname: '',
        othernames: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstname && user.lastname && user.username && user.othernames && user.email
      && user.phoneNumber && user.password) {
      dispatch(userActions.register(user));
    }
  }
  // passwordsMatch = () =>
  // const {
  //   password === confirmPassword
  // } = this.state.user;
  // this.state.user.password === this.state.user.confirmPassword;

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (

      <div className="page-container">
        <div className="signUp-login">
          <h3>Create an account</h3>
          <form id="registerForm" onSubmit={this.handleSubmit}>
            <div className="msg-div" id="msg-error" />
            <div className={`form-group ${submitted && !user.firstName} ? ' has-error' : '')`}>
              <input type="text" name="firstname" value={user.firstname} placeholder="Firstname" autoFocus required minLength="3" id="firstname" className="form-control" onChange={this.handleChange} />
              {submitted && !user.firstname
                && <div className="help-block">First Name is required</div>
              }
            </div>
            <div className={`form-group ${submitted && !user.lastname} ? ' has-error' : '')`}>
              <input type="text" name="lastname" value={user.lastname} placeholder="Lastname" required minLength="3" id="lastname" className="form-control" onChange={this.handleChange} />
              {submitted && !user.lastName
                && <div className="help-block">Last Name is required</div>
              }
            </div>
            <div className={`form-group ${submitted && !user.othernames} ? ' has-error' : '')`}>
              <input type="text" name="othernames" value={user.othernames} onChange={this.handleChange} placeholder="Other names" required minLength="3" id="othernames" className="form-control" />
              {submitted && !user.othernames
                && <div className="help-block">Other Name is required</div>
              }
            </div>
            <div className={`form-group ${submitted && !user.email} ? ' has-error' : '')`}>
              <input type="email" name="email" value={user.email} onChange={this.handleChange} placeholder="Email" required id="email" className="form-control" />
              {submitted && !user.email
                && <div className="help-block">Email is required</div>
              }
            </div>
            <div className={`form-group ${submitted && !user.phoneNumber} ? ' has-error' : '')`}>
              <input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={this.handleChange} placeholder="Phone Number" required id="phoneNumber" className="form-control" />
              {submitted && !user.phoneNumber
                && <div className="help-block">Phone Number is required</div>
              }
            </div>
            <div className={`form-group ${submitted && !user.username} ? ' has-error' : '')`}>
              <input type="text" name="username" value={user.username} onChange={this.handleChange} placeholder="Username" required minLength="3" id="username" className="form-control" />
              {submitted && !user.username
                && <div className="help-block">Username is required</div>
              }
            </div>
            <div className="form-group">
              <input type="password" name="password" onChange={this.handleChange} placeholder="Password" required minLength="6" id="password" className="form-control" />
              {submitted && !user.password
                && <div className="help-block">Password is required</div>
              }
            </div>
            <div className={`form-group ${submitted && this.passwordsMatch() ? 'has-error' : ''})`}>
              <input type="password" name="confirmPassword" onChange={this.handleChange} placeholder="Confirm Password" required minLength="6" id="confirmPassword" className="form-control" />
            </div>
            <div className="form-group btn-div">
              <input type="submit" value="SIGN UP" className="auth-btn" />
              {registering
                && <img src={require('../../../public/images/spinner.gif')} alt="spinner" className="" />
              }
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
  }
}

Signup.propTypes = {
  registering: PropTypes.string.isRequired,
  dispatch: PropTypes.string.isRequired
};


const mapStateToProps = (state) => {
  const { registering } = state.registration;
  return {
    registering
  };
};

const connectedRegisterPage = connect(mapStateToProps)(Signup);
export { connectedRegisterPage as Signup };
