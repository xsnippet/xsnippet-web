import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import Sidebar from '../../src/components/Sidebar'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Sidebar', () => {
  it('should have three items', () => {
    renderWithRouter(<Sidebar />)
    const navList = screen.getByRole('list')
    
    expect(navList.children).toHaveLength(3)
  })

  it('should have correct routes on sidebar items', () => {
    renderWithRouter(<Sidebar />)
    
    expect(screen.getByTitle('New Snippet')).toHaveAttribute('href', '/')
    expect(screen.getByTitle('Recent Snippets')).toHaveAttribute('href', '/recent')
    expect(screen.getByTitle('About')).toHaveAttribute('href', '/about')
  })

  it('should have correct icons on sidebar items', () => {
    renderWithRouter(<Sidebar />)
    
    expect(screen.getByTitle('New Snippet').querySelector('i')).toHaveClass('icon-new')
    expect(screen.getByTitle('Recent Snippets').querySelector('i')).toHaveClass('icon-recent')
    expect(screen.getByTitle('About').querySelector('i')).toHaveClass('icon-about')
  })

  it('should have correct titles on sidebar items', () => {
    renderWithRouter(<Sidebar />)
    
    expect(screen.getByTitle('New Snippet')).toBeInTheDocument()
    expect(screen.getByTitle('Recent Snippets')).toBeInTheDocument()
    expect(screen.getByTitle('About')).toBeInTheDocument()
  })
})
