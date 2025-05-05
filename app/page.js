"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirects root route ("/") to the login page
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
}
