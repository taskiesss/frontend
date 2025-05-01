import React from "react";
import Footer from "./Footer";

function ClientFooter() {
  const clientSections = [
    {
      title: "For Clients",
      links: [
        { title: "All Proposals", href: "/nx/client/all-proposals" },
        {
          title: "Discover Communities",
          href: "/nx/client/discover-communities",
        },
        { title: "Discover Talents", href: "/nx/client/discover-talents" },
      ],
    },
    {
      title: "Manage",
      links: [
        { title: "All Contracts", href: "/nx/client/mycontracts" },
        { title: "Transactions", href: "/nx/client/transactions" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Terms of Service", href: "/nx/client/terms" },
        // { title: "Privacy Policy", href: "/nx/client/privacy" },
        // { title: "Cookie Policy", href: "/nx/client/cookies" },
      ],
    },
  ];

  return (
    <Footer
      sections={clientSections}
      bottomText="© 2025 Taskaya. Connecting businesses with exceptional talent."
    />
  );
}

export default ClientFooter;
