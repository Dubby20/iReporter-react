/* eslint-disable global-require */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, ErrorMessage } from 'formik';
import { signUpValidationSchema } from '../../helpers/validation';
import { registerRequest } from '../../actions/userActions';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';
import './signup.scss';

export class Signup extends Component {
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
    };
  }

  redirect = () => {
    const { history } = this.props;
    history.push('/');
  }


  render() {
    const { user } = this.state;
    const { registerRequest, isLoading } = this.props;

    return (
      <div className="page-container signup-container">
        <div className="signUp-login">
          <h3>Create an account</h3>
          <Notification />
          <Formik
            initialValues={user}
            validationSchema={signUpValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (await registerRequest(values)) {
                setSubmitting(true);
                this.redirect();
              }
            }}
          >
            {props => (
              <Form id="registerForm" onSubmit={props.handleSubmit}>
                <ErrorMessage name="firstname">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="text" name="firstname" value={props.values.firstname} placeholder="Firstname" autoFocus id="firstname" className="form-control" onChange={props.handleChange} />
                </div>
                <ErrorMessage name="lastname">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="text" name="lastname" value={props.values.lastname} placeholder="Lastname" id="lastname" className="form-control" onChange={props.handleChange} />
                </div>
                <ErrorMessage name="othernames">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="text" name="othernames" value={props.values.othernames} onChange={props.handleChange} placeholder="Other names" id="othernames" className="form-control" />
                </div>
                <ErrorMessage name="email">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="email" name="email" value={props.values.email} onChange={props.handleChange} placeholder="Email" required id="email" className="form-control" />
                </div>
                <ErrorMessage name="phoneNumber">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="tel" name="phoneNumber" value={props.values.phoneNumber} onChange={props.handleChange} placeholder="Phone Number" required id="phoneNumber" className="form-control" />
                </div>
                <ErrorMessage name="username">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="text" name="username" value={props.values.username} onChange={props.handleChange} placeholder="Username" id="username" className="form-control" />
                </div>
                <ErrorMessage name="password">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="password" name="password" value={props.values.password} onChange={props.handleChange} placeholder="Password" id="password" className="form-control" />
                </div>
                <ErrorMessage name="confirmPassword">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="password" name="confirmPassword" value={props.values.confirmPassword} onChange={props.handleChange} placeholder="Confirm Password" id="confirmPassword" className="form-control" />
                </div>
                <div className="form-group btn-div">
                  <input type="submit" value="SIGN UP" className="auth-btn" />
                </div>
                <div className="center">
                  {isLoading ? <Loader /> : ''}
                </div>
              </Form>
            )}
          </Formik>
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
  registerRequest: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading
});

const connectedRegisterPage = connect(mapStateToProps, { registerRequest })(Signup);
export default connectedRegisterPage;
