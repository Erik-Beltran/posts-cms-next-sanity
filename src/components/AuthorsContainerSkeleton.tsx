const AuthorsContainerSkeleton = () => {
  return (
    <div className="flex gap-2 flex-1 flex-col p-4 rounded-md">
      <p className="h-5 bg-gray-300" />
      {Array.from({ length: 3 }).map((_, id) => (
        <div className="flex justify-between items-center" key={id}>
          <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse" />
          <div className="h-5 w-[80%] animate-pulse bg-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default AuthorsContainerSkeleton;
