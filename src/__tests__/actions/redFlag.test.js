import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as types from '../../actions/actionsTypes';
import * as actions from '../../actions/redFlagActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handles redFlagRequest', () => {

  const store = mockStore();

  it('should dispatch a successful signup action', () => {
    const mockData = {
      records: [{}]
    };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: mockData
    }));

    return store.dispatch(actions.redFlagRequest())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});