import {
  GET_REDFLAG, GET_INTERVENTION, GET_SINGLE_RECORD, START_FETCHING,
  STOP_FETCHING, ADMIN_RECORDS, PROFILE_HISTORY, GET_LOCATION, POST_REPORT
} from '../actions/actionsTypes';

const initialState = {
  records: [],
  isLoading: false,
  isVisible: false,
  redFlagDrafts: 0,
  interventionDrafts: 0,
  record: {},
  report: {},
  payload: location,
  coords: {
    latitude: 0,
    longitude: 0
  }
};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state, isLoading: true
      };

    case GET_SINGLE_RECORD:
      return {
        ...state, record: action.record
      };
    case GET_REDFLAG:
    case GET_INTERVENTION:
    case ADMIN_RECORDS:
    case PROFILE_HISTORY:
      return {
        ...state, ...action
      };

    case POST_REPORT:
      return {
        ...state, report: action.report
      };

    case STOP_FETCHING:
      return {
        ...state, isLoading: false
      };

    case GET_LOCATION:
      return {
        ...state, location: action.payload
      };

    default:
      return state;
  }
};

export default recordReducer;
