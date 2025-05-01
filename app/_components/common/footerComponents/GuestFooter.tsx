import React from "react";
import Footer from "./Footer";

function GuestFooter() {
  const guestSections = [
    {
      title: "For Guests",
      links: [
        {
          title: "Discover Freelancers",
          href: "/guest/freelancers",
        },
        {
          title: "Discover Communities",
          href: "/guest/communities",
        },
        { title: "Find Work", href: "/guest/jobs" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Terms of Service", href: "/guest/terms" },
        { title: "About us", href: "/guest/about" },
        // { title: "Privacy Policy", href: "/nx/freelancer/privacy" },
        // { title: "Cookie Policy", href: "/nx/freelancer/cookies" },
      ],
    },
  ];

  return (
    <Footer
      sections={guestSections}
      bottomText="© 2025 Taskaya. All rights are reserved."
    />
  );
}

export default GuestFooter;
