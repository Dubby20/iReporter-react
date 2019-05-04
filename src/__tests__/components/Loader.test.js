import React from 'react';
import { shallow, mount } from 'enzyme';
import Loader from '../../components/Loader/Loader';



describe("Loader component", () => {
  it('should render loader', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.find('.loader').exists()).toBe(true);
  });
});
