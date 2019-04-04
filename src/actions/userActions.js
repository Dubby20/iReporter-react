// /* eslint-disable import/prefer-default-export */
// import { userService } from '../services';
// import alertReducer from '../reducers';
// import {
//   registerRequest,
//   registerSuccess,
//   registerFailure
// } from './registerActions';

// const request = user => ({
//   type: registerRequest,
//   user
// });
// const success = user => ({
//   type: registerSuccess,
//   user
// });
// const failure = error => ({
//   type: registerFailure,
//   error
// });

// const register = user => (dispatch) => {
//   dispatch(request(user));

//   userService.register(user)
//     .then(
//       (user) => {
//         dispatch(alertReducer.success());
//         history.push('/login');
//         dispatch(success('Registration successful'));
//         return user;
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(failure(failure.toString()));
//       }
//     );
// };

// export const userActions = {
//   register
// };
