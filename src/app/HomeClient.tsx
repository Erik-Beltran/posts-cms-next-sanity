import { Suspense } from "react";

import PageLayout from "@/components/PageLayout";
import PaginatedPosts from "@/components/PaginatedPosts";

export default function HomeClient() {
  return (
    <PageLayout title="Latest Posts">
      <Suspense fallback={<div>Loading posts...</div>}>
        <PaginatedPosts />
      </Suspense>
    </PageLayout>
  );
}
