/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "../common/Pagination";
import PDFPreviewAuto from "./SinglePdfReviewer";
import { getPortfoliosbyID } from "@/app/_lib/FreelancerProfile/APi";
import Cookies from "js-cookie";
import ProtectedPage from "../common/ProtectedPage";

interface PortfolioProps {
  id: string;
}

export default function Portfolio({ id }: PortfolioProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const size = 3;

  // Get the query client instance
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const { data, isError, error } = useQuery({
    queryKey: ["portfolios", id, currentPage, size],
    queryFn: () => getPortfoliosbyID(id, currentPage - 1, size, token),
    placeholderData: () => {
      // Calculate the previous page number
      const prevPage = currentPage - 1;
      // Only try to get previous data if prevPage is valid (i.e., >= 1)
      if (prevPage >= 1) {
        // Attempt to retrieve the cached data for the previous page
        return queryClient.getQueryData(["portfolios", id, prevPage, size]);
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
    return <div>Error loading portfolios: {errorMessage}</div>;
  }

  if (!data) return;

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 flex-wrap">
        {data.content.map((p: any, i: number) => (
          <PDFPreviewAuto
            key={i}
            fileUrl={p.portfolioPdf}
            ProjectName={p.name}
          />
        ))}
      </div>
      <div className="self-center">
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
