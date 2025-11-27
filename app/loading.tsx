export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <div className="max-w-md mx-auto pb-6">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-6 rounded-b-3xl shadow-lg">
          <div className="h-8 bg-green-500/50 rounded w-32 mx-auto mb-6 animate-pulse" />
          <div className="h-12 bg-white/20 rounded-xl animate-pulse" />
        </div>

        {/* Region Filter Skeleton */}
        <div className="px-4 mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-20 bg-gray-200 rounded-full animate-pulse shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Count Skeleton */}
        <div className="px-4 mt-4">
          <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Course List Skeleton */}
        <div className="px-4 mt-3 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-1/2 mt-2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
