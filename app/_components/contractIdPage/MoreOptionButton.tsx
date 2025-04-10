/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import ViewSubmission from "./ViewSubmissions";
import Cookies from "js-cookie";
import { requestPayment } from "@/app/_lib/ContractsAPi/milestonesActions";
import ProtectedPage from "../common/ProtectedPage";
import Button from "../common/button";
import { useQueryClient } from "@tanstack/react-query";
// interface MoreOptionButtonProps {}

function MoreOptionButton({
  communityid,
  status,
  title,
  contractId,
  milestoneIndex,
  index,
  currentPage,
  size,
}: {
  communityid?: string;
  status: string;
  title: string;
  contractId: string;
  milestoneIndex: string;
  index: number;
  currentPage: number;
  size: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isViewSubmission, setIsViewSubmission] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleViewSubmissions = () => {
    setIsViewSubmission(true);
    setIsOpen(false); // Close dropdown after click
    // Add your end contract logic here
  };

  const handleRequestPayment = async () => {
    const token = Cookies.get("token");
    setIsSubmitting(true);
    try {
      const { contractId: returnedContractId } = await requestPayment(
        {
          communityid: communityid,
          contractid: contractId,
          index: index + 1,
          milestoneIndex,
        },
        token
      );

      queryClient.invalidateQueries({
        queryKey: ["ContractMilestones", returnedContractId, currentPage, size],
        exact: true,
      });
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
        setIsSubmitting(false);
        return;
      }
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  };
  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to view these submissions. Please log in" />
    );
  }

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
              onClick={() => {
                setShowConfirmation(true);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-[var(--hover-color)]"
            >
              Request payment
            </button>
          </div>
        )}
      </div>

      {isViewSubmission && (
        <ViewSubmission
          currentPage={currentPage}
          size={size}
          index={index}
          status={status}
          contractId={contractId}
          notEditable={false}
          title={title}
          milestoneIndex={milestoneIndex}
          closeView={() => setIsViewSubmission(false)}
        />
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[var(--background-color)] p-6 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-xl w-full">
            <h3 className="text-2xl font-bold text-[var(--accent-color)] pb-4">
              <span className="text-3xl">⚠{"  "}</span> Confirm Request
            </h3>
            <p className="whitespace-pre-wrap text-lg pb-6">
              Are you sure you want to do this request for this milestone ? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>

              <button
                className="text-lg bg-[var(--hover-color)] py-2 px-3 rounded-lg hover:bg-[var(--btn-color)]"
                disabled={isSubmitting}
                onClick={handleRequestPayment}
              >
                {isSubmitting ? "Submitting request..." : "Request Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MoreOptionButton;
