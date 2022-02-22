import { render, screen } from '@testing-library/react'
import Albums from '../pages/albums'

const mockJsonPromise = Promise.resolve([
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796',
  },
  {
    albumId: 2,
    id: 54,
    title: 'ut ex quibusdam dolore mollitia',
    url: 'https://via.placeholder.com/600/aa8f2e',
    thumbnailUrl: 'https://via.placeholder.com/150/aa8f2e',
  },
  {
    albumId: 2,
    id: 55,
    title: 'voluptatem consequatur totam qui aut iure est vel',
    url: 'https://via.placeholder.com/600/5e04a4',
    thumbnailUrl: 'https://via.placeholder.com/150/5e04a4',
  },
  {
    albumId: 2,
    id: 56,
    title: 'vel voluptatem esse consequuntur est officia quo aut quisquam',
    url: 'https://via.placeholder.com/600/f9f067',
    thumbnailUrl: 'https://via.placeholder.com/150/f9f067',
  },
])
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
  ok: true,
})
const globalRef: any = global

describe('Albums Tests', () => {
  it('should find both mocked grouped albums', async () => {
    globalRef.fetch = jest.fn().mockImplementationOnce(() => mockFetchPromise)

    render(<Albums />)

    const albumWithThreePhotos = await screen.findByText('(3)')
    expect(albumWithThreePhotos).toBeInTheDocument()

    const albumWithTwoPhotos = await screen.findByText('(2)')
    expect(albumWithTwoPhotos).toBeInTheDocument()
  })

  // it('should display loader skeletons when apis are fetching data', async () => {
  //   globalRef.fetch = jest.fn().mockImplementationOnce(() => mockFetchPromise)

  //   render(<Albums />)

  //   const loaderSkeleton = screen.getByTestId('skeleton-loader')
  //   expect(loaderSkeleton).toBeInTheDocument()
  // })
})
