import React from 'react'
import { render } from '@testing-library/react'

import Spinner from '../../../src/components/common/Spinner'

// Mock the SVG import to prevent test failures
jest.mock('../../../src/assets/icons/ripple.svg', () => ({
  __esModule: true,
  default: 'mocked-svg-path',
}))

describe('Spinner', () => {
  it('should have spinner wrapper with correct class', () => {
    const { container } = render(<Spinner />)
    const spinnerWrapper = container.querySelector('.spinner')
    
    expect(spinnerWrapper).toBeInTheDocument()
    expect(spinnerWrapper).toHaveClass('spinner')
  })

  it('should contain an img element', () => {
    const { container } = render(<Spinner />)
    const img = container.querySelector('img')
    
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('alt', 'Loading...')
  })
})
