import PageLayout from "@/components/PageLayout";
import PostCard from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { POSTS_BY_CATEGORY } from "@/sanity/lib/queries";
import { Category } from "@/types/sanity";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const data = await client.fetch<Category>(POSTS_BY_CATEGORY, {
    slug,
  });

  const { description, title, posts = [] } = data;

  return (
    <PageLayout title={title}>
      <p className="text-black rounded-md bg-white p-4 mb-6">{description}</p>
      {posts.length === 0 ? (
        <p className="text-2xl font-medium text-center flex flex-1 justify-center items-center">
          This category doesn’t have any post yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8  overflow-y-auto mb-4">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} showAuthor />
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
