import { CLEAR_NOTIFICATION, NEW_NOTIFICATION } from '../actions/actionsTypes';

export const clearNotification = () => dispatch => {
  dispatch({
    type: CLEAR_NOTIFICATION,
  });
};

export const newNotification = ({ notificationType, message, }) => dispatch => {
  dispatch({
    type: NEW_NOTIFICATION,
    notificationType,
    message,
  });
};
