import { PostWithAuthor } from "@/types/sanity";
import PostCard from "./PostCard";

interface PostsContainerProps {
  posts: PostWithAuthor[];
  showAuthor?: boolean;
}

const PostsContainer = ({ posts, showAuthor = true }: PostsContainerProps) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2   gap-6 md:gap-8  overflow-y-auto">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} showAuthor={showAuthor} />
      ))}
    </ul>
  );
};

export default PostsContainer;
