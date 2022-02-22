import { screen, render } from '@testing-library/react'
import { ErrorMessage } from './error-message'

describe('Error Message Tests', () => {
  it('should display error message', () => {
    render(<ErrorMessage></ErrorMessage>)

    const errorMessage = screen.getByText(
      'There was an issue loading the page.'
    )

    expect(errorMessage).toBeInTheDocument()
  })
})
