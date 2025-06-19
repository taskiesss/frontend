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
import Image from "next/image";
import Link from "next/link";

interface TalentRequestProps {
  editable: boolean;
  communityId: string;
}

export default function TalentRequests({
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
    staleTime: 0,
  });

  console.log(data);

  // Mutation to accept or reject a join request
  const mutation = useMutation({
    mutationFn: (request: {
      freelancerId: string;
      positionName: string;
      choice: "accept" | "reject";
    }) => acceptOrRejectJoinRequest(communityId, request, token),
    onSuccess: () => {
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

  // Define a fallback image URL or null
  const fallbackImage = "/images/userprofile.jpg";

  return (
    <div className="flex flex-col gap-6 w-full pb-4">
      <h2 className="text-3xl font-bold pt-2">Talent Requests</h2>
      <div className=" w-full flex flex-col gap-6 bg-[--foreground-color] rounded-lg py-6 px-4">
        {data.content.map((request: any) => (
          <div key={request.freelancerID} className="flex items-center gap-5">
            <Link href={`/nx/freelancer/profile/${request.freelancerID}`}>
              <div className="relative w-12 aspect-square">
                <Image
                  src={request.profilePicture || fallbackImage}
                  alt={`${request.name}'s profile`}
                  className="rounded-full object-cover"
                  fill
                  sizes="3rem"
                />
              </div>
            </Link>

            <div>
              <Link
                href={`/nx/freelancer/profile/${request.freelancerID} `}
                className="hover:text-[var(--button-hover-background-color)] hover:underline transition-colors"
              >
                <p className="font-bold text-xl">{request.name}</p>
              </Link>
              <p>
                Requested to join your community as{" "}
                <span className="font-bold text-xl text-[var(--accent-color)]">
                  {request.positionName}
                </span>
              </p>
            </div>
            {editable && (
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    handleAction(
                      request.freelancerID,
                      request.positionName,
                      "accept"
                    )
                  }
                  className="w-28 px-4 py-2 border-2 border-solid border-green-600 text-[var(--accent-color)] rounded hover:bg-green-600 transition-colors"
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
                  className="w-28 px-4 py-2 border-2 border-solid border-red-500 text-[var(--accent-color)] rounded hover:bg-red-600 transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={data.totalElements}
        pageSize={size}
        onPageChange={setCurrentPage}
        siblingCount={0}
        setPageParamter={true}
      />
    </div>
  );
}
