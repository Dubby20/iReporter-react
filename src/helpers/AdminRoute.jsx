import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Admin from '../components/Admin/Admin';


const AdminRoute = ({
  component: Component,
  isLoggedIn,
  ...rest

}) => (
  <Route
      {...rest}
      render={props => (isLoggedIn && isLoggedIn.user.isAdmin
        ? (
          <div>
            <Admin />
            <Component {...props} />
          </div>
        )
        : (<Redirect to="/login" />)
      )}
    />
  );

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn
});

export default connect(mapStateToProps)(AdminRoute);