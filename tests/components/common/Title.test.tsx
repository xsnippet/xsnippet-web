import React from 'react'
import { render, screen } from '@testing-library/react'

import Title from '../../../src/components/common/Title'

const title = 'Snippet page';

describe('Title', () => {
  it('should return correct title', () => {
    render(<Title title={title} />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('should have additional class if one was provided', () => {
    render(<Title title={title} additionalClass="custom-title" />)
    expect(screen.getByText(title)).toHaveClass('custom-title')
  })

  it('should not have additional class if one wasn\'t provided', () => {
    render(<Title title={title} />)
    expect(screen.getByText(title)).not.toHaveClass('custom-title')
  })
})
