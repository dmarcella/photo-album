import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ErrorMessage } from '../../../components/error-message/error-message'
import { PhotoSkeleton } from '../../../components/photo-skeleton/photo-skeleton'
import { IAlbum } from '../../../types/album'
import { IPhoto } from '../../../types/photo'
import { IStatus } from '../../../types/status'

export const Album = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [status, setStatus] = useState<IStatus>('loading')
  const [album, setAlbum] = useState<IAlbum>({
    title: null,
    id: null,
    userId: null,
  })

  useEffect(() => {
    setStatus('loading')

    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then((album: IAlbum) => {
        setAlbum(album)
        return fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
        )
          .then((resp) => {
            if (resp.ok) {
              return resp.json()
            } else {
              throw new Error('Something went wrong')
            }
          })
          .then((photos: IPhoto[]) => {
            setPhotos(photos)
            setStatus('success')
          })
      })
      .catch(() => {
        setStatus('error')
      })
  }, [id])

  return (
    <>
      {status === 'error' && <ErrorMessage></ErrorMessage>}
      {status === 'loading' && (
        <>
          <div className="p-3 bg-white">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div
            data-testid="skeleton-loader"
            className="space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-5"
          >
            {[...Array(10).keys()].map((_, index) => {
              return <PhotoSkeleton key={index}></PhotoSkeleton>
            })}
          </div>
        </>
      )}

      {status === 'success' && (
        <>
          <h1 className="text-4xl">{album.title}</h1>

          <div className="space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-5">
            {photos.map((photo) => {
              return (
                <div
                  className="rounded overflow-hidden shadow-lg hover:opacity-75 hover:bg-slate-300"
                  key={photo.id}
                >
                  <Image
                    className="w-full"
                    src={photo.url}
                    alt={photo.title}
                    width={600}
                    height={600}
                  />
                  <div className="flex justify-between px-6 py-4">
                    <div className="font-bold text-xl">{photo.title}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default Album

export const getServerSideProps: GetServerSideProps<{
  id: string | string[] | undefined
}> = async (context) => {
  return { props: { id: context?.params?.id } }
}
