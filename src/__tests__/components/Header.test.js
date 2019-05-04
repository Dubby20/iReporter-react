import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header/Header';



describe("Header component", () => {
  it('should render header', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('.header-container').exists()).toBe(true);
  });
});