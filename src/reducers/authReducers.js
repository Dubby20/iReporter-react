/* eslint-disable import/prefer-default-export */
import {
  REGISTER_SUCCESS, REGISTER_BEGIN, REGISTER_DONE, LOGIN_SUCCESS, LOGIN_BEGIN, LOGIN_DONE
} from '../actions/actionsTypes';

let initialState;

try {
  initialState = JSON.parse(localStorage.getItem('store')).authReducer;
} catch (error) {
  initialState = {
    user: {},
    isLoading: false,
  };
}

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER_BEGIN:
    case LOGIN_BEGIN:
      return {
        ...state, isLoading: true
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state, user: action.user
      };

    case REGISTER_DONE:
    case LOGIN_DONE:
      return {
        ...state, isLoading: false
      };

    default:
      return state;
  }
};
