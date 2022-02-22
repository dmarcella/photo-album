import { screen, render } from '@testing-library/react'
import { AlbumCard } from './album-card'

const photo = {
  albumId: 13,
  id: 45,
  title: 'Happy New Year!',
  url: 'https://via.placeholder.com/133/771784',
  thumbnailUrl: 'https://via.placeholder.com/13/771784',
}

describe('Album Card Tests', () => {
  it('should display number of photos an album has', () => {
    render(
      <AlbumCard
        numberOfPhotosInAlbum={11}
        randomAlbumPhoto={photo}
      ></AlbumCard>
    )

    const numberOfPhotos = screen.getByText('(11)')

    expect(numberOfPhotos).toBeInTheDocument()
  })

  it('should display the albums id in the card', () => {
    render(
      <AlbumCard
        numberOfPhotosInAlbum={11}
        randomAlbumPhoto={photo}
      ></AlbumCard>
    )

    const cardTitle = screen.getByText('Photo Album 13')

    expect(cardTitle).toBeInTheDocument()
  })

  it('should have an image', () => {
    render(
      <AlbumCard
        numberOfPhotosInAlbum={11}
        randomAlbumPhoto={photo}
      ></AlbumCard>
    )

    const image = screen.getByRole('img')

    expect(image).toBeInTheDocument()
  })
})
