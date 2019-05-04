import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RedFlag from '../../components/RedFlag/RedFlag';

describe("RedFlag component", () => {
  const mockStore = configureStore([thunk]);
  let wrapper;
  let records = [{
    id: 1,
    type: 'red-flag',
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

  it('should render red-flag page', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RedFlag />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.redflag-container').exists()).toBe(true);

  });

});