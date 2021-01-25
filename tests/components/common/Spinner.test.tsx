import React from 'react'
import { shallow } from 'enzyme'

import Spinner from '../../../src/components/common/Spinner'

describe('Spinner', () => {
  it('should have one child', () => {
    const wrapper = shallow(<Spinner />)
    expect(wrapper.children()).toHaveLength(1)
  })
})
