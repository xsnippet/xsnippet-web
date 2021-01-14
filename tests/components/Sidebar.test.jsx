import React from 'react'
import { shallow } from 'enzyme'
import { NavLink } from 'react-router-dom'

import Sidebar from '../../src/components/Sidebar'

describe('Sidebar', () => {
  it('should have three items', () => {
    const wrapper = shallow(<Sidebar />)
    const navList = wrapper.find('.sidebar-list')

    expect(navList.children()).toHaveLength(3)
  })

  it('should have correct routes on sidebar items', () => {
    const routes = {
      0: '/',
      1: '/recent',
      2: '/about',
    }
    const wrapper = shallow(<Sidebar />)

    expect(wrapper.find(NavLink).at(0).prop('to')).toEqual(routes['0'])
    expect(wrapper.find(NavLink).at(1).prop('to')).toEqual(routes['1'])
    expect(wrapper.find(NavLink).at(2).prop('to')).toEqual(routes['2'])
  })

  it('should have correct icons on sidebar items', () => {
    const icons = {
      0: 'icon-new',
      1: 'icon-recent',
      2: 'icon-about',
    }
    const wrapper = shallow(<Sidebar />)

    expect(wrapper.find('i').at(0).prop('className')).toEqual(icons['0'])
    expect(wrapper.find('i').at(1).prop('className')).toEqual(icons['1'])
    expect(wrapper.find('i').at(2).prop('className')).toEqual(icons['2'])
  })

  it('should have correct titles on sidebar items', () => {
    const titles = {
      0: 'New Snippet',
      1: 'Recent Snippets',
      2: 'About',
    }
    const wrapper = shallow(<Sidebar />)

    expect(wrapper.find(NavLink).at(0).prop('title')).toEqual(titles['0'])
    expect(wrapper.find(NavLink).at(1).prop('title')).toEqual(titles['1'])
    expect(wrapper.find(NavLink).at(2).prop('title')).toEqual(titles['2'])
  })
})
