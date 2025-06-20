import React from 'react'
import { render } from '@testing-library/react'

import Title from '../../../src/components/common/Title'

const title = 'Snippet page';

describe('Title', () => {
  it('should return correct title', () => {
    const { container } = render(<Title title={title} />)
    expect(container.textContent).toEqual(title)
  })

  it('should have additional class if one was provided', () => {
    const { container } = render(<Title title={title} additionalClass="custom-title" />)
    const titleElement = container.querySelector('.title')
    
    expect(titleElement).toHaveClass('custom-title')
  })

  it('should not have additional class if one wasn\'t provided', () => {
    const { container } = render(<Title title={title} />)
    const titleElement = container.querySelector('.title')
    
    expect(titleElement).not.toHaveClass('custom-title')
  })

  it('should have default title class', () => {
    const { container } = render(<Title title={title} />)
    const titleElement = container.querySelector('.title')
    
    expect(titleElement).toHaveClass('title')
  })
})
