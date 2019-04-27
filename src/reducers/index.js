import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import { registration } from './registerReducers';

const rootReducer = combineReducers({
  alertReducer,
  registration
});

export default rootReducer;
