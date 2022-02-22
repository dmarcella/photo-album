import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 mb-4">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/albums">
          <a>
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
              Photo Album
            </span>
          </a>
        </Link>
      </div>
    </nav>
  )
}
