import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Signup } from '../../components/SignUp/Signup';


describe("Signup component", () => {
  const mockStore = configureStore([thunk]);
  let wrapper;
  const props = {
    registerRequest: jest.fn().mockReturnValue(() => { }),
    history: {
      push: jest.fn(),
      location: {
        pathname: '/'
      }
    },
    user: {
      fistname: "Jacy",
      lastname: "Alexa",
      othernames: "Dubem",
      username: "Dubby",
      phoneNumber: "08076543453",
      email: "jac@yahoo.com",
      password: '567dfghj',
      confirmPassword: "567dfghj"

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

  it('should render signup page', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Signup {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.signup-container').exists()).toBe(true);

  });

  it('should handle submit', (done) => {

    const firstnameEvent = {
      target: {
        name: 'firstname',
        value: 'Jacy'
      }
    };

    const lastnameEvent = {
      target: {
        name: 'lastname',
        value: 'Alexa'
      }
    };

    const othernamesEvent = {
      target: {
        name: 'othernames',
        value: 'Dubem'
      }
    };

    const usernameEvent = {
      target: {
        name: 'username',
        value: 'Dubby'
      }
    };

    const phoneNumberEvent = {
      target: {
        name: 'phoneNumber',
        value: '08076543453'
      }
    };

    const emailEvent = {
      target: {
        name: 'email',
        value: 'jac@yahoo.com'
      }
    };

    const passwordEvent = {
      target: {
        name: 'password',
        value: '567dfghj'
      }
    };

    const confirmPasswordEvent = {
      target: {
        name: 'confirmPassword',
        value: '567dfghj'
      }
    };


    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Signup {...props}
          />
        </MemoryRouter>
      </Provider>
    );

    const firstname = wrapper.find('input[name="firstname"]');
    firstname.simulate('change', firstnameEvent);
    expect(wrapper.find('input[name="firstname"]').prop('value')).toEqual('Jacy');

    const lastname = wrapper.find('input[name="lastname"]');
    lastname.simulate('change', lastnameEvent);
    expect(wrapper.find('input[name="lastname"]').prop('value')).toEqual('Alexa');

    const othernames = wrapper.find('input[name="othernames"]');
    othernames.simulate('change', othernamesEvent);
    expect(wrapper.find('input[name="othernames"]').prop('value')).toEqual('Dubem');

    const username = wrapper.find('input[name="username"]');
    username.simulate('change', usernameEvent);
    expect(wrapper.find('input[name="username"]').prop('value')).toEqual('Dubby');

    const phoneNumber = wrapper.find('input[name="phoneNumber"]');
    phoneNumber.simulate('change', phoneNumberEvent);
    expect(wrapper.find('input[name="phoneNumber"]').prop('value')).toEqual('08076543453');

    const email = wrapper.find('input[name="email"]');
    email.simulate('change', emailEvent);
    expect(wrapper.find('input[name="email"]').prop('value')).toEqual('jac@yahoo.com');


    const password = wrapper.find('input[name="password"]');
    password.simulate('change', passwordEvent);
    expect(wrapper.find('input[name="password"]').prop('value')).toEqual('567dfghj');

    const confirmPassword = wrapper.find('input[name="confirmPassword"]');
    confirmPassword.simulate('change', confirmPasswordEvent);
    expect(wrapper.find('input[name="confirmPassword"]').prop('value')).toEqual('567dfghj');

    const form = wrapper.find('.auth-btn');

    form.simulate('submit');
    setTimeout(() => {
      expect(props.history.push).toBeCalledWith('/');
      done();
    }, 2000);
  });

  it('should render error message', (done) => {

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Signup {...props}
          />
        </MemoryRouter>
      </Provider>
    );

    const form = wrapper.find('.auth-btn');

    form.simulate('submit');

    setTimeout(() => {
      wrapper.find('Signup').instance().forceUpdate();

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
          <Signup {...props} isLoading />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('Loader').exists()).toBe(true);

  });

});