"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import PageLayout from "@/components/PageLayout";
import PostCard from "@/components/PostCard";
import PostCardSkeleton from "@/components/PostCardSkeleton/PostCardSkeleton";

import { PostWithAuthor } from "@/types/sanity";
 
async function fetchPosts(query: string): Promise<PostWithAuthor[]> {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
}

export default function SearchPage() {

  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";

    const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchPosts(query),
    enabled: query.length > 1,
 
  });


  return (
    <PageLayout title={"Search"}>
       {isLoading && <PostCardSkeleton/>}
      {isError && <p>Error fetching posts</p>}
      {!isLoading && !isError && posts.length === 0 && query!=="" &&
      <p className="flex flex-1 items-center justify-center">
        {`No posts found for "${query}"`}
      </p>}

       <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8  overflow-y-auto">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} showAuthor />
          ))}
        </ul>
     </PageLayout>
  );
}
