import axios from 'axios';
import apiUrl from '../services/index';


const deleteRecordRequest = (id) => async (dispatch, getState) => {
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
    return error.response;
  }
};


export default deleteRecordRequest;
