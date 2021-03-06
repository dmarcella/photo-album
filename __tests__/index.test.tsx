import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders text', () => {
    render(<Home />)

    const homeText = screen.getByText('Home')

    expect(homeText).toBeInTheDocument()
  })
})
