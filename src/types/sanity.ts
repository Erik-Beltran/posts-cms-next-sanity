import { PortableTextBlock } from "next-sanity";

export type Category = {
  title: string;
  description: string;
  icon?: string;
  slug?: string;
  posts?: PostWithAuthor[];
};

export type PostWithAuthor = {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  altImage: string;
  publishedAt: string;
  _id: string;
  categories: Category[];
  author: Author;
};

export type PostContent = PostWithAuthor & {
  body: PortableTextBlock[];
  tags: string[];
  related?: PostWithAuthor[];
};

export type Author = {
  name: string;
  slug: string;
  image: string;
  bio?: PortableTextBlock[];
  posts?: PostWithAuthor[];
};
