/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  REGISTER_SUCCESS, REGISTER_BEGIN, REGISTER_DONE, LOGIN_SUCCESS, LOGIN_BEGIN, LOGIN_DONE, NEW_NOTIFICATION, GET_REDFLAG,
  GET_INTERVENTION, GET_SINGLE_RECORD, START_FETCHING, STOP_FETCHING
} from '../actions/actionsTypes';
import { clearNotification, newNotification } from './notificationServices';

const apiUrl = 'https://ireporter247.herokuapp.com/api/v1';


export const registerRequest = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_BEGIN });
    dispatch(clearNotification());

    const { data } = await axios.post(`${apiUrl}/auth/signup`, { ...user });
    localStorage.setItem('userToken', data.data[0].token);

    dispatch({
      type: REGISTER_SUCCESS,
      user: data.data[0].user,
    });

    return data;
  } catch (error) {
    dispatch({ type: REGISTER_DONE });
    dispatch(newNotification({
      message: error.response.data.error,
      notificationType: 'error',
    }));
  }
};


export const loginRequest = (user) => async (dispatch) => {

  try {
    dispatch({ type: LOGIN_BEGIN });
    dispatch(clearNotification());

    const { data } = await axios.post(`${apiUrl}/auth/login`, { ...user });
    localStorage.setItem('userToken', data.data[0].token);

    dispatch({
      type: LOGIN_SUCCESS,
      user: data.data[0],
    });

    return data;
  } catch (error) {
    dispatch({ type: LOGIN_DONE });
    dispatch(newNotification({
      message: error.response.data.error,
      notificationType: 'error',
    }));
  }
};

export const redFlagRequest = () => async (dispatch) => {

  try {
    dispatch({ type: START_FETCHING });
    const token = localStorage.getItem('userToken');
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
    return error.response.data.error;
  }
};

export const interventionRequest = () => async (dispatch) => {

  try {
    dispatch({ type: START_FETCHING });
    const token = localStorage.getItem('userToken');
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
    return error.response.data.error;
  }
};

let recordUrl;

export const singleRecordRequest = (id) => async (dispatch) => {
  let recordType = localStorage.getItem('recordType');
  if (recordType === 'red-flag') {
    recordUrl = `${apiUrl}/red-flags/${id}`;

    recordType = 'Red-Flag';
  } else if (recordType === 'intervention') {
    recordUrl = `${apiUrl}/interventions/${id}`;
    recordType = 'Intervention';
  }
  try {
    dispatch({ type: START_FETCHING });

    const token = localStorage.getItem('userToken');
    const { data } = await axios.get(`${recordUrl}`, {
      headers: { 'x-access-token': token }
    });
    const recordList = data.data[0].report;

    dispatch({
      type: GET_SINGLE_RECORD,
      records: recordList,
    });

    dispatch({ type: STOP_FETCHING });
    return data;
  } catch (error) {
    return error.response.data.error;
  }
};
