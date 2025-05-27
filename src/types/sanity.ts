import { PortableTextBlock } from "next-sanity";

export type Category = {
  title: string;
  description: string;
  icon?: string;
  slug?: string;
  posts?: ArticleWithAuthor[];
};

export type ArticleWithAuthor = {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  altImage: string;
  publishedAt: string;
  _id: string;
  authorName: string;
  authorSlug: string;
  authorImage: string;
  categories: Category[];
  author: Author;
};

export type Author = {
  name: string;
  slug: string;
  image: string;
  bio?: PortableTextBlock[];
  posts?: ArticleWithAuthor[];
};
