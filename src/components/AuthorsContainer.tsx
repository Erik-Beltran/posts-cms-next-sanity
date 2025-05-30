"use client";

import { useQuery } from "@tanstack/react-query";

import AuthorCard from "./AuthorCard";
import AuthorsContainerSkeleton from "./AuthorsContainerSkeleton";

import { Author } from "@/types/sanity";

async function fetchAuthors(): Promise<Author[]> {
  const res = await fetch("/api/authors");
  if (!res.ok) throw new Error("Failed to fetch authors");
  return res.json();
}

export default function AuthorsContainer() {
  const {
    data: authors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
    staleTime: Infinity,
  });

  if (isLoading) return <AuthorsContainerSkeleton />;
  if (isError) return <p className="p-4 text-red-500">Error loading authors</p>;

  return (
    <div className="bg-white rounded-md p-4 flex flex-1 flex-col">
      <h3 className="font-bold text-black mb-4">Search by Author</h3>
      <div>
        {authors.map((author) => (
          <AuthorCard author={author} key={author.slug} isMainContainer />
        ))}
      </div>
    </div>
  );
}
