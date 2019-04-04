/* eslint-disable import/prefer-default-export */
import {
  registerRequest,
  registerSuccess,
  registerFailure
} from '../actions/registerActions';

const initialState = {};

export const registration = (state = initialState, action) => {
  switch (action.type) {
    case registerRequest:
      return {
        registering: true
      };
    case registerSuccess:
      return {};
    case registerFailure:
      return {};
    default:
      return state;
  }
};
