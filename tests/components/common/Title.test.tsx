import React from 'react'
import { shallow } from 'enzyme'

import Title from '../../../src/components/common/Title'

const title = 'Snippet page';

describe('Title', () => {
  it('should return correct title', () => {
    const wrapper = shallow(<Title title={title} />)
    expect(wrapper.text()).toEqual(title)
  })

  it('should have additional class if one was provided', () => {
    const wrapper = shallow(<Title title={title} additionalClass="custom-title" />)
    expect(wrapper.hasClass('custom-title')).toEqual(true)
  })

  it('should not have additional class if one wasn\'t provided', () => {
    const wrapper = shallow(<Title title={title} />)
    expect(wrapper.hasClass('custom-title')).toEqual(false)
  })
})
