function PostCardSkeleton() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2  gap-6 md:gap-8  overflow-y-auto mb-4 w-full mt-10">
      {Array.from({ length: 4 }).map((_, id) => (
        <li key={id} className="shadow-sm rounded-md bg-gray-200">
          <div className="w-full h-[200px] bg-gray-300 mb-3 rounded-t-md" />
          <div className="p-4">
            <div className="h-5 bg-gray-300 mb-3 animate-pulse" />
            <div className="h-14 bg-gray-300 mb-3 animate-pulse" />
            <div className="h-8 w-8 rounded-full bg-gray-300 mb-3 float-right animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostCardSkeleton;
