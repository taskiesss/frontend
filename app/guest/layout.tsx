import React from "react";
import NavBar from "../_components/common/NavBar";
import GuestFooter from "../_components/common/footerComponents/GuestFooter";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <GuestFooter />
    </div>
  );
}
