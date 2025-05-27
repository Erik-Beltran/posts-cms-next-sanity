import { defineQuery } from "next-sanity";

export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"]{
    title,
    "slug": slug.current,
    icon
  }`);

export const POSTS_BY_CATEGORY = defineQuery(
  `*[_type == "category" && slug.current == $slug][0]{
    title,
    description,
    "posts": *[_type == "post" && references(^._id)]{
      _id,
      title,
      "slug": slug.current,
      description,
      "imageUrl": mainImage.asset->url,
      "altImage": mainImage.alt,
      "author": author->{
      name,
      "slug": slug.current,
      "image": image.asset->url
      },
      publishedAt,
      "categories": categories[]->{
        title,
        "slug": slug.current,
       }
    }  
  }`
);

export const POSTS_BY_AUTHOR = defineQuery(
  `*[_type == "author" && slug.current == $slug][0]{
    name,
    bio,
    "image": image.asset->url,
    "posts": *[_type == "post" && references(^._id)]{
      _id,
      title,
      "slug": slug.current,
      description,
      "imageUrl": mainImage.asset->url,
      "altImage": mainImage.alt,
      publishedAt,
      "categories": categories[]->{
        title,
        "slug": slug.current,
       }
    }  
  }`
);

export const POST_BY_SLUG = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "altImage": mainImage.alt,
      description,
      body,
      publishedAt,
      "categories": categories[]->{
        title,
        "slug": slug.current,
      },
       "author": author->{
        name,
        "slug": slug.current,
        "image": image.asset->url
      },
      tags,
    }  
  `
);
