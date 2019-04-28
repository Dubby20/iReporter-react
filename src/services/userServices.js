/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  REGISTER_SUCCESS, REGISTER_BEGIN, REGISTER_DONE, LOGIN_SUCCESS, LOGIN_BEGIN, LOGIN_DONE, NEW_NOTIFICATION, GET_REDFLAG,
  GET_INTERVENTION, GET_SINGLE_RECORD, START_FETCHING, STOP_FETCHING, ADMIN_RECORDS
} from '../actions/actionsTypes';
import { clearNotification, newNotification } from './notificationServices';

const apiUrl = 'https://ireporter247.herokuapp.com/api/v1';


export const registerRequest = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_BEGIN });
    dispatch(clearNotification());

    const { data } = await axios.post(`${apiUrl}/auth/signup`, { ...user });

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
    return error.response.data.error;
  }
};

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
    return error.response.data.error;
  }
};

export const singleRecordRequest = (id) => async (dispatch, getState) => {
  let recordType = localStorage.getItem('recordType');
  let recordUrl;

  if (recordType === 'red-flag') {
    recordUrl = `${apiUrl}/red-flags/${id}`;

    recordType = 'Red-Flag';
  } else if (recordType === 'intervention') {
    recordUrl = `${apiUrl}/interventions/${id}`;
    recordType = 'Intervention';
  }
  try {
    dispatch(clearNotification());
    dispatch({ type: START_FETCHING });

    const { token } = getState().authReducer.user;
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


export const editCommentRequest = (id, newComment) => async (dispatch, getState) => {
  let recordType = localStorage.getItem('recordType');
  let url;

  if (recordType === 'red-flag') {
    url = `${apiUrl}/red-flags/${id}/comment`;

    recordType = 'Red-Flag';
  } else if (recordType === 'intervention') {
    url = `${apiUrl}/interventions/${id}/comment`;
    recordType = 'Intervention';
  }

  try {
    dispatch(clearNotification());

    const { token } = getState().authReducer.user;
    const { data } = await axios.patch(`${url}`, { comment: newComment }, {
      headers: { 'x-access-token': token }
    });

    const recordDetails = data.data[0].editComment;

    dispatch({
      type: GET_SINGLE_RECORD,
      records: recordDetails,
    });

    return data;
  } catch (error) {
    dispatch(newNotification({
      message: error.response.data.error,
      notificationType: 'error',
    }));
  }
};

export const deleteRecordRequest = (id) => async (dispatch, getState) => {
  let recordType = localStorage.getItem('recordType');
  let url;

  if (recordType === 'red-flag') {
    url = `${apiUrl}/red-flags/${id}/`;

    recordType = 'Red-Flag';
  } else if (recordType === 'intervention') {
    url = `${apiUrl}/interventions/${id}/`;
    recordType = 'Intervention';
  }

  try {

    const { token } = getState().authReducer.user;
    const { data } = await axios.delete(`${url}`, {
      headers: { 'x-access-token': token }
    });


    return data;
  } catch (error) {
    return error.response.data.error;
  }
};


export const adminRequest = () => async (dispatch, getState) => {
  const urls = [
    'https://ireporter247.herokuapp.com/api/v1/interventions',
    'https://ireporter247.herokuapp.com/api/v1/red-flags'
  ];

  try {
    const { token } = getState().authReducer.user;
    const promises = await Promise.all(urls.map(url => axios.get(`${url}`, {
      headers: { 'x-access-token': token }
    })));
    const intervention = promises[0].data.data[0].intervention;
    const redFlag = promises[1].data.data[0].redFlag;
    const merge = [...intervention, ...redFlag];
    const allIncident = merge.sort((a, b) => a.id - b.id);

    dispatch({
      type: ADMIN_RECORDS,
      records: allIncident,
    });

    return promises;
  } catch (error) {
    return error.response.data.error;
  }
};