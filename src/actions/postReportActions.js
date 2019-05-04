/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  START_FETCHING,
  STOP_FETCHING,
  POST_REPORT
} from './actionsTypes';
import { clearNotification, newNotification } from '../services/notificationServices';
import { uploadFile } from '../helpers/utils';
import apiUrl from '../services/index';



export const postReport = ({ comment, reportType, image, video, location }) => async (dispatch, getState) => {

  let url;
  if (reportType === 'red-flag') {
    url = `${apiUrl}/red-flags`;

  } else if (reportType === 'intervention') {
    url = `${apiUrl}/interventions`;
  }

  try {
    const images = [];
    const videos = [];

    dispatch(clearNotification());
    dispatch({ type: START_FETCHING });

    if (image.length > 0) {
      const imageResponse = await uploadFile(image, 'https://api.cloudinary.com/v1_1/djdsxql5q/image/upload');
      images.push(imageResponse);
    }
    if (video.length > 0) {
      const videoResponse = await uploadFile(video, 'https://api.cloudinary.com/v1_1/djdsxql5q/video/upload');
      videos.push(videoResponse);
    }

    const { token } = getState().authReducer.user;
    const { data } = await axios.post(`${url}`, { comment, reportType, images, videos, location }, {
      headers: { 'x-access-token': token }
    });

    dispatch({
      type: POST_REPORT,
      report: data,
    });

    dispatch({ type: STOP_FETCHING });
    return data;

  } catch (error) {
    dispatch(newNotification({
      message: error.response.data.error,
      notificationType: 'error',
    }));
  }
};

