import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as actions from '../services/userServices';
import * as types from '../actions/actionsTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handles signup actions', () => {
  const mockData = {
    firstname: "Jacy",
    lastnamse: "Alexa",
    othernames: "Dubem",
    username: "Dubbby",
    email: "jacy@yahoo.com",
    phoneNumber: "09076543456",
    password: "5678kjhg",
    confirmPassword: "5678kjhg"
  };

  let store;

  it('handles success case', () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
      data: mockData
    }));

    const expectedActions = [{
      type: types.REGISTER_SUCCESS,
      user: mockData
    }];

    store = mockStore({ user: {} });

    return store.dispatch(actions.registerRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
