"use client";

import PageLayout from "@/components/PageLayout";
import PostCard from "@/components/PostCard";
import PostCardSkeleton from "@/components/PostCardSkeleton/PostCardSkeleton";
import { POSTS_PER_PAGE, usePaginatedPosts } from "@/hooks/usePaginatedPosts";
import { PostWithAuthor } from "@/types/sanity";
import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePaginatedPosts(page);

  if (isLoading) return <PostCardSkeleton />;
  if (isError || !data) return <p>Error fetching posts</p>;

  const { total, posts } = data;

  const totalPages = Math.ceil(data.total / POSTS_PER_PAGE);

  return (
    <PageLayout title="">
      <section>
        <h2 className="text-4xl font-bold text-black mb-4 rounded-md bg-white p-4">
          Latest Posts
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8  overflow-y-auto mb-4">
          {posts.map((post: PostWithAuthor) => (
            <PostCard post={post} key={post._id} showAuthor />
          ))}
        </ul>
      </section>
      <ReactPaginate
        pageCount={totalPages}
        forcePage={page - 1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        containerClassName="flex items-center justify-center gap-x-4 rounded-md bg-white p-4 my-4"
        pageClassName="text-black hover:text-blue-600 bg-gray-50 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
        previousClassName="text-black hover:text-blue-600 bg-gray-50 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
        nextClassName="text-black hover:text-blue-600 bg-gray-50 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
        activeClassName="text-blue-500 bg-sky-100 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer"
        nextLabel=">"
        previousLabel="<"
      />
    </PageLayout>
  );
}
