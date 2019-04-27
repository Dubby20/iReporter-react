import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import { authReducer } from './authReducers';
import notifyReducer from './notifyReducer';

const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  notifyReducer,
});

export default rootReducer;
