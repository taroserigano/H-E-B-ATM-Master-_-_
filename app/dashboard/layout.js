// app/dashboard/layout.js
import { cookies } from "next/headers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { preloadBalance } from "@/lib/data/preloadBalance";
import DashboardClientLayout from "./DashboardClient";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;

  if (!accountId) {
    return <div className="text-center text-red-600">Unauthorized</div>;
  }

  const queryClient = new QueryClient();

  // Prefetch balance on server
  await queryClient.prefetchQuery({
    queryKey: ["accountBalance"],
    queryFn: () => preloadBalance(accountId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClientLayout>{children}</DashboardClientLayout>
    </HydrationBoundary>
  );
}
