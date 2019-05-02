import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home/home';



describe("Home component", () => {
  it('should render home page', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('.home-container').exists()).toBe(true);
  });
});