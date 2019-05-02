import notifyReducer from '../../reducers/notifyReducer';
import * as types from '../../actions/actionsTypes';

const initialState = {
  message: '',
  show: false,
  type: '',
};

describe('notify reducer', () => {
  it('should return the initial state', () => {
    expect(notifyReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CLEAR_NOTIFICATION', () => {
    initialState.message = '';
    initialState.show = false;
    initialState.type = '';
    expect(notifyReducer(undefined, {
      type: types.CLEAR_NOTIFICATION,
      message: '',
      show: false,
    })).toEqual(initialState);
  });

  it('should handle NEW_NOTIFICATION', () => {
    initialState.type = undefined;
    initialState.show = true;
    expect(notifyReducer(undefined, {
      type: types.NEW_NOTIFICATION,
      message: '',
      show: true,
    })).toEqual(initialState);
  });


});