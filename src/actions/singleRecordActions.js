import axios from 'axios';
import {
  GET_SINGLE_RECORD,
  START_FETCHING,
  STOP_FETCHING,
} from './actionsTypes';
import apiUrl from '../services/index';


export const setRecord = record => ({
  type: GET_SINGLE_RECORD,
  record,
});

export const singleRecordRequest = ({ id, type }) => async (dispatch, getState) => {
  let recordUrl;

  if (type === 'red-flag') {
    recordUrl = `${apiUrl}/red-flags/${id}`;
  } else if (type === 'intervention') {
    recordUrl = `${apiUrl}/interventions/${id}`;
  }
  try {
    dispatch({ type: START_FETCHING });

    const { token } = getState().authReducer.user;
    const { data } = await axios.get(`${recordUrl}`, {
      headers: { 'x-access-token': token }
    });
    const recordList = data.data[0].report;

    dispatch({
      type: GET_SINGLE_RECORD,
      record: recordList,
    });

    dispatch({ type: STOP_FETCHING });
    return data;
  } catch (error) {
    return error.response;
  }
};
