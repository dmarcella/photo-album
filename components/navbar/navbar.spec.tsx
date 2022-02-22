import { screen, render } from '@testing-library/react'
import { Navbar } from './navbar'

describe('Navbar Tests', () => {
  it('should display "photo album" text/link in header', () => {
    render(<Navbar></Navbar>)

    const homeLink = screen.getByRole('link', { name: 'Photo Album' })

    expect(homeLink).toBeInTheDocument()
  })
})
