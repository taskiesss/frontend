"use client";
import { useState } from "react";
import ViewSubmission from "./ViewSubmissions";

// interface MoreOptionButtonProps {}

function MoreOptionButton({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const [isViewSubmission, setIsViewSubmission] = useState(false);

  const handleViewSubmissions = () => {
    console.log("view submissions");
    setIsViewSubmission(true);
    setIsOpen(false); // Close dropdown after click
    // Add your end contract logic here
  };

  const handleRequestPayment = () => {
    console.log("Request payment");
    setIsOpen(false); // Close dropdown after click
    // Add your send message logic here
  };

  return (
    <>
      <div className="relative flex flex-col ">
        {/* Button to toggle dropdown */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-center rounded-full border border-[var(--accent-color)] border-solid  w-10 h-10 flex items-center justify-center  hover:bg-[var(--hover-color)]"
        >
          <span className="leading-none mb-1">...</span>
        </button>

        {/* Dropdown menu */}

        {isOpen && (
          <div className="absolute top-full right-0 mt-3 min-w-40 bg-[var(--background-color)] border border-gray-600 rounded-lg shadow-lg">
            <button
              onClick={handleViewSubmissions}
              className="w-full text-left px-4 py-2 hover:bg-[var(--hover-color)]"
            >
              View submissions
            </button>
            <button
              onClick={handleRequestPayment}
              className="w-full text-left px-4 py-2 hover:bg-[var(--hover-color)]"
            >
              Request payment
            </button>
          </div>
        )}
      </div>

      {isViewSubmission && (
        <ViewSubmission
          notEditable={false}
          title={title}
          milestoneIndex={"123"}
          closeView={() => setIsViewSubmission(false)}
        />
      )}
    </>
  );
}

export default MoreOptionButton;
