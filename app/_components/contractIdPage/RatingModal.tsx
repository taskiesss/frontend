/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import StarRating from "../common/StarRating";
import Cookies from "js-cookie";
import { postRateReview } from "@/app/_lib/ContractsAPi/contractAPI";
import ProtectedPage from "../common/ProtectedPage";

type Props = { contractId: string; canRate: boolean };

const RatingModal = ({ contractId, canRate }: Props) => {
  const [isClicked, setIsClicked] = useState(canRate);
  const [rating, setRating] = useState(0);
  const [isForbidden, setIsForbidden] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (isClicked)
      document.body.style.overflow = "hidden"; // Hide page scrollbar
    else document.body.style.overflow = "auto";
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isClicked]);

  const handleSubmit = async () => {
    if (rating <= 0) return;
    setIsPending(true);
    const token = Cookies.get("token");
    try {
      await postRateReview({ id: contractId, rate: rating }, token);
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
      }
    } finally {
      setRating(0);
      setIsClicked(false);
      setIsPending(false);
    }
  };

  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );

  return (
    <>
      <button
        onClick={() => {
          setRating(0);
          setIsClicked(true);
        }}
        className="hover:underline text-xl underline text-[var(--hover-color)] hover:text-[var(--btn-color)]"
      >
        Rate now
      </button>
      {isClicked ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[var(--background-color)] p-6 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-lg w-full flex flex-col gap-6">
            <div className="flex justify-between">
              <h1 className="text-2xl self-end">Rate your experience</h1>
              <button
                onClick={() => setIsClicked(false)}
                className="self-start text-xl transition-all hover:scale-125"
              >
                X
              </button>
            </div>
            <div className="self-center">
              <StarRating
                defaultRating={rating}
                onSetRating={setRating}
                size={35}
                color="#f8cf18"
                allowHalf={true}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setRating(0);
                  setIsClicked(false);
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={rating <= 0 || isPending}
                className="px-4 py-2 bg-[var(--btn-color)] text-white rounded-lg hover:bg-[var(--button-hover-background-color)] transition-colors disabled:bg-[#f2f2f2] disabled:text-black disabled:cursor-not-allowed disabled:opacity-60 "
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RatingModal;
