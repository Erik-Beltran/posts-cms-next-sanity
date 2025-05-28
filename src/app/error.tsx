"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error", error);
  }, [error]);

  return (
    <div className="text-center flex justify-center items-center flex-col h-full gap-y-2">
      <h2 className="text-black font-bold">
        Something went wrong while loading the posts.
      </h2>
      <p>{error.message}</p>
      <button
        onClick={reset}
        className="rounded-md bg-black text-white p-2 cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
