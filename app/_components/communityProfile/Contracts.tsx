/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import ContractList from "../myContracts/ContractList";
import { getCommunityActiveContracts } from "@/app/_lib/CommunityProfile/board";
import Cookies from "js-cookie";
import { useState } from "react";

interface Props {
  communityId: string;
}

export default function Contracts({ communityId }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const size = 10;
  const queryClient = useQueryClient();
  const token = Cookies.get("token");
  // Fetch join requests using React Query
  const { data, isError, error } = useQuery({
    queryKey: ["communityContracts", communityId, currentPage, size],
    queryFn: () =>
      getCommunityActiveContracts(communityId, token, currentPage - 1, size),
    placeholderData: () => {
      const prevPage = currentPage - 1;
      if (prevPage >= 1) {
        return queryClient.getQueryData([
          "communityContracts",
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

  if (!data?.content?.length) {
    return <div>No join requests available.</div>;
  }

  return (
    <div className="w-full flex flex-col gap-7">
      <h2 className="text-3xl font-bold pt-2">Current Job Contracts</h2>
      <div className="w-full flex items-start pb-4">
        {data.content.length > 0 ? (
          <ContractList contracts={data} />
        ) : (
          <div className="flex flex-col">
            <span className="self-center text-2xl">
              There are no contracts yet
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
