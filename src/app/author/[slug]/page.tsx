import PostCard from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { ARTICLES_BY_AUTHOR } from "@/sanity/lib/queries";
import { Author } from "@/types/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AuthorPage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const data = await client.fetch<Author>(ARTICLES_BY_AUTHOR, {
    slug,
  });

  const { name, bio, image, posts = [] } = data;

  if (posts.length === 0) {
    return (
      <div className="h-full rounded-md bg-white w-full flex justify-center items-center p-4">
        <span className="text-black text-2xl font-bold">
          This Author doesn’t have any post yet.
        </span>
      </div>
    );
  }

  return (
    <main className="flex flex-col  h-full  gap-y-6 flex-1 overflow-y-auto">
      <section className="rounded-md bg-white p-4 flex">
        <div className="lg:max-w-[1114px] mx-auto flex items-center gap-x-10">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-black">{name}</h2>
            {bio && <PortableText value={bio} />}{" "}
          </div>

          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="rounded-full aspect-square block max-md:w-24 h-auto"
            loading="lazy"
          />
        </div>
      </section>
      <section>
        <h3 className="text-4xl font-bold text-black bg-white rounded-md p-4 mb-6">
          Articles
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8  overflow-y-auto">
          {posts.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}
