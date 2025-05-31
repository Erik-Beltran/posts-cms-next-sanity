"use client";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import PostsContainer from "./PostsContainer";
import PostCardSkeleton from "./PostCardSkeleton";

import { POSTS_PER_PAGE, usePaginatedPosts } from "@/hooks/usePaginatedPosts";

const PaginatedPosts = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const { data, isLoading, isError } = usePaginatedPosts(page);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    replace(`/${pathName}?${params.toString()}`);
  }, [page]);

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
        previousClassName="text-white bg-black hover:bg-sky-100 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:text-blue-600"
        nextClassName="text-white hover:text-blue-600 bg-black rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
        activeClassName="text-blue-600 bg-blue-600 rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer"
        nextLabel=">"
        previousLabel="<"
        pageClassName="text-white hover:text-blue-600 bg-black rounded px-3 py-1 text-sm font-medium border border-gray-500/10 cursor-pointer hover:bg-sky-100"
      />
    </section>
  );
};

export default PaginatedPosts;
