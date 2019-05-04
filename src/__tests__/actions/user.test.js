import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as types from '../../actions/actionsTypes';
import * as actions from '../../actions/userActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login actions', () => {
  it('handles login', () => {
    const user = {};
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      user
    };

    expect(actions.setLogin(user)).toEqual(expectedAction);
  });
});

describe('register actions', () => {
  it('handles registration', () => {
    const user = {
      user: {}
    };

    const expectedAction = {
      type: types.REGISTER_SUCCESS,
      user
    };

    expect(actions.setRegister(user)).toEqual(expectedAction);
  });
});


describe('logout actions', () => {
  it('handles logout', () => {

    const expectedAction = {
      type: types.LOG_OUT,
    };

    expect(actions.setLogout()).toEqual(expectedAction);
  });
});


const loginUser = {
  username: 'Dubby',
  email: 'jacy@yahoo.com',
};

describe('Login User()', () => {
  const dispatch = jest.fn();
  const successResponse = {
    data: [
      {
        user: loginUser,
        token: 'secret'
      }
    ]
  };

  it('should login user successfully', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: { ...successResponse },
    }));
    await actions.loginRequest()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.REGISTER_BEGIN);
  });
});

describe('Register user()', () => {
  const dispatch = jest.fn();
  const successResponse = {
    data: [
      {
        fistname: "Jacy",
        lastname: "Alexa",
        othernames: "Dubem",
        username: "Dubby",
        phoneNumber: "08076543453",
        email: "jac@yahoo.com",
        password: '567dfghj',
        confirmPassword: "567dfghj"
      }
    ]
  };

  it('should sign up user successfully', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: { ...successResponse },
    }));
    await actions.registerRequest()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.REGISTER_BEGIN);
  });
});


describe('Register user()', () => {
  const dispatch = jest.fn();
  const successResponse = {
    data: [
      {
        fistname: "Jacy",
        lastname: "Alexa",
        othernames: "Dubem",
        username: "Dubby",
        phoneNumber: "08076543453",
        email: "jac@yahoo.com",
        password: '567dfghj',
        confirmPassword: "567dfghj"
      }
    ]
  };

  it('should sign up user successfully', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: { ...successResponse },
    }));
    await actions.registerRequest()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[0][0].type).toEqual(types.REGISTER_BEGIN);
  });
});