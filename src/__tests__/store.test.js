import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import * as types from '../actions/actionsTypes';

describe('store', () => {
  it('should handle store', () => {
    const store = createStore(rootReducer, []);
    const record = { type: 'intervention' };

    const action = types.GET_INTERVENTION(record);
    store.dispatch(action);
    const actual = store.getState().userRecord[0];
    const expected = { type: 'intervention' };

    expect(actual).toEqual(expected);
  });
});