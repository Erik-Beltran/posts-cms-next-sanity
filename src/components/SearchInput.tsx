"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function SearchInput() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    params.delete("page");
    replace(`/search?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder="Search posts..."
      className="border-2 px-3 py-2 rounded w-full max-w-md border-gray-500/10 focus:outline-blue-600"
      defaultValue={searchParams.get("q")?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
export default SearchInput;
