import { client } from "@/sanity/lib/client";
import { AUTHORS_QUERY } from "@/sanity/lib/queries";

import { Author } from "@/types/sanity";
import AuthorCard from "./AuthorCard";

export default async function AuthorsContainer() {
  const authors = await client.fetch<Author[]>(AUTHORS_QUERY);

  return (
    <div className="bg-white rounded-md p-4 flex flex-1 flex-col">
      <h3 className="font-bold text-black mb-4">Search by Author</h3>
      <div>
        {authors.map((author) => (
          <AuthorCard author={author} key={author.slug} isMainContainer />
        ))}
      </div>
    </div>
  );
}
