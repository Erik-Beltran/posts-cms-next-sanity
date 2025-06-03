import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchPageClient />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
