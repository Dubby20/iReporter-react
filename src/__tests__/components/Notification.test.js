import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Notification from '../../components/Notification/Notification';


describe("Notification component", () => {
  const mockStore = configureStore([thunk]);
  let wrapper;

  const store = mockStore({
    notifyReducer: {
      type: '',
      message: '',
      show: true
    }
  });

  it('should render login page', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Notification />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.notification').exists()).toBe(true);

  });
});