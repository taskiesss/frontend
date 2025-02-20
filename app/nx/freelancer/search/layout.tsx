// app/search/layout.tsx
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SmallNav from "@/app/_components/common/SmallNav";
import Container from "@/app/_components/common/Container";

export default function PublicSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || undefined;
  return (
    <Container>
      <SmallNav pathname={pathname} role="freelancer" />
      <main>{children}</main>
    </Container>
  );
}
