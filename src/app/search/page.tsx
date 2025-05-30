"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import PageLayout from "@/components/PageLayout";
import PostCardSkeleton from "@/components/PostCardSkeleton";

import { PostWithAuthor } from "@/types/sanity";
import PostsContainer from "@/components/PostsContainer";

async function fetchPosts(query: string): Promise<PostWithAuthor[]> {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
}

export default function SearchPage() {
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

  return (
    <PageLayout title={"Search"}>
      {isLoading && <PostCardSkeleton />}
      {isError && <p>Error fetching posts</p>}
      {!isLoading && !isError && posts.length === 0 && query !== "" && (
        <p className="flex flex-1 items-center justify-center">
          {`No posts found for "${query}"`}
        </p>
      )}
      <PostsContainer posts={posts} />
    </PageLayout>
  );
}
