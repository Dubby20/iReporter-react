import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Profile from '../../components/Profile/Profile';

describe("Profile component", () => {
  const mockStore = configureStore([thunk]);
  let wrapper;
  let records = [{
    id: 1,
    type: 'red-flag',
    comment: "Hello world",
    status: 'draft',

  }];
  const store = mockStore({
    recordReducer: {
      records,
      isLoading: false,
    },
  });

  it('should render profile page', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.profile-container').exists()).toBe(true);

  });

  it('should render loader', () => {
    const store = mockStore({
      recordReducer: {
        records,
        isLoading: true
      },
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.center').exists()).toBe(true);

  });
});