import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SingleRecord } from '../../components/SingleRecord/singleRecord';

const mockStore = configureStore([thunk]);
let wrapper;

const props = {
  singleRecordRequest: jest.fn().mockReturnValue(() => { }),
  history: {
    push: jest.fn(),
    location: {
      pathname: '/'
    }
  },
  match: {
    params: {
      id: 1,
      type: "intervevention"
    }
  },
  editComment: jest.fn(),
  deleteRecord: jest.fn(),

  record: {
    id: 1,
    type: 'intervention',
    comment: "This is a comment",
    images: ["https://imgur.com"],
    videos: ["res.cloudinary"],
    location: "6.7868, 7.8993",
    status: 'draft',
    user_id: 87
  },

  user: {
    email: "jac@yahoo.com",
    password: '567dfghj',
    id: 87
  }
};




const store = mockStore({

  notifyReducer: {
    type: '',
    show: false,
    message: ''
  }
});

describe("SingleRecord component", () => {

  it('should render singleRecord page', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SingleRecord {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.record-container').exists()).toBe(true);

  });

  it('should render loader', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SingleRecord {...props} isLoading />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('Loader').exists()).toBe(true);

  });

  it('should handleClick', (done) => {

    const event = {
      target: {
        name: 'comment',
        value: 'Hello world'
      }
    };


    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SingleRecord
            {...props}
          />
        </MemoryRouter>
      </Provider>
    );
    const btn = wrapper.find('.comment-btn');
    btn.simulate('click');
    const comment = wrapper.find('textarea[name="comment"]');
    comment.simulate('change', event);

    expect(wrapper.find('SingleRecord').instance().state.commentInput).toEqual('Hello world');

    setTimeout(() => {
      done();
    }, 2000);
  });

  it('should handle cancel button', (done) => {

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SingleRecord
            {...props}
          />
        </MemoryRouter>
      </Provider>
    );
    const spy = jest.spyOn(wrapper.find('SingleRecord').instance(), 'toggleCommentInput');
    const btn = wrapper.find('.comment-btn');
    btn.simulate('click');

    const cancelButton = wrapper.find('.outline').at(0);
    cancelButton.simulate('click');
    expect(spy).toHaveBeenCalled();

    setTimeout(() => {
      done();
    }, 2000);
  });

  it('should handle save button', (done) => {

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SingleRecord
            {...props}
          />
        </MemoryRouter>
      </Provider>
    );
    const spy = jest.spyOn(wrapper.find('SingleRecord').instance(), 'toggleCommentInput');
    const btn = wrapper.find('.comment-btn');
    btn.simulate('click');

    const cancelButton = wrapper.find('.primary').at(0);
    cancelButton.simulate('click');
    expect(spy).toHaveBeenCalled();

    setTimeout(() => {
      done();
    }, 2000);
  });

  it('should handle delete button', (done) => {

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SingleRecord
            {...props}
          />
        </MemoryRouter>
      </Provider>
    );

    const btn = wrapper.find('.fa-trash');
    btn.simulate('click');

    const deleteButton = wrapper.find('.bg-red').at(0);
    deleteButton.simulate('click');


    setTimeout(() => {
      expect(props.history.push).toBeCalledWith('/intervention');
      done();
    }, 2000);
  });


  it('should handle render image when null', (done) => {
    const props = {
      singleRecordRequest: jest.fn().mockReturnValue(() => { }),
      history: {
        push: jest.fn(),
        location: {
          pathname: '/'
        }
      },
      match: {
        params: {
          id: 1,
          type: "intervevention"
        }
      },

      record: {
        id: 1,
        type: 'intervention',
        comment: "This is a comment",
        images: [],
        videos: ["res.cloudinary"],
        location: "6.7868, 7.8993",
        status: 'draft',
        user_id: 87
      },

      user: {
        email: "jac@yahoo.com",
        password: '567dfghj',
        id: 87
      }
    };

    const store = mockStore({
      notifyReducer: {
        type: '',
        message: '',
        show: true
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SingleRecord
            {...props}
          />
        </MemoryRouter>
      </Provider>
    );


    expect(wrapper.find('.image-list').text()).toEqual('No Image Uploaded');

    setTimeout(() => {
      done();
    }, 2000);
  });


  it('should handle render video when null', (done) => {
    const props = {
      singleRecordRequest: jest.fn().mockReturnValue(() => { }),
      history: {
        push: jest.fn(),
        location: {
          pathname: '/'
        }
      },
      match: {
        params: {
          id: 1,
          type: "intervevention"
        }
      },

      record: {
        id: 1,
        type: 'intervention',
        comment: "This is a comment",
        images: [],
        videos: [],
        location: "6.7868, 7.8993",
        status: 'draft',
        user_id: 87
      },

      user: {
        email: "jac@yahoo.com",
        password: '567dfghj',
        id: 87
      }
    };

    const store = mockStore({
      notifyReducer: {
        type: '',
        message: '',
        show: true
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SingleRecord
            {...props}
          />
        </MemoryRouter>
      </Provider>
    );


    expect(wrapper.find('.video-list').text()).toEqual('No Video Uploaded');

    setTimeout(() => {
      done();
    }, 2000);
  });

});