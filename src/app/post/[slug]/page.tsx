import Image from "next/image";
import { PortableText } from "next-sanity";
import Link from "next/link";

import PageLayout from "@/components/PageLayout";
import AuthorCard from "@/components/AuthorCard";

import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG } from "@/sanity/lib/queries";

import { PostContent } from "@/types/sanity";
import { formatDate } from "@/utils/formatters";
import PostsContainer from "@/components/PostsContainer";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const data = await client.fetch<PostContent>(POST_BY_SLUG, {
    slug,
  });

  const {
    imageUrl,
    title,
    publishedAt,
    author,
    body,
    tags,
    categories,
    related,
  } = data;

  return (
    <PageLayout>
      <div className="flex flex-col overflow-y-auto gap-y-4">
        <section className="bg-white rounded-md p-4">
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={100}
            loading="lazy"
            className="rounded-md w-full aspect-video"
          />
          <div className="flex justify-between items-end p-2 max-md:flex-col  ">
            <div className="lg:w-[75%] flex flex-col">
              <p className="flex gap-x-2">
                {categories.map((category) => (
                  <span key={category.slug}>
                    <Link
                      key={category.title}
                      href={`/category/${category.slug}`}
                      className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      {category.title}
                    </Link>
                    {category.slug === categories[categories.length - 1].slug
                      ? ""
                      : ","}
                  </span>
                ))}
              </p>
              <h2 className="font-bold text-2xl text-black">{title}</h2>
            </div>
            <div className="flex-1 flex justify-between items-end w-full">
              <span className="text-xs">{formatDate(publishedAt)}</span>
              <AuthorCard author={author} />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-x-8 lg:flex-row gap-y-4">
          <div className="rounded-md bg-white p-4 flex-1 flex flex-col gap-y-3 h-auto">
            {<PortableText value={body} />}
          </div>
          <aside className="rounded-md bg-white lg:w-[20%] p-4">
            <h5 className="font-bold text-black mb-2">Tags</h5>
            <ul className="flex flex-wrap gap-x-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-gray-400/5 rounded-md text-xs p-2 mb-2"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </aside>
        </section>
        {related && related?.length > 0 && (
          <>
            <h4 className="bg-white rounded-md p-4 text-black font-semibold">
              Related Post
            </h4>
            <PostsContainer posts={related} />
          </>
        )}
      </div>
    </PageLayout>
  );
}
