import recordReducer from '../../reducers/recordReducer';
import * as types from '../../actions/actionsTypes';

const initialState = {
  records: [],
  isLoading: false,
  isVisible: false,
  redFlagDrafts: 0,
  interventionDrafts: 0,
  record: {},
  report: {},
};

describe('record reducer', () => {
  it('should return the initial state', () => {
    expect(recordReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle START_FETCHING', () => {
    initialState.isLoading = true;
    expect(recordReducer(undefined, {
      type: types.START_FETCHING,
      isLoading: true
    })).toEqual(initialState);
  });

  it('should handle GET_SINGLE_RECORD', () => {
    initialState.record = {};
    initialState.isLoading = false;
    expect(recordReducer(undefined, {
      type: types.GET_SINGLE_RECORD,
      record: {},
      isLoading: false
    })).toEqual(initialState);
  });


  it('should handle POST_REPORT', () => {
    initialState.report = {};
    initialState.isLoading = false;
    expect(recordReducer(undefined, {
      type: types.POST_REPORT,
      report: {},
      isLoading: false
    })).toEqual(initialState);
  });

  it('should handle STOP_FETCHING', () => {
    initialState.isLoading = false;
    expect(recordReducer(undefined, {
      type: types.STOP_FETCHING,
      isLoading: false
    })).toEqual(initialState);
  });
});