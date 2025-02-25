import NavLoggedin from "@/app/_components/common/NavLoggedin";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavLoggedin></NavLoggedin>
      <main>{children}</main>
    </div>
  );
}
