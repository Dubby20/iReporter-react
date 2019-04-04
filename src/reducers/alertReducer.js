import {
  success,
  failure
} from '../actions/alertActions';

const initialState = {};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case success:
      return {
        type: 'alert-success',
        message: action.message
      };
    case failure:
      return {
        type: 'alert-failure',
        message: action.message
      };
    default:
      return state;
  }
};

export default alertReducer;
