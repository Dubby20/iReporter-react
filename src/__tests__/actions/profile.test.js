import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as types from '../../actions/actionsTypes';
import profileActions from '../../actions/profileActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('handles profileRequest', () => {
  it('handles success case', () => {
    const mockData = {
      data: [{
        interventions: [
          {
            id: 1,
            user_id: 288,
            type: 'intervention',
            comment: "Hello world",
            status: 'draft',
            user: "user"
          }
        ],
        redFlags: [{
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
      type: types.PROFILE_HISTORY,
      records: [...mockData.data[0].interventions, ...mockData.data[0].redFlags],
      interventionDrafts: 1,
      interventionRejected: 0,
      interventionResolved: 0,
      interventionUnderInvestigation: 0,
      redFlagDrafts: 1,
      redFlagRejected: 0,
      redFlagResolved: 0,
      redFlagUnderInvestigation: 0,
    }];

    const store = mockStore({
      authReducer: {
        user: {
          user: "user"
        }
      }
    });

    return store.dispatch(profileActions()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});