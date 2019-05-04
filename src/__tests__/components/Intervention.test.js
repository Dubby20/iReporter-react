import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Intervention from '../../components/Intervention/Intervention';

describe("Intervention component", () => {
  const mockStore = configureStore([thunk]);
  let wrapper;
  let records = [{
    id: 1,
    type: 'intervention',
    comment: "This is a comment",
    images: "https://imgur.com",
    videos: "res.cloudinary",
    location: "6.7868, 7.8993",
    status: 'draft',

  }];
  const store = mockStore({
    recordReducer: {
      records
    },
  });

  it('should render intervention page', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Intervention />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.intervention-container').exists()).toBe(true);

  });

});