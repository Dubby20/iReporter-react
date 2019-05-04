import { combineReducers } from 'redux';
import recordReducer from './recordReducer';
import { authReducer } from './authReducers';
import notifyReducer from './notifyReducer';

const rootReducer = combineReducers({
  recordReducer,
  authReducer,
  notifyReducer
});

export default rootReducer;
