import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Login } from '../../components/Login/login';


describe("Login component", () => {
  const mockStore = configureMockStore([thunk]);
  let wrapper;

  const props = {
    loginRequest: jest.fn().mockReturnValue(() => { }),
    history: {
      push: jest.fn(),
      location: {
        pathname: '/'
      }
    },
    user: {
      email: "jac@yahoo.com",
      password: '567dfghj'
    },
    type: '',
    show: false,
    message: ''
  };

  const store = mockStore({
    notifyReducer: {
      type: '',
      show: false,
      message: ''
    }
  });

  it('should render login page', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login history={props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.login-container').exists()).toBe(true);

  });


  it('should handle submit', (done) => {

    const event = {
      target: {
        name: 'email',
        value: 'jac@yahoo.com'
      }
    };

    const passwordEvent = {
      target: {
        name: 'password',
        value: 'password'
      }
    };


    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login {...props}
          />
        </MemoryRouter>
      </Provider>
    );

    const email = wrapper.find('input[name="email"]');
    email.simulate('change', event);
    expect(wrapper.find('input[name="email"]').prop('value')).toEqual('jac@yahoo.com');


    const password = wrapper.find('input[name="password"]');
    password.simulate('change', passwordEvent);
    expect(wrapper.find('input[name="password"]').prop('value')).toEqual('password');

    const form = wrapper.find('.auth-btn');

    form.simulate('submit');
    setTimeout(() => {
      expect(props.history.push).toBeCalledWith('/');
      done();
    }, 2000);
  });

  it('should redirect to admin page', (done) => {

    const event = {
      target: {
        name: 'email',
        value: 'jac@yahoo.com'
      }
    };

    const passwordEvent = {
      target: {
        name: 'password',
        value: 'password'
      }
    };


    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login {...{ ...props, user: { ...props.user, isAdmin: true } }}
          />
        </MemoryRouter>
      </Provider>
    );

    const email = wrapper.find('input[name="email"]');
    email.simulate('change', event);
    expect(wrapper.find('input[name="email"]').prop('value')).toEqual('jac@yahoo.com');


    const password = wrapper.find('input[name="password"]');
    password.simulate('change', passwordEvent);
    expect(wrapper.find('input[name="password"]').prop('value')).toEqual('password');

    const form = wrapper.find('.auth-btn');

    form.simulate('submit');

    setTimeout(() => {
      expect(props.history.push).toBeCalledWith('/admin');
      done();
    }, 2000);
  });

  it('should render error message', (done) => {

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login {...props}
          />
        </MemoryRouter>
      </Provider>
    );

    const form = wrapper.find('.auth-btn');

    form.simulate('submit');

    setTimeout(() => {
      wrapper.find('Login').instance().forceUpdate();

      expect(props.history.push.mock.calls.length).toBe(0);

      done();
    }, 2000);
  });

  it('should render loader', () => {
    const store = mockStore({
      recordReducer: {
        isLoading: true
      },
      notifyReducer: {
        type: '',
        show: false,
        message: ''
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login {...props} isLoading />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('Loader').exists()).toBe(true);

  });
});