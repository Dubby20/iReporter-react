/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_BEGIN, REGISTER_DONE, LOGIN_SUCCESS, LOGIN_BEGIN, LOGIN_DONE, NEW_NOTIFICATION } from '../actions/actionsTypes';
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
    localStorage.setItem('userToken', data.data[0]);

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
