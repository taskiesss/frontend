"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { contractDetailsResponse } from "@/app/_types/ContractDetailsResponse";
import React, { useEffect, useState } from "react";
import Button from "../common/button";
import Cookies from "js-cookie";
import { AcceptOrRejectContract } from "@/app/_lib/ContractsAPi/contractAPI";
import ProtectedPage from "../common/ProtectedPage";
import { useQueryClient } from "@tanstack/react-query";

type Props = { contractId: string; contract: contractDetailsResponse };

const ApproveContract = ({ contractId, contract }: Props) => {
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (showAccept || showReject) {
      document.body.style.overflow = "hidden"; // Hide page scrollbar
    } else {
      document.body.style.overflow = "auto"; // Restore page scrollbar
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAccept, showReject]);

  const handleConfirmation = async (accepted: boolean) => {
    const token = Cookies.get("token");
    await AcceptOrRejectContract({ id: contractId, accepted: accepted }, token);
    queryClient.invalidateQueries({
      queryKey: ["ContractMilestones", contractId],
    });
    try {
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
      }
    } finally {
      setShowAccept(false);
      setShowReject(false);
    }

    if (isForbidden)
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in" />
      );
  };
  // console.log(contract.voteIsDone);
  return (
    <>
      {contract.isCommunity ? (
        contract.isCommunityAdmin && (
          <div className="flex justify-between pb-20">
            {!contract.voteIsDone && (
              <p className="self-center opacity-80">
                Note: Acceptance is locked until every community member submits
                their vote. The button activates once all votes are in.
              </p>
            )}
            <div className="flex gap-8 self-end ">
              <Button
                onClick={() => setShowReject(true)}
                shadowColor="#ff0000"
                className="after:bg-red-500 py-2 px-3 rounded-lg text-lg"
              >
                Reject
              </Button>
              <Button
                onClick={() => setShowAccept(true)}
                shadowColor="#40ff00"
                className=" after:bg-green-400 py-2 px-3 rounded-lg text-lg"
                disabled={!contract.voteIsDone}
              >
                Accept
              </Button>
            </div>
          </div>
        )
      ) : (
        <div className="flex gap-5 self-end pb-20">
          <Button
            onClick={() => setShowReject(true)}
            shadowColor="#ff0000"
            className=" after:bg-red-500 py-2 px-3 rounded-lg text-lg"
          >
            Reject
          </Button>
          <Button
            onClick={() => setShowAccept(true)}
            shadowColor="#40ff00"
            className="after:bg-green-500 py-2 px-3 rounded-lg text-lg"
          >
            Accept
          </Button>
        </div>
      )}
      {showAccept && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[var(--background-color)] p-7 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-lg w-full">
            <h3 className="text-xl font-bold text-green-500 mb-4">
              <span className="text-3xl">⚠{"  "}</span>
              Confirm Acceptance
            </h3>
            <p className="text-lg mb-6">
              Are you sure you want to accept this contract ? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowAccept(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmation(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                ✔ Confirm Accept
              </button>
            </div>
          </div>
        </div>
      )}
      {showReject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[var(--background-color)] p-7 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-lg w-full">
            <h3 className="text-xl font-bold text-red-500 mb-4">
              <span className="text-3xl">⚠{"  "}</span>
              Confirm Rejection
            </h3>
            <p className="text-lg mb-6">
              Are you sure you want to reject this contract ? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowReject(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmation(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                ❌ Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApproveContract;
