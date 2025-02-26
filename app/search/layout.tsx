// app/search/layout.tsx
"use client"; // Mark as client component

import React from "react";
import SmallNav from "@/app/_components/common/SmallNav";
import Container from "@/app/_components/common/Container";
import { useSearchParams, usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams(); // Get query parameters
  const pathname = usePathname(); // Get current pathname

  // Extract only the 'query' parameter
  const queryValue = searchParams?.get("query"); // e.g., "Machine"
  // Construct queryString as "?query=String" or empty string if no query
  const queryString = queryValue
    ? `query=${encodeURIComponent(queryValue)}`
    : "";

  return (
    <Container>
      <SmallNav
        pathname={pathname || ""}
        role="freelancer"
        queryString={queryString}
      />
      <main>{children}</main>
    </Container>
  );
}
