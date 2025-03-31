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
  getCommunityContractVotes,
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

// --- VOTE DETAILS TYPES ---
interface VoterDetail {
  name: string;
  position: string;
  freelancerId: string;
  freelancerProfilePicture: string;
}

interface ContractVoteDetails {
  accepted: VoterDetail[];
  rejected: VoterDetail[];
  remaining: VoterDetail[];
}

// --- COMPONENT ---
export default function CommunityOffers({
  communityId,
  editable,
}: CommunityOffersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeContractId, setActiveContractId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "accepted" | "rejected" | "remaining"
  >("accepted");

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

  // --- MODAL HANDLER ---
  const openModal = (contractId: string) => {
    setActiveContractId(contractId);
    setActiveTab("accepted"); // default tab on open
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveContractId(null);
  };

  // --- FETCH VOTE DETAILS FOR MODAL ---
  const {
    data: voteDetails,
    isLoading: votesLoading,
    isError: votesError,
    error: votesErrorMessage,
  } = useQuery<ContractVoteDetails, Error>({
    queryKey: ["communityContractVotes", communityId, activeContractId],
    queryFn: () => {
      if (!activeContractId) throw new Error("No contract selected");
      return getCommunityContractVotes(communityId, activeContractId, token);
    },
    enabled: !!activeContractId && modalOpen,
  });

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

  // Helper to compute percentages for the bar
  const computePercentages = (
    accepted: number,
    rejected: number,
    left: number
  ) => {
    const total = accepted + rejected + left;
    if (total === 0) {
      return { acceptedPercent: 0, rejectedPercent: 0, leftPercent: 0 };
    }
    return {
      acceptedPercent: (accepted / total) * 100,
      rejectedPercent: (rejected / total) * 100,
      leftPercent: (left / total) * 100,
    };
  };

  return (
    <div className="flex flex-col gap-7 p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Offers</h2>
      <div className="flex flex-col gap-6">
        {data.content.map((offer: Offer) => {
          const { acceptedPercent, rejectedPercent } = computePercentages(
            offer.accepted,
            offer.rejected,
            offer.left
          );

          // Debugging: Log the values to check percentages
          console.log(`Offer ${offer.contractID}:`, {
            accepted: offer.accepted,
            rejected: offer.rejected,
            left: offer.left,
            acceptedPercent,
            rejectedPercent,
          });

          return (
            <div
              key={offer.contractID}
              className="rounded-lg shadow-md p-4 md:p-5"
            >
              {/* Offer Header */}
              <h3 className="text-xl font-semibold mb-2">{offer.jobTitle}</h3>
              <p className="text-gray-500 mb-3 text-sm leading-relaxed line-clamp-3">
                {offer.description}
              </p>

              {/* Skills */}
              {offer.skills && offer.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {offer.skills.map((skill, index) => (
                    <Skill
                      key={`${offer.contractID}-skill-${index}`}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </div>
              )}

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
              <div className="flex flex-col gap-2">
                <p
                  className="text-sm font-medium cursor-pointer underline"
                  onClick={() => openModal(offer.contractID)}
                >
                  {offer.voted} vote{offer.voted !== 1 ? "s" : ""} -{" "}
                  {offer.left} left
                </p>

                {/* Combined Voting Progress Bars - Now with larger h-3 */}
                <div className="space-y-4">
                  {" "}
                  {/* Increased spacing between bars */}
                  {/* Accept Section */}
                  <div
                    className={`space-y-2 group ${
                      editable ? "cursor-pointer" : "cursor-default"
                    }`}
                    onClick={() =>
                      editable && handleVote(offer.contractID, true)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-sm font-medium ${
                          offer.agreed === true
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        {offer.agreed === true ? "✓ Accepted" : "Accept"}
                      </p>
                      <span className="text-sm text-gray-500">
                        {offer.accepted} vote{offer.accepted !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 relative transition-all duration-200">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
                          offer.agreed === true
                            ? "bg-green-600"
                            : "bg-green-400 group-hover:bg-green-500"
                        }`}
                        style={{ width: `${acceptedPercent}%` }}
                      ></div>
                    </div>
                  </div>
                  {/* Reject Section */}
                  <div
                    className={`space-y-2 group ${
                      editable ? "cursor-pointer" : "cursor-default"
                    }`}
                    onClick={() =>
                      editable && handleVote(offer.contractID, false)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-sm font-medium ${
                          offer.agreed === false
                            ? "text-red-700"
                            : "text-gray-600"
                        }`}
                      >
                        {offer.agreed === false ? "✗ Rejected" : "Reject"}
                      </p>
                      <span className="text-sm text-gray-500">
                        {offer.rejected} vote{offer.rejected !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 relative transition-all duration-200">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
                          offer.agreed === false
                            ? "bg-red-600"
                            : "bg-red-400 group-hover:bg-red-500"
                        }`}
                        style={{ width: `${rejectedPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Show current vote status if voted */}
                {offer.agreed !== null && (
                  <p className="text-xs text-center mt-2">
                    Your current vote:{" "}
                    <span
                      className={`font-semibold ${
                        offer.agreed ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {offer.agreed ? "Accept" : "Reject"}
                    </span>{" "}
                    (click to change)
                  </p>
                )}
              </div>
            </div>
          );
        })}
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

      {/* Modal for Vote Details */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md z-50">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Vote Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {/* Tabs */}
              <div className="flex border-b mb-4">
                {(["accepted", "rejected", "remaining"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-center py-2 ${
                      activeTab === tab
                        ? "border-b-2 border-blue-500 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              {/* Tab Content */}
              <div className="max-h-60 overflow-y-auto">
                {votesLoading && (
                  <p className="text-center text-gray-500">Loading votes...</p>
                )}
                {votesError && (
                  <p className="text-center text-red-600">
                    {votesErrorMessage instanceof Error
                      ? votesErrorMessage.message
                      : "Error loading votes"}
                  </p>
                )}
                {voteDetails && !votesLoading && !votesError && (
                  <ul className="space-y-2">
                    {voteDetails[activeTab].length === 0 ? (
                      <li className="text-center text-gray-500">
                        No votes in this category.
                      </li>
                    ) : (
                      voteDetails[activeTab].map((voter, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <img
                            src={voter.freelancerProfilePicture}
                            alt={voter.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium">{voter.name}</p>
                            <p className="text-xs text-gray-500">
                              {voter.position}
                            </p>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
