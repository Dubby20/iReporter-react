import axios from 'axios';
import {
  GET_SINGLE_RECORD,
} from './actionsTypes';
import apiUrl from '../services/index';
import { clearNotification, newNotification } from '../services/notificationServices';


const editCommentRequest = ({ id, type, newComment }) => async (dispatch, getState) => {
  let url;
  if (type === 'red-flag') {
    url = `${apiUrl}/red-flags/${id}/comment`;

  } else if (type === 'intervention') {
    url = `${apiUrl}/interventions/${id}/comment`;
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
      record: recordDetails,
    });

    return data;
  } catch (error) {
    dispatch(newNotification({
      message: error.response.data.error,
      notificationType: 'error',
    }));
  }
};

export default editCommentRequest;
