import React from 'react';
import { connect } from 'react-redux';
import './Notification.scss';

const Notification = ({ show, type, message, }) => {
  return (
    <div className="notification">
      <p className={`${type} ${show ? 'show' : 'hide'}`}>{message}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  type: state.notifyReducer.type,
  message: state.notifyReducer.message,
  show: state.notifyReducer.show,
});

export default connect(mapStateToProps)(Notification);
