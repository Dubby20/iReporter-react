import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import { registerReducer } from './registerReducers';
import notifyReducer from './notifyReducer';

const rootReducer = combineReducers({
  alertReducer,
  registerReducer,
  notifyReducer,
});

export default rootReducer;
