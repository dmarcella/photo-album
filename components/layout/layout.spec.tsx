import { screen, render, waitFor } from '@testing-library/react'
import { Layout } from './layout'

describe('Layout Tests', () => {
  it('should display children that are passed into the component', () => {
    render(
      <Layout>
        <div>Hello World</div>
      </Layout>
    )

    const childrenText = screen.getByText('Hello World')

    expect(childrenText).toBeInTheDocument()
  })

  it('should render the title', async () => {
    render(
      <Layout>
        <div>Hello World</div>
      </Layout>
    )

    await waitFor(() => {
      expect(document.title).toEqual('Photo Album')
    })
  })
})
