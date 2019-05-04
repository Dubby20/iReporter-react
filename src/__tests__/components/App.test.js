import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<App />);
});

describe('App Component', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});