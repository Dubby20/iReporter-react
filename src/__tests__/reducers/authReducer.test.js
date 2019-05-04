import { authReducer } from '../../reducers/authReducers';
import * as types from '../../actions/actionsTypes';

const initialState = {
  user: {},
  isLoading: false,
  isLoggedIn: false
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REGISTER_BEGIN', () => {
    initialState.isLoading = true;
    initialState.isLoggedIn = false;
    expect(authReducer(undefined, {
      type: types.REGISTER_BEGIN,
      isLoading: true,
      isLoggedIn: true
    })).toEqual(initialState);
  });

  it('should handle REGISTER_SUCCESS', () => {
    initialState.user = {};
    initialState.isLoading = false;
    initialState.isLoggedIn = true;
    expect(authReducer(undefined, {
      type: types.REGISTER_SUCCESS,
      user: {},
      isLoading: false,
      isLoggedIn: true
    })).toEqual(initialState);
  });

  it('should handle REGISTER_DONE', () => {
    initialState.isLoading = false;
    initialState.isLoggedIn = false;
    expect(authReducer(undefined, {
      type: types.REGISTER_DONE,
      isLoading: false,
      isLoggedIn: false
    })).toEqual(initialState);
  });

  it('should handle LOG_OUT', () => {
    initialState.isLoggedIn = false;
    initialState.user = null;
    expect(authReducer(undefined, {
      type: types.LOG_OUT,
      user: null,
      isLoggedIn: false
    })).toEqual(initialState);
  });

});