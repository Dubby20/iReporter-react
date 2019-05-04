import axios from 'axios';
import {
  PROFILE_HISTORY
} from './actionsTypes';
import apiUrl from '../services/index';



const profileRequest = () => async (dispatch, getState) => {
  const userId = getState().authReducer.user.user.id;
  const urls = [
    `${apiUrl}/users/${userId}/interventions`,
    `${apiUrl}/users/${userId}/red-flags`

  ];

  try {
    const { token } = getState().authReducer.user;
    const promises = await Promise.all(urls.map(url => axios.get(`${url}`, {
      headers: { 'x-access-token': token }
    })));

    const intervention = promises[0].data.data[0].interventions;
    const redFlag = promises[1].data.data[0].redFlags;
    const merge = [...intervention, ...redFlag];
    const allRecords = merge.sort((a, b) => a.id - b.id);

    dispatch({
      type: PROFILE_HISTORY,
      records: allRecords,
      redFlagDrafts: allRecords.filter(record => record.type === 'red-flag' && record.status === 'draft').length,
      redFlagUnderInvestigation: allRecords.filter(record => record.type === 'red-flag' && record.status === 'under-investigation').length,
      redFlagResolved: allRecords.filter(record => record.type === 'red-flag' && record.status === 'resolved').length,
      redFlagRejected: allRecords.filter(record => record.type === 'red-flag' && record.status === 'rejected').length,
      interventionDrafts: allRecords.filter(record => record.type === 'intervention' && record.status === 'draft').length,
      interventionUnderInvestigation: allRecords.filter(record => record.type === 'intervention' && record.status === 'under-investigation').length,
      interventionResolved: allRecords.filter(record => record.type === 'intervention' && record.status === 'resolved').length,
      interventionRejected: allRecords.filter(record => record.type === 'intervention' && record.status === 'rejected').length,

    });
    return promises;
  } catch (error) {
    return error.response;
  }
};

export default profileRequest;

