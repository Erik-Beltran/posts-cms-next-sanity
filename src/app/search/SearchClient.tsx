"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import PostsContainer from "@/components/PostsContainer";
import { PostWithAuthor } from "@/types/sanity";

async function fetchPosts(query: string): Promise<PostWithAuthor[]> {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
}

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchPosts(query),
    enabled: query.length > 1,
  });

  if (isLoading) return <PostCardSkeleton />;
  if (isError) return <p>Error fetching posts</p>;
  if (!isLoading && posts.length === 0 && query !== "") {
    return (
      <p className="flex flex-1 items-center justify-center">
        {`No posts found for "${query}"`}
      </p>
    );
  }

  return <PostsContainer posts={posts} />;
}
