import axios from 'axios';
import {
  GET_INTERVENTION,
  START_FETCHING,
  STOP_FETCHING,
} from './actionsTypes';
import apiUrl from '../services/index';



export const interventionRequest = () => async (dispatch, getState) => {

  try {
    dispatch({ type: START_FETCHING });
    const { token } = getState().authReducer.user;
    const { data } = await axios.get(`${apiUrl}/interventions`, {
      headers: { 'x-access-token': token }
    });
    localStorage.setItem('recordType', data.data[0].intervention[0].type);
    const recordList = data.data[0].intervention;

    dispatch({
      type: GET_INTERVENTION,
      records: recordList,
    });

    dispatch({ type: STOP_FETCHING });
    return data;
  } catch (error) {
    return error.response;
  }
};

