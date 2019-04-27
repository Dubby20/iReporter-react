/* eslint-disable no-unused-expressions */
const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';

export const registerRequest = () => ({
  type: REGISTER_REQUEST

});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

export const registerFailure = () => ({
  type: REGISTER_FAILURE

});
