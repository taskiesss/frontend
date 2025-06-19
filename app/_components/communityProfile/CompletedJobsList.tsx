/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Pagination } from "../common/Pagination";
import CompletedJobsCard from "./CompletedJobsCard";
import ProtectedPage from "../common/ProtectedPage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getCommunityWorkDone } from "@/app/_lib/CommunityProfile/APi";

interface CompletedJobslistProps {
  role?: string;
  id: string;
}

export default function CompletedJobslist({
  id,
  role,
}: CompletedJobslistProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const size = 3;

  // Get the query client instance
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const { data, isError, error } = useQuery({
    queryKey: ["workDoneCommunity", id, currentPage, size],
    queryFn: () => getCommunityWorkDone(id, currentPage - 1, size, token),
    placeholderData: () => {
      // Calculate the previous page number
      const prevPage = currentPage - 1;
      // Only try to get previous data if prevPage is valid (i.e., >= 1)
      if (prevPage >= 1) {
        // Attempt to retrieve the cached data for the previous page
        return queryClient.getQueryData([
          "workDoneCommunity",
          id,
          prevPage,
          size,
        ]);
      }
      // If there's no previous page (e.g., on page 1), return undefined
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isError) {
    // Simulate the catch block logic
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (errorMessage === "Forbidden" || errorMessage === "Unauthorized user") {
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in" />
      );
    }
    // Fallback for other errors
    return <div>Error loading jobs list: {errorMessage}</div>;
  }
  console.log("current page", data);

  if (!data) return;
  return (
    <>
      <div className="grid grid-cols-2 grid-flow-row gap-5 flex-wrap justify-between bg-[--foreground-color] rounded-lg p-4">
        {data.content.map((j: any, i: number) => (
          <CompletedJobsCard key={i} job={j} role={role} />
        ))}
      </div>
      <div className="">
        <Pagination
          currentPage={currentPage}
          totalCount={data.totalElements}
          pageSize={data.size}
          onPageChange={setCurrentPage}
          siblingCount={0}
          setPageParamter={true}
        />
      </div>
    </>
  );
}
