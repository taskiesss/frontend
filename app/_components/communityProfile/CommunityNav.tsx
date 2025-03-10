"use client";

import { useState, useEffect } from "react";
import Button from "../common/button";
import { usePathname, useRouter } from "next/navigation";

// Move buttons outside the component since it's static
const buttons = [
  { text: "About Community", route: "about" },
  { text: "Job & Talent Board", route: "board" },
  { text: "Community posts", route: "posts" },
];

export default function CommunityNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract communityId and current tab from pathname
  const pathSegments = pathname.split("/");
  const communityId = pathSegments[pathSegments.length - 2]; // e.g., "123"
  const currentTab = pathSegments[pathSegments.length - 1] || "about"; // e.g., "board"

  // Set initial active button based on current route
  const initialActive = buttons.findIndex((btn) => btn.route === currentTab);
  const [activeButton, setActiveButton] = useState(
    initialActive !== -1 ? initialActive : 0
  );

  // Sync activeButton with URL changes
  useEffect(() => {
    const newActive = buttons.findIndex((btn) => btn.route === currentTab);
    if (newActive !== -1 && newActive !== activeButton) {
      setActiveButton(newActive);
    }
  }, [pathname, currentTab, activeButton]);

  function setActive(i: number) {
    setActiveButton(i);
    const newPath = `/nx/freelancer/communities/${communityId}/${buttons[i].route}`;
    router.push(newPath, { scroll: false });
    console.log("Navigating to:", newPath);
    console.log("Current pathname:", pathname);
  }

  return (
    <nav className="flex gap-4">
      {buttons.map((btn, i) => (
        <Button
          key={btn.route}
          className={`${
            activeButton === i
              ? "bg-[var(--button-hover-background-color)] text-white"
              : ""
          }`}
          onClick={() => setActive(i)}
        >
          {btn.text}
        </Button>
      ))}
    </nav>
  );
}
