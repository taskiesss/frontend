/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Pagination } from "../common/Pagination";
import CompletedJobsCard from "./CompletedJobsCard";
import ProtectedPage from "../common/ProtectedPage";
import { getWorkDonebyID } from "@/app/_lib/FreelancerProfile/APi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

interface CompletedJobslistProps {
  id: string;
}

export default function CompletedJobslist({ id }: CompletedJobslistProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const size = 3;

  // Get the query client instance
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const { data, isError, error } = useQuery({
    queryKey: ["workDone", id, currentPage, size],
    queryFn: () => getWorkDonebyID(id, currentPage - 1, size, token),
    placeholderData: () => {
      // Calculate the previous page number
      const prevPage = currentPage - 1;
      // Only try to get previous data if prevPage is valid (i.e., >= 1)
      if (prevPage >= 1) {
        // Attempt to retrieve the cached data for the previous page
        return queryClient.getQueryData(["workDone", id, prevPage, size]);
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
      <div className="flex flex-col  gap-9 flex-wrap">
        {data.content.map((j: any, i: number) => (
          <CompletedJobsCard key={i} job={j} />
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
