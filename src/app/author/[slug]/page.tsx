import Image from "next/image";
import { PortableText } from "next-sanity";

import PageLayout from "@/components/PageLayout";

import { client } from "@/sanity/lib/client";
import { POSTS_BY_AUTHOR } from "@/sanity/lib/queries";

import { Author } from "@/types/sanity";
import PostsContainer from "@/components/PostsContainer";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  const data = await client.fetch<Author>(
    POSTS_BY_AUTHOR,
    {
      slug,
    },
    { cache: "force-cache" }
  );

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
    <PageLayout>
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
          <PostsContainer posts={posts} showAuthor={false} />
        </section>
      </main>
    </PageLayout>
  );
}
