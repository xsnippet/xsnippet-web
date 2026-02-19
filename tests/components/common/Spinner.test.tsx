import React from 'react'
import { render, screen } from '@testing-library/react'

import Spinner from '../../../src/components/common/Spinner'

describe('Spinner', () => {
  it('should render loading indicator', () => {
    render(<Spinner />)
    expect(screen.getByAltText('Loading...')).toBeInTheDocument()
  })
})
