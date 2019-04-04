/* eslint-disable import/prefer-default-export */
import axios from 'axios';
// import authHeader from '../helpers/authHeader';


const logout = () => {
  localStorage.removeItem('user');
};


const handleResponse = response => response.data().then((data) => {
  const result = data && JSON.parse(data);
  if (!response.ok) {
    if (response.status === 401) {
      logout();
    //   location.reload(true);
    }

    const error = (result && result.message) || response.statusText;
    return Promise.reject(error);
  }

  return result;
});


const register = user => axios.post(`${process.env.API_URL}/auth/signup`, user).then(handleResponse);


export const userService = {
  register
};
