import { formatDate } from "@/utils/formatters";
import Image from "next/image";
import Link from "next/link";
import AuthorCard from "./AuthorCard";
import { PostWithAuthor } from "@/types/sanity";

interface PostCardProps {
  post: PostWithAuthor;
  showAuthor?: boolean;
}

function PostCard({ post, showAuthor }: PostCardProps) {
  const {
    imageUrl,
    altImage,
    title,
    categories,
    slug,
    description,
    publishedAt,
    author,
  } = post;
  return (
    <li className="shadow-sm rounded-md hover:bg-gray-200 transition-all duration-300 text-gray-500 bg-white list-none">
      <Image
        src={imageUrl}
        alt={altImage || title}
        width={400}
        height={400}
        className="rounded-t-md h-[200px] w-full object-cover"
      />

      <div className="p-3 flex flex-col gap-2 md:gap-3 flex-1">
        <div className="flex justify-between border-b flex-col gap-2 border-gray-500">
          <p className="flex gap-x-2 flex-wrap">
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

          <>
            <Link href={`/post/${slug}`}>
              <h3 className="text-md md:text-xl font-bold line-clamp-2 h-14 text-black">
                {title}
              </h3>
              <p className="text-sm md:text-md font-medium line-clamp-2 flex-1 my-2">
                {description}
              </p>
              <p className="text-xs md:text-md font-medium hover:text-blue-600 mb-2">
                Read More
              </p>
            </Link>
          </>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-xs">{formatDate(publishedAt)}</span>
          {showAuthor && <AuthorCard author={author} />}
        </div>
      </div>
    </li>
  );
}

export default PostCard;
