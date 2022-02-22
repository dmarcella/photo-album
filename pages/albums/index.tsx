import { useEffect, useState } from 'react'
import groupBy from 'lodash.groupby'
import type { NextPage } from 'next'
import { IPhoto } from '../../types/photo'
import { IStatus } from '../../types/status'
import { ErrorMessage } from '../../components/error-message/error-message'
import { AlbumCard } from '../../components/album-card/album-card'
import { PhotoSkeleton } from '../../components/photo-skeleton/photo-skeleton'

export const Albums: NextPage = () => {
  const [picturesGroupedByAlbum, setPicturesGroupedByAlbum] = useState<
    Record<number, IPhoto[]>
  >({})
  const [status, setStatus] = useState<IStatus>('loading')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((photos: IPhoto[]) => {
        setStatus('success')
        setPicturesGroupedByAlbum(groupBy(photos, 'albumId'))
      })
      .catch(() => {
        setStatus('error')
      })
  }, [])

  return (
    <>
      {status === 'error' && <ErrorMessage></ErrorMessage>}
      {status === 'loading' && (
        <div
          data-testid="skeleton-loader"
          className="space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-5"
        >
          {[...Array(10).keys()].map((_, index) => {
            return <PhotoSkeleton key={index}></PhotoSkeleton>
          })}
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-5">
          {Object.values(picturesGroupedByAlbum).map((albums, index) => {
            return (
              <AlbumCard
                key={index}
                numberOfPhotosInAlbum={albums.length}
                randomAlbumPhoto={albums[0]}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Albums
