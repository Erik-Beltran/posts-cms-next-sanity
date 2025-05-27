import Image from "next/image";
import { PortableText } from "next-sanity";

import AuthorCard from "@/components/AuthorCard";

import { formatDate } from "@/utils/formatters";
import { PostContent } from "@/types/sanity";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG } from "@/sanity/lib/queries";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const data = await client.fetch<PostContent>(POST_BY_SLUG, {
    slug,
  });

  const { imageUrl, title, publishedAt, author, body, tags } = data;

  return (
    <div className="flex flex-col lg:max-w-[1114px] overflow-y-auto gap-y-4 pb-5 h-full">
      <div className="bg-white rounded-md p-4">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={100}
          loading="lazy"
          className="rounded-md w-full aspect-video"
        />
        <div className="flex justify-between items-end p-2 max-md:flex-col">
          <h2 className="font-bold text-2xl text-black lg:w-[80%]">{title}</h2>
          <div className="flex-1 flex justify-between items-end w-full">
            <span className="text-xs">{formatDate(publishedAt)}</span>
            <AuthorCard author={author} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-x-8 lg:flex-row gap-y-4">
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
      </div>
    </div>
  );
}
