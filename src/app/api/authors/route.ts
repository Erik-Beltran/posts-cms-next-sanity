import { NextResponse } from "next/server";

import { client } from "@/sanity/lib/client";
import { AUTHORS_QUERY } from "@/sanity/lib/queries";

export async function GET() {
  const authors = await client.fetch(AUTHORS_QUERY);
  return NextResponse.json(authors);
}
