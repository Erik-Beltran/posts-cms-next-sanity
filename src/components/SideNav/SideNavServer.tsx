import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import SideNavClient from "./SideNavClient";
import { Logo } from "../Logo";

export default async function SideNavServer() {
  const categories = await client.fetch(CATEGORIES_QUERY);
  categories.unshift({
    icon: "house",
    title: "Home",
    slug: "/",
  });

  return (
    <div className="flex h-full flex-col p-4 bg-white rounded-md">
      <Logo />
      <SideNavClient categories={categories} />
    </div>
  );
}
