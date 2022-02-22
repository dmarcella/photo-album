export const PhotoSkeleton = () => {
  return (
    <div className="container mx-auto">
      <div className="max-w-sm mx-auto md:max-w-lg">
        <div className="w-full">
          <div className="bg-white rounded">
            <div className="bg-gray-200 h-48 p-3 overflow-hidden animate-pulse"></div>
            <div className="p-3">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
