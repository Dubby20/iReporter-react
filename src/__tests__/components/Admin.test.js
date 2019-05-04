import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Admin from '../../components/Admin/Admin';

describe("Admin component", () => {
  const mockStore = configureStore([thunk]);
  let wrapper;
  let records = [{
    id: 1,
    type: 'red-flag',
    status: 'draft',

  }];
  const store = mockStore({
    recordReducer: {
      records,
      isLoading: false,
    },
  });

  it('should render admin page', () => {
    wrapper = mount(
      <Provider store={store}>
        <Admin />
      </Provider>
    );
    expect(wrapper.find('.admin-page').exists()).toBe(true);

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
        <Admin />
      </Provider>
    );
    expect(wrapper.find('.center').exists()).toBe(true);

  });
});