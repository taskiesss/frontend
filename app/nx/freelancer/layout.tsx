import FreelancerFooter from "@/app/_components/common/footerComponents/FreelancerFooter";
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
      <main>{children}</main>
      <FreelancerFooter />
    </div>
  );
}
