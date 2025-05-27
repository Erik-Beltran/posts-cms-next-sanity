import { defineQuery } from "next-sanity";

export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"]{
    title,
    "slug": slug.current,
    icon
  }`);

export const ARTICLES_BY_CATEGORY = defineQuery(
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
