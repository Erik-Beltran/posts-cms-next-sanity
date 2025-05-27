import Link from "next/link";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

import { usePathname } from "next/navigation";
import { CategoryWithIcon } from "@/types/sanity";

export default function SideNavItem({ title, slug, icon }: CategoryWithIcon) {
  const pathName = usePathname();
  const href = `/category/${slug}`;
  const isActive = pathName === href;

  return (
    <Link
      key={title}
      href={slug === "/" ? "/" : `/category/${slug}`}
      className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 mb-2 ${
        isActive ? "text-blue-500 bg-sky-100" : "text-black bg-gray-50"
      }`}
    >
      <DynamicIcon name={icon as IconName} />
      <p>{title}</p>
    </Link>
  );
}
