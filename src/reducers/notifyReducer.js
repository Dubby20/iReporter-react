import { NEW_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/actionsTypes';

const initialState = {
  message: '',
  show: false,
  type: '',
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        message: '',
        show: false,
        type: '',
      };

    case NEW_NOTIFICATION:
      return {
        ...state,
        message: action.message,
        show: true,
        type: action.notificationType,
      };

    default:
      return state;

  }
};

export default notifyReducer;
