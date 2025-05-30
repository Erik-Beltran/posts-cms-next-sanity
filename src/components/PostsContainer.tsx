import { PostWithAuthor } from "@/types/sanity";
import PostCard from "./PostCard";

interface PostsContainerProps {
  posts: PostWithAuthor[];
}

const PostsContainer = ({ posts }: PostsContainerProps) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8  overflow-y-auto">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} showAuthor />
      ))}
    </ul>
  );
};

export default PostsContainer;
