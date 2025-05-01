import React from "react";
import Footer from "./Footer";

function FreelancerFooter() {
  const freelancerSections = [
    {
      title: "For Freelancers",
      links: [
        {
          title: "All Proposals",
          href: "/nx/freelancer/proposals/myProposals",
        },
        {
          title: "Discover Communities",
          href: "/nx/freelancer/mycommunities",
        },
        { title: "Find Work", href: "/nx/freelancer/find-work" },
      ],
    },
    {
      title: "Manage",
      links: [
        { title: "All Contracts", href: "/nx/freelancer/mycontracts" },
        { title: "Transactions", href: "/nx/freelancer/transactions" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Terms of Service", href: "/nx/freelancer/terms" },
        // { title: "Privacy Policy", href: "/nx/freelancer/privacy" },
        // { title: "Cookie Policy", href: "/nx/freelancer/cookies" },
      ],
    },
  ];

  return (
    <Footer
      sections={freelancerSections}
      bottomText="© 2025 Taskaya. Empowering freelancers worldwide."
    />
  );
}
export default FreelancerFooter;
