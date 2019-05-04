import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as types from '../../actions/actionsTypes';
import * as actions from '../../actions/singleRecordActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('handles singleRecordRequest', () => {
  it('handles success case', () => {
    const mockData = {
      report: {
        type: 'intervention',
        comment: "This is a comment",
        images: ["https://imgur.com"],
        videos: ["res.cloudinary"],
        location: "6.7868, 7.8993",
        status: 'draft',
      }
    };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve({
      data: mockData
    }));

    const expectedActions = {
      type: types.START_FETCHING,
      report: mockData.recordList
    };

    const store = mockStore({});

    return store.dispatch(actions.singleRecordRequest("id", "type")).then(() => {
      expect(store.getActions()).toEqual([expectedActions]);
    });
  });


});
