// This layout prefetches the account balance on the server using React Query,
// then passes the dehydrated state to the client. This avoids refetching on page load,
// delivers ultra fast response, and ensures a faster, seamless initial render.

import { cookies } from "next/headers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { preloadBalance } from "@/lib/data/preloadBalance";
import DashboardClientLayout from "./DashboardClient";
import { redirect } from "next/navigation";

// Dashboard layout with React Query hydration
export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;

  // If not logged in, show unauthorized message
  if (!accountId) {
    // return <div className="text-center text-red-600">Unauthorized</div>;
    redirect("/login");
  }

  const queryClient = new QueryClient();

  // Prefetch balance on the server while caching the result
  await queryClient.prefetchQuery({
    queryKey: ["accountBalance"],
    queryFn: () => preloadBalance(accountId),
  });

  // Provide dehydrated state to the client
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClientLayout>{children}</DashboardClientLayout>
    </HydrationBoundary>
  );
}
