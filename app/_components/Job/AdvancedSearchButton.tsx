// Assuming this is in a file like app/_components/Job/AdvancedSearchButton.tsx
"use client"; // Mark as client component

import { useState } from "react";
import JobAside from "./JobAside";

function AdvancedSearchButton({}) {
  const [showAdvanced, setShowAdvanced] = useState(false); // Local state for toggling

  return (
    <>
      {showAdvanced ? (
        <div className="relative">
          <JobAside onClose={() => setShowAdvanced(false)} />
        </div>
      ) : (
        <div className="">
          <button
            className="px-4 py-2 bg-[var(--btn-color)] text-[var(--accent-color)] rounded-md"
            onClick={() => setShowAdvanced(true)} // Toggle state on click
          >
            Advanced Search
          </button>
        </div>
      )}
    </>
  );
}

export default AdvancedSearchButton;
