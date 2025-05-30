"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import PostsContainer from "./PostsContainer";
import PostCardSkeleton from "./PostCardSkeleton/PostCardSkeleton";

import { POSTS_PER_PAGE, usePaginatedPosts } from "@/hooks/usePaginatedPosts";

const PaginatedPosts = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePaginatedPosts(page);

  if (isLoading) return <PostCardSkeleton />;
  if (isError || !data) return <p>Error fetching posts</p>;

  const { total, posts } = data;

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  return (
    <section>
      <PostsContainer posts={posts} />
      <ReactPaginate
        pageCount={totalPages}
        forcePage={page - 1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        containerClassName="flex items-center justify-center gap-x-4 rounded-md p-3 mt-4 bg-white"
        pageClassName="text-black hover:text-blue-600 bg-gray-50 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
        previousClassName="text-black hover:text-blue-600 bg-gray-50 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
        nextClassName="text-black hover:text-blue-600 bg-gray-50 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
        activeClassName="text-blue-500 bg-sky-100 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer"
        nextLabel=">"
        previousLabel="<"
      />
    </section>
    // <PageLayout title="">
    //   <section className="bg-red-400">
    //     <h2 className="text-4xl font-bold text-black mb-4 rounded-md bg-white p-4">
    //       Latest Posts
    //     </h2>
    //     <div className="flex">
    //       <PostsContainer posts={posts} />
    //     </div>
    //   </section>
    //   <ReactPaginate
    //     pageCount={totalPages}
    //     forcePage={page - 1}
    //     onPageChange={({ selected }) => setPage(selected + 1)}
    //     containerClassName="flex items-center justify-center gap-x-4 rounded-md bg-white p-4 mt-4"
    //     pageClassName="text-black hover:text-blue-600 bg-gray-50 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
    //     previousClassName="text-black hover:text-blue-600 bg-gray-50 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
    //     nextClassName="text-black hover:text-blue-600 bg-gray-50 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
    //     activeClassName="text-blue-500 bg-sky-100 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer"
    //     nextLabel=">"
    //     previousLabel="<"
    //   />
    // </PageLayout>
  );
};

export default PaginatedPosts;
