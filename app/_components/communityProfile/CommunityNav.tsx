import { useState } from "react";
import Button from "../common/button";

export default function CommunityNav() {
  // Default active button is "About Community"
  const [activeButton, setActiveButton] = useState(0);

  const buttons = ["About Community", "Job & Talent Board", "Community posts"];

  return (
    <nav className="flex gap-4">
      {buttons.map((btn, i) => (
        <Button
          key={btn}
          className={`${
            activeButton === i
              ? "bg-[var(--button-hover-background-color)] text-white"
              : ""
          }`}
          onClick={() => setActiveButton(i)}
        >
          {btn}
        </Button>
      ))}
    </nav>
  );
}
