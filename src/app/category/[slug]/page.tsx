import PostCard from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { ARTICLES_BY_CATEGORY } from "@/sanity/lib/queries";
import { Category } from "@/types/sanity";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const data = await client.fetch<Category>(ARTICLES_BY_CATEGORY, {
    slug,
  });

  const { description, title, posts = [] } = data;

  if (posts.length === 0) {
    return (
      <div className="h-full rounded-md bg-white w-full flex justify-center items-center p-4">
        <span className="text-black text-2xl font-bold">
          This category doesn’t have any post yet.
        </span>
      </div>
    );
  }

  return (
    <main className="flex  flex-col h-full gap-y-6 flex-1">
      <h1 className="text-4xl font-bold text-black rounded-md bg-white p-4">
        {title}
      </h1>
      <p className="text-black rounded-md bg-white p-4">{description}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8  overflow-y-auto">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} showAuthor />
        ))}
      </ul>
    </main>
  );
}
