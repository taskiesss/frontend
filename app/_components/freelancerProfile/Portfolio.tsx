/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "../common/Pagination";
import PDFPreviewAuto from "./SinglePdfReviewer"; // Original import path (ensure it points to your PDFPreviewAuto component)
import {
  getPortfoliosbyID,
  DeletePortfolioAction,
} from "@/app/_lib/FreelancerProfile/APi";
import Cookies from "js-cookie";
import ProtectedPage from "../common/ProtectedPage";

interface PortfolioProps {
  id: string;
}

export default function Portfolio({ id }: PortfolioProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const size = 3;
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  // Fetch portfolios using React Query
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["portfolios", id, currentPage, size],
    queryFn: () => getPortfoliosbyID(id, currentPage - 1, size, token),
    placeholderData: () => {
      const prevPage = currentPage - 1;
      if (prevPage >= 1) {
        return queryClient.getQueryData(["portfolios", id, prevPage, size]);
      }
      return undefined;
    },
    staleTime: 0,
  });

  // Mutation to delete a portfolio
  const mutation = useMutation({
    mutationFn: (fileUrl: string) => DeletePortfolioAction(fileUrl, token),
    onSuccess: () => {
      // Invalidate query to refresh the portfolio list after deletion
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });

  // Handler for remove button click
  const handleRemove = (fileUrl: string) => {
    mutation.mutate(fileUrl);
  };

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (errorMessage === "Forbidden" || errorMessage === "Unauthorized user") {
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in" />
      );
    }
    return <div>Error loading portfolios: {errorMessage}</div>;
  }

  if (isLoading && !data) {
    return <div>Loading portfolios...</div>;
  }

  if (!data?.content?.length) {
    return <div>No portfolios available.</div>;
  }

  return (
    <>
      <div className="flex gap-2">
        {data.content.map((p: any, i: number) => (
          <PDFPreviewAuto
            key={i}
            fileUrl={p.portfolioPdf}
            ProjectName={p.name}
            onRemove={() => handleRemove(p.portfolioPdf)}
          />
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
    </>
  );
}
