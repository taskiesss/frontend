// Assuming this is in a file like app/_components/Job/AdvancedSearchButton.tsx
"use client"; // Mark as client component

import { useState } from "react";
import FreelancerAside from "./FreelancerAside";

function AdvancedSearchButton({}) {
  const [showAdvanced, setShowAdvanced] = useState(false); // Local state for toggling

  return (
    <>
      <div className="relative">
        <FreelancerAside onClose={() => setShowAdvanced(false)} />
      </div>
    </>
  );
}

export default AdvancedSearchButton;
