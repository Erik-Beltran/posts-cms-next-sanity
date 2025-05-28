import { PropsWithChildren } from "react";
import SearchInput from "./SearchInput";

type PageLayoutProps = PropsWithChildren<{
  title: string;
}>;

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <main className="flex flex-col h-full gap-y-6 flex-1">
      <section className="rounded-md bg-white p-4">
        <div className="flex items-center justify-between ">
          <h2 className="text-4xl font-bold text-black">{title}</h2>
          <div className="max-md:hidden w-full flex justify-end">
            <SearchInput />
          </div>
        </div>
      </section>
      <section>{children}</section>
    </main>
  );
}
