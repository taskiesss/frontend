import NavBar from "@/app/_components/common/NavBar";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <NavBar /> */}
      <main>{children}</main>
    </div>
  );
}
