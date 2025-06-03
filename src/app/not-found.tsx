import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <main className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </main>
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
