import { client } from "@/sanity/lib/client";
import { POSTS_BY_QUERY } from "@/sanity/lib/queries";
import { PostWithAuthor } from "@/types/sanity";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Query missing" }, { status: 400 });
  }

  const results = await client.fetch<PostWithAuthor[]>(POSTS_BY_QUERY, {
    q,
  });

  return NextResponse.json(results);
}
