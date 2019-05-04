import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as types from '../../actions/actionsTypes';
import adminRequest from '../../actions/adminActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('handles adminRequest', () => {
  it('handles success case', () => {
    const mockData = {
      data: [{
        intervention: [
          {
            id: 1,
            user_id: 288,
            type: 'intervention',
            comment: "Hello world",
            status: 'draft',
            user: "user"
          }
        ],
        redFlag: [{
          id: 1,
          user_id: 288,
          type: 'red-flag',
          comment: "Hello world",
          status: 'draft',
          user: "user"
        }]
      }]
    };

    mockAxios.get.mockImplementation(() => Promise.resolve({
      data: { ...mockData }
    }));

    const expectedActions = [{
      type: types.ADMIN_RECORDS,
      records: [...mockData.data[0].intervention, ...mockData.data[0].redFlag]
    }];

    const store = mockStore({
      authReducer: {
        user: {
          user: "user"
        }
      }
    });

    return store.dispatch(adminRequest()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});