"use client";

import { PropsWithChildren, Suspense } from "react";
import SearchInput from "./SearchInput";
import AuthorsContainer from "./AuthorsContainer";

type PageLayoutProps = PropsWithChildren<{
  title?: string;
}>;

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <main className="flex flex-col h-full gap-y-4 flex-1">
      <section className="">
        <div className="flex items-center justify-between rounded-md bg-white p-5">
          <h2 className="text-4xl font-bold text-black">{title}</h2>
          <div className="hidden flex-1 md:flex justify-end">
            <Suspense fallback={<div>Loading search...</div>}>
              <SearchInput />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between gap-4 flex-col pb-4 lg:flex-row overflow-y-auto">
          <div className="lg:w-[75%] overflow-y-auto">{children}</div>
          <AuthorsContainer />
        </div>
      </section>
    </main>
  );
}
