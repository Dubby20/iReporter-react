import { authReducer } from '../../reducers/authReducers';
import * as types from '../../actions/actionsTypes';

const initialState = {
  user: {},
  isLoading: false,
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REGISTER_BEGIN', () => {
    initialState.isLoading = true;
    expect(authReducer(undefined, {
      type: types.REGISTER_BEGIN,
      isLoading: true
    })).toEqual(initialState);
  });

  it('should handle REGISTER_SUCCESS', () => {
    initialState.user = {};
    initialState.isLoading = false;
    expect(authReducer(undefined, {
      type: types.REGISTER_SUCCESS,
      user: {},
      isLoading: false
    })).toEqual(initialState);
  });

  it('should handle REGISTER_DONE', () => {
    initialState.isLoading = false;
    expect(authReducer(undefined, {
      type: types.REGISTER_DONE,
      isLoading: false
    })).toEqual(initialState);
  });

});