import ClientFooter from "@/app/_components/common/footerComponents/ClientFooter";
import NavLoggedin from "@/app/_components/common/NavLoggedin";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid">
      <NavLoggedin></NavLoggedin>
      <main className="min-h-screen">{children}</main>
      <ClientFooter />
    </div>
  );
}
