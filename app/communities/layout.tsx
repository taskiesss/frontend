import React from "react";
import NavBar from "../_components/common/NavBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
