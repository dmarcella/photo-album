import Image from 'next/image'
import Link from 'next/link'
import { IPhoto } from '../../types/photo'

export const AlbumCard = ({
  numberOfPhotosInAlbum,
  randomAlbumPhoto,
}: {
  numberOfPhotosInAlbum: number
  randomAlbumPhoto: IPhoto
}) => {
  return (
    <Link href={`albums/${randomAlbumPhoto.albumId}`}>
      <a>
        <div className="rounded overflow-hidden shadow-lg hover:opacity-75 hover:bg-slate-300">
          <Image
            className="w-full"
            src={randomAlbumPhoto.thumbnailUrl}
            alt={randomAlbumPhoto.title}
            width={400}
            height={400}
          />
          <div className="flex justify-between px-6 py-4">
            <div className="font-bold text-xl">
              Photo Album {randomAlbumPhoto.albumId}
            </div>
            <div className="italic">({numberOfPhotosInAlbum})</div>
          </div>
        </div>
      </a>
    </Link>
  )
}
