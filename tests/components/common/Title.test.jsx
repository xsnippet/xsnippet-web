import React from 'react';
import { shallow } from 'enzyme';

import Title from '../../../src/components/common/Title';

describe('Title', () => {
  it('should return correct title', () => {
    const wrapper = shallow(<Title title="Snippet page" />);
    expect(wrapper.text()).toEqual('Snippet page');
  });

  it('should have additional class if one was provided', () => {
    const wrapper = shallow(<Title additionalClass="custom-title" />);
    expect(wrapper.hasClass('custom-title')).toEqual(true);
  });

  it('should not have additional class if one wasn\'t provided', () => {
    const wrapper = shallow(<Title />);
    expect(wrapper.hasClass('custom-title')).toEqual(false);
  });
});
