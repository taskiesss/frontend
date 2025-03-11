"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Cookies from "js-cookie";

import {
  acceptOrRejectJoinRequest,
  getCommunityJoinRequests,
} from "@/app/_lib/CommunityProfile/board";
import { Pagination } from "../common/Pagination";

interface TalentRequestProps {
  editable: boolean;
  communityId: string;
}

export default function TalentRequest({
  communityId,

  editable,
}: TalentRequestProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const size = 10;
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  // Fetch join requests using React Query
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["communityJoinRequests", communityId, currentPage, size],
    queryFn: () =>
      getCommunityJoinRequests(communityId, token, currentPage - 1, size),
    placeholderData: () => {
      const prevPage = currentPage - 1;
      if (prevPage >= 1) {
        return queryClient.getQueryData([
          "communityJoinRequests",
          communityId,
          prevPage,
          size,
        ]);
      }
      return undefined;
    },
    staleTime: 0, // Data is considered stale immediately, refetch on focus or interval if needed
  });

  // Mutation to accept or reject a join request
  const mutation = useMutation({
    mutationFn: (request: {
      freelancerId: string;
      positionName: string;
      choice: "accept" | "reject";
    }) => acceptOrRejectJoinRequest(communityId, request, token),
    onSuccess: () => {
      // Invalidate query to refresh the join requests list after an action
      queryClient.invalidateQueries({
        queryKey: ["communityJoinRequests", communityId],
      });
    },
  });

  // Handler for approve/reject actions
  const handleAction = (
    freelancerId: string,
    positionName: string,
    choice: "accept" | "reject"
  ) => {
    mutation.mutate({ freelancerId, positionName, choice });
  };

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (errorMessage === "Forbidden" || errorMessage === "Unauthorized user") {
      return (
        <div>You are not allowed to perform this action. Please log in.</div>
      );
    }
    return <div>Error loading join requests: {errorMessage}</div>;
  }

  if (isLoading && !data) {
    return <div>Loading join requests...</div>;
  }

  if (!data?.content?.length) {
    return <div>No join requests available.</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold mb-6">Talent Requests</h2>
      <div>
        {data.content.map((request: any) => (
          <div
            key={request.freelancerID}
            className="flex items-center gap-2 p-2"
          >
            <img
              src={request.profilePicture}
              alt={`${request.name}'s profile`}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="">{request.name}</p>
              <p>Requested to join your community</p>
            </div>
            {editable && (
              <>
                <button
                  onClick={() =>
                    handleAction(
                      request.freelancerID,
                      request.positionName,
                      "accept"
                    )
                  }
                  className="px-4 py-2 border-2 border-solid border-green-600 text-[var(--accent-color)] rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleAction(
                      request.freelancerID,
                      request.positionName,
                      "reject"
                    )
                  }
                  className="px-4 py-2 border-2 border-solid border-red-500 text-[var(--accent-color)] rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalCount={data.totalElements}
          pageSize={size}
          onPageChange={setCurrentPage}
          siblingCount={0}
          setPageParamter={true}
        />
      </div>
    </div>
  );
}
