import { GET_REDFLAG, GET_INTERVENTION, GET_SINGLE_RECORD, START_FETCHING, STOP_FETCHING, EDIT_COMMENT } from '../actions/actionsTypes';

const initialState = {
  records: [],
  isLoading: false,
  isVisible: false
};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state, isLoading: true
      };

    case GET_REDFLAG:
    case GET_INTERVENTION:
    case GET_SINGLE_RECORD:
      return {
        ...state, records: action.records
      };

    case STOP_FETCHING:
      return {
        ...state, isLoading: false
      };

    default:
      return state;
  }
};

export default recordReducer;
