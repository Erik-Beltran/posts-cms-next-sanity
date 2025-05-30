import { client } from "@/sanity/lib/client";
import { PAGINATED_POSTS_QUERY } from "@/sanity/lib/queries";
import { useQuery } from "@tanstack/react-query";

export const POSTS_PER_PAGE = 6;

const fetchPaginatedPosts = async (page: number) => {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE - 1;

  return await client.fetch(PAGINATED_POSTS_QUERY(start, end));
};

export const usePaginatedPosts = (page: number) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPaginatedPosts(page),
  });
};
