import axios from 'axios';
import {
  ADMIN_RECORDS
} from './actionsTypes';
import apiUrl from '../services/index';


const adminRequest = () => async (dispatch, getState) => {
  const urls = [
    `${apiUrl}/interventions`,
    `${apiUrl}/red-flags`
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
    return error.response;
  }
};

export default adminRequest;
