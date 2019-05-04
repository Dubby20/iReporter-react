import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../containers/404Page/NotFound';



describe("NotFound component", () => {
  it('should render not found page', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper.find('.notfound-container').exists()).toBe(true);
  });
});