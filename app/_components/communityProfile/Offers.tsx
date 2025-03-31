"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";

// --- ADJUST IMPORTS ---
import {
  getCommunityOffers,
  voteOnCommunityContract,
} from "@/app/_lib/CommunityProfile/board"; // <-- ADJUST PATH AS NEEDED
import { Pagination } from "../common/Pagination"; // Assuming correct path
import Skill from "../common/Skill";

// --- INTERFACE FOR PROPS ---
interface CommunityOffersProps {
  editable: boolean;
  communityId: string;
}

// --- OFFER TYPE ---
interface Offer {
  contractID: string;
  jobTitle: string;
  description: string;
  skills: string[];
  pricePerHour: number;
  sentDate: string;
  dueDate: string;
  voted: number;
  left: number;
  accepted: number;
  rejected: number;
  agreed: boolean | null;
}

interface PaginatedOffersResponse {
  content: Offer[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
}

// --- COMPONENT ---
export default function CommunityOffers({
  communityId,
  editable,
}: CommunityOffersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const size = 5;
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  // --- FETCH OFFERS ---
  const { data, isError, error, isLoading } = useQuery<
    PaginatedOffersResponse,
    Error
  >({
    queryKey: ["communityOffers", communityId, currentPage, size],
    queryFn: () =>
      getCommunityOffers(communityId, token, currentPage - 1, size),
    placeholderData: () => {
      const prevPageData = queryClient.getQueryData<PaginatedOffersResponse>([
        "communityOffers",
        communityId,
        currentPage - 1,
        size,
      ]);
      return prevPageData;
    },
    staleTime: 5 * 60 * 1000,
  });

  // --- VOTE MUTATION ---
  const voteMutation = useMutation({
    mutationFn: (voteData: { contractId: string; agreed: boolean }) =>
      voteOnCommunityContract(communityId, voteData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["communityOffers", communityId],
      });
    },
    onError: (err) => {
      console.error("Voting failed:", err);
    },
  });

  // --- VOTE HANDLER ---
  const handleVote = (contractId: string, agreed: boolean) => {
    if (!editable) return;
    voteMutation.mutate({ contractId, agreed });
  };

  // --- RENDER STATES ---
  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (errorMessage === "Forbidden" || errorMessage === "Unauthorized user") {
      return (
        <div className="p-4 text-red-600">
          You are not authorized to view offers for this community.
        </div>
      );
    }
    return (
      <div className="p-4 text-red-600">
        Error loading offers: {errorMessage}
      </div>
    );
  }

  if (isLoading && !data) {
    return <div className="p-4 text-gray-500">Loading offers...</div>;
  }

  if (!data?.content?.length) {
    return (
      <div className="p-4 text-gray-500">
        No offers available for this community.
      </div>
    );
  }

  // --- FORMATTING HELPERS ---
  const formatDateRange = (start: string, end: string): string => {
    try {
      const startDate = format(new Date(start), "MMMM d, yyyy");
      const endDate = format(new Date(end), "MMMM d, yyyy");
      return `${startDate} - ${endDate}`;
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  // --- MAIN RENDER ---
  return (
    <div className="flex flex-col gap-7 p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Offers</h2>
      <div className="flex flex-col gap-6">
        {data.content.map((offer: Offer) => (
          <div
            key={offer.contractID}
            className="rounded-lg shadow-md p-4 md:p-5 "
          >
            {/* Offer Header */}
            <h3 className="text-xl font-semibold mb-2 ">{offer.jobTitle}</h3>
            <p className="text-gray-500 mb-3 text-sm leading-relaxed line-clamp-3">
              {offer.description}
            </p>

            {/* Skills --- MODIFIED SECTION --- */}
            {offer.skills && offer.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {/* Map over skills and use the Skill component */}
                {offer.skills.map((skill, index) => (
                  <Skill
                    // Use a more robust key combining offer ID and index
                    key={`${offer.contractID}-skill-${index}`}
                    skill={skill}
                    index={index}
                    // No onRemove prop is needed here as we are just displaying
                  />
                ))}
              </div>
            )}
            {/* --- END OF MODIFIED SECTION --- */}

            {/* Rate and Dates */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-4">
              <p>
                Offered hourly rate:{" "}
                <span className="font-medium text-gray-500">
                  {formatCurrency(offer.pricePerHour)}
                </span>
              </p>
              <p className="mt-1 sm:mt-0">
                {formatDateRange(offer.sentDate, offer.dueDate)}
              </p>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Voting Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Vote Status */}
              <p className="text-sm font-medium">
                {offer.voted} vote{offer.voted !== 1 ? "s" : ""} - {offer.left}{" "}
                left
              </p>

              {/* Vote Actions (Conditional) */}
              {editable && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleVote(offer.contractID, true)}
                    disabled={voteMutation.isPending || offer.agreed === true}
                    className={`px-4 py-1.5 rounded border-2 text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1
                        ${
                          offer.agreed === true
                            ? "bg-green-500 border-green-500 text-white cursor-not-allowed"
                            : "border-green-500 text-green-600 hover:bg-green-500 hover:text-white focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        }
                      `}
                  >
                    Accept{offer.agreed === true ? "ed" : ""}
                  </button>
                  <button
                    onClick={() => handleVote(offer.contractID, false)}
                    disabled={voteMutation.isPending || offer.agreed === false}
                    className={`px-4 py-1.5 rounded border-2 text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1
                         ${
                           offer.agreed === false
                             ? "bg-red-500 border-red-500 text-white cursor-not-allowed"
                             : "border-red-500 text-red-600 hover:bg-red-500 hover:text-white focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                         }
                      `}
                  >
                    Reject{offer.agreed === false ? "ed" : ""}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="mt-6 md:mt-8">
          <Pagination
            currentPage={currentPage}
            totalCount={data.totalElements}
            pageSize={size}
            onPageChange={setCurrentPage}
            siblingCount={1}
          />
        </div>
      )}
    </div>
  );
}
