import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Report } from '../../components/Report/Report';


describe("Report component", () => {
  const mockStore = configureStore([thunk]);
  let wrapper;
  const props = {
    postReport: jest.fn().mockReturnValue(() => { }),
    history: {
      push: jest.fn(),
      location: {
        pathname: '/'
      }
    },
    report: {
      comment: "This is a comment",
      reportType: "red-flag",
      location: "6.5538545, 3.366384199999",
      images: [],
      videos: []

    },
  };

  const store = mockStore({
    notifyReducer: {
      type: '',
      show: false,
      message: ''
    }
  });

  it('should render report page', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Report {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.page-border').exists()).toBe(true);

  });

  // it('should handle submit', (done) => {

  //   const commentEvent = {
  //     target: {
  //       name: 'comment',
  //       value: 'This is a comment'
  //     }
  //   };

  //   const reportTypeEvent = {
  //     target: {
  //       name: 'reportType',
  //       value: 'red-flag'
  //     }
  //   };

  //   const locationEvent = {
  //     target: {
  //       name: '6.5538545, 3.36638419999',
  //       value: 'Dubem'
  //     }
  //   };

  //   const imagesEvent = ["https://imgur.jpg"];


  //   const videosEvent = ["https://imgu.mp4"];




  //   wrapper = mount(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Report {...props}
  //         />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const comment = wrapper.find('textarea[name="comment"]');
  //   comment.simulate('change', commentEvent);
  //   expect(wrapper.find('textarea[name="comment"]').prop('value')).toEqual('This is a comment');
  //   console.log(wrapper.debug());
  //   const reportType = wrapper.find('input[name="reportType"]');
  //   // reportType.simulate('change', reportTypeEvent);
  //   // expect(wrapper.find('input[name="reportType"]').props()).value('red-flag');
  //   // wrapper.find('select').simulate('change', { target { value: 'hello' }});


  //   const location = wrapper.find('input[name="location"]');
  //   location.simulate('change', locationEvent);
  //   expect(wrapper.find('input[name="location"]').prop('value')).toEqual('');

  //   const images = wrapper.find('input[name="images"]');
  //   images.simulate('change', imagesEvent);
  //   expect(wrapper.find('input[name="images"]').prop('value')).toEqual("https://imgur.jpg");

  //   const videos = wrapper.find('input[name="videos"]');
  //   videos.simulate('change', videosEvent);
  //   expect(wrapper.find('input[name="videos"]').prop('value')).toEqual("https://imgu.mp4");


  //   const form = wrapper.find('.send-btn');

  //   form.simulate('submit');
  //   setTimeout(() => {
  //     done();
  //   }, 2000);
  // });

  it('should render error message', (done) => {

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Report {...props}
          />
        </MemoryRouter>
      </Provider>
    );

    const form = wrapper.find('.send-btn');

    form.simulate('submit');

    setTimeout(() => {
      wrapper.find('Report').instance().forceUpdate();

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
          <Report {...props} isLoading />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('Loader').exists()).toBe(true);

  });

});