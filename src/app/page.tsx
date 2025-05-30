import PageLayout from "@/components/PageLayout";
import PaginatedPosts from "@/components/PaginatedPosts";

export default function Home() {
  return (
    <PageLayout title="Latest Posts">
      <PaginatedPosts />
    </PageLayout>
  );
}
