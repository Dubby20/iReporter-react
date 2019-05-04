import axios from 'axios';
import {
  GET_REDFLAG,
  START_FETCHING,
  STOP_FETCHING,
} from './actionsTypes';
import apiUrl from '../services/index';


export const redFlagRequest = () => async (dispatch, getState) => {

  try {
    dispatch({ type: START_FETCHING });
    const { token } = getState().authReducer.user;
    const { data } = await axios.get(`${apiUrl}/red-flags`, {
      headers: { 'x-access-token': token }
    });
    localStorage.setItem('recordType', data.data[0].redFlag[0].type);
    const recordList = data.data[0].redFlag;

    dispatch({
      type: GET_REDFLAG,
      records: recordList,
    });

    dispatch({ type: STOP_FETCHING });
    return data;
  } catch (error) {
    return error.response;
  }
};
