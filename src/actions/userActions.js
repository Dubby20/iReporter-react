import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_BEGIN,
  REGISTER_DONE,
  LOGIN_SUCCESS,
  LOGIN_BEGIN,
  LOGIN_DONE,
  LOG_OUT
} from './actionsTypes';
import apiUrl from '../services/index';
import { clearNotification, newNotification } from '../services/notificationServices';


export const setRegister = user => ({
  type: REGISTER_SUCCESS,
  user,
});

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

export const setLogin = user => ({
  type: LOGIN_SUCCESS,
  user,
});

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

export const setLogout = () => ({
  type: LOG_OUT,
});

export const logOut = () => {
  localStorage.removeItem('store');
  dispatch({
    type: LOG_OUT,
  });

};
