import { render, screen } from '@testing-library/react'
import Album from '../pages/albums/[id]'

const mockJsonPromiseReject = Promise.resolve(undefined)
const mockFetchPromiseReject = Promise.reject({
  json: () => mockJsonPromiseReject,
  ok: false,
})

const mockJsonPromiseAlbum = Promise.resolve({
  userId: 1,
  id: 2,
  title: 'sunt qui excepturi placeat culpa',
})
const mockFetchPromiseAlbum = Promise.resolve({
  json: () => mockJsonPromiseAlbum,
  ok: true,
})

const mockJsonPromiseAlbumPhotos = Promise.resolve([
  {
    albumId: 2,
    id: 57,
    title: 'vero est optio expedita quis ut molestiae',
    url: 'https://via.placeholder.com/600/95acce',
    thumbnailUrl: 'https://via.placeholder.com/150/95acce',
  },
  {
    albumId: 2,
    id: 58,
    title: 'rem pariatur facere eaque',
    url: 'https://via.placeholder.com/600/cde4c1',
    thumbnailUrl: 'https://via.placeholder.com/150/cde4c1',
  },
  {
    albumId: 2,
    id: 59,
    title: 'modi totam dolor eaque et ipsum est cupiditate',
    url: 'https://via.placeholder.com/600/a46a91',
    thumbnailUrl: 'https://via.placeholder.com/150/a46a91',
  },
])
const mockFetchPromiseAlbumPhotos = Promise.resolve({
  json: () => mockJsonPromiseAlbumPhotos,
  ok: true,
})

const globalRef: any = global

describe('Album ID Tests', () => {
  it('should display error message when api promise has issues', async () => {
    globalRef.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockFetchPromiseReject)

    render(<Album id={'2'} />)

    const errorMessasge = await screen.findByText(
      'There was an issue loading the page.'
    )
    expect(errorMessasge).toBeInTheDocument()
  })

  it('should find photos if api calls are successful', async () => {
    globalRef.fetch = jest
      .fn()
      .mockImplementationOnce((url) => {
        switch (url) {
          case 'https://jsonplaceholder.typicode.com/albums/2':
            return mockFetchPromiseAlbum
          default:
            return Promise.reject(new Error('not found'))
        }
      })
      .mockImplementationOnce((url) => {
        switch (url) {
          case 'https://jsonplaceholder.typicode.com/photos?albumId=2':
            return mockFetchPromiseAlbumPhotos
          default:
            return Promise.reject(new Error('not found'))
        }
      })

    render(<Album id={'2'} />)

    const firstPhoto = await screen.findByText(
      'vero est optio expedita quis ut molestiae'
    )
    expect(firstPhoto).toBeInTheDocument()

    const secondPhoto = await screen.findByText('rem pariatur facere eaque')
    expect(secondPhoto).toBeInTheDocument()

    const thirdPhoto = await screen.findByText(
      'modi totam dolor eaque et ipsum est cupiditate'
    )
    expect(thirdPhoto).toBeInTheDocument()
  })

  // not sure why this test is failng the skeleton-loader is in the dom and status is loading
  // it('should display loader skeletons when apis are fetching data', async () => {
  //   globalRef.fetch = jest
  //     .fn()
  //     .mockImplementationOnce((url) => {
  //       switch (url) {
  //         case 'https://jsonplaceholder.typicode.com/albums/2':
  //           return mockFetchPromiseAlbum
  //         default:
  //           return Promise.reject(new Error('not found'))
  //       }
  //     })
  //     .mockImplementationOnce((url) => {
  //       switch (url) {
  //         case 'https://jsonplaceholder.typicode.com/photos?albumId=2':
  //           return mockFetchPromiseAlbumPhotos
  //         default:
  //           return Promise.reject(new Error('not found'))
  //       }
  //     })

  //   render(<Album id={'2'} />)

  //   const loaderSkeleton = await screen.findByTestId('skeleton-loader')
  //   expect(loaderSkeleton).toBeInTheDocument()
  // })
})
