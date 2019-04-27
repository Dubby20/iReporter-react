/* eslint-disable import/prefer-default-export */
import {
  REGISTER_SUCCESS, REGISTER_BEGIN, REGISTER_DONE,
} from '../actions/actionsTypes';

const initialState = {
  user: {},
  isLoading: false
};

export const registerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER_BEGIN:
      return {
        ...state, isLoading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state, user: action.user
      };
    case REGISTER_DONE:
      return {
        ...state, isLoading: false
      };
    default:
      return state;
  }
};
