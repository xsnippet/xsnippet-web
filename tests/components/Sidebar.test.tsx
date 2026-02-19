import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Sidebar from '../../src/components/Sidebar'

describe('Sidebar', () => {
  it('should have three items', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })

  it('should have correct routes on sidebar items', () => {
    const routes = {
      0: '/',
      1: '/recent',
      2: '/about',
    }

    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
      </MemoryRouter>,
    )
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', routes['0'])
    expect(links[1]).toHaveAttribute('href', routes['1'])
    expect(links[2]).toHaveAttribute('href', routes['2'])
  })

  it('should have correct icons on sidebar items', () => {
    const icons = {
      0: 'icon-new',
      1: 'icon-recent',
      2: 'icon-about',
    }

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    )
    const iconEls = document.querySelectorAll('i')
    expect(iconEls[0]).toHaveClass(icons['0'])
    expect(iconEls[1]).toHaveClass(icons['1'])
    expect(iconEls[2]).toHaveClass(icons['2'])
  })

  it('should have correct titles on sidebar items', () => {
    const titles = {
      0: 'New Snippet',
      1: 'Recent Snippets',
      2: 'About',
    }

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    )
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('title', titles['0'])
    expect(links[1]).toHaveAttribute('title', titles['1'])
    expect(links[2]).toHaveAttribute('title', titles['2'])
  })
})
