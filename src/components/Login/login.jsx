import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, Form, ErrorMessage } from 'formik';
import { loginRequest } from '../../services/userServices';
import { loginValidationSchema } from '../../helpers/validation';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';
import './login.scss';


export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        email: '',
        password: ''
      }
    };
  }



  redirect = (to) => {
    const { history } = this.props;
    history.push(to);
  }

  render() {
    const { userInfo } = this.state;
    const { loginRequest, isLoading } = this.props;
    return (
      <div className="page-container login-container">
        <div className="signUp-login">
          <h3>Login</h3>
          <Notification />
          <Formik
            initialValues={userInfo}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (await loginRequest(values)) {
                const { user } = this.props;
                if (user.isAdmin) {
                  this.redirect('/admin');
                } else {
                  this.redirect('/');
                }
                setSubmitting(true);
              }
            }}
          >
            {props => (
              <Form id="loginForm" className="form" onSubmit={props.handleSubmit}>
                <ErrorMessage name="email">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="email" name="email" value={props.values.email} onChange={props.handleChange} placeholder="Email" autoFocus id="email" className="form-control" />
                </div>

                <ErrorMessage name="password">{msg => <div className="error error-message">{msg}</div>}</ErrorMessage>
                <div className="form-group">
                  <input type="password" name="password" value={props.values.password} onChange={props.handleChange} placeholder="Password" id="password" className="form-control" />
                </div>

                <div className="form-group">
                  <div className="form-link">
                    <label htmlFor="checkbox">
                      <input type="checkbox" />
                      Remember Me
                    </label>
                    <Link to="#" className="float-right forget">Forgot Password?</Link>
                  </div>
                </div>
                <div className="form-group btn-div">
                  <input type="submit" value="LOGIN" className="auth-btn" />
                </div>
                <div className="center">
                  {isLoading ? <Loader /> : ''}
                </div>
              </Form>
            )}
          </Formik>
          <div className="account">
            <p>
              Don't have an account yet?
              <Link to="/signup"> Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  user: state.authReducer.user.user
});

const connectedLoginPage = connect(mapStateToProps, { loginRequest })(Login);
export default connectedLoginPage;

