"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Author } from "@/types/sanity";

interface AuthorCardProps {
  author: Author;
  isMainContainer?: boolean;
}

export default function AuthorCard({
  author,
  isMainContainer = false,
}: AuthorCardProps) {
  const { image, name, slug } = author;

  const pathName = usePathname();
  const href = `/author/${slug}`;
  const isActive = pathName === href;
  return (
    <div
      className={`flex items-center ${
        isMainContainer ? "mb-4 space-x-2" : "flex-col"
      }`}
    >
      <Image
        src={image}
        alt={name}
        width={30}
        height={30}
        className="rounded-full aspect-square"
        loading="lazy"
      />
      <Link
        className={`hover:text-blue-500 hover:underline cursor-pointer text-xs ${
          isActive ? "text-blue-500" : ""
        }`}
        href={`/author/${slug}`}
      >
        {isMainContainer ? name : `By ${name}`}
      </Link>
    </div>
  );
}
