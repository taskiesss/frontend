// Assuming this is in a file like app/_components/Job/AdvancedSearchButton.tsx
"use client"; // Mark as client component

import JobAside from "./JobAside";

function AdvancedSearchButton({}) {
  return (
    <>
      <div className="relative">
        <JobAside />
      </div>
    </>
  );
}

export default AdvancedSearchButton;
