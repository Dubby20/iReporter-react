import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer/Footer';



describe("Footer component", () => {
  it('should render footer', () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper.find('.footer-container').exists()).toBe(true);
  });
});