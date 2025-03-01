"use client";
import React, { useState } from "react";
import { Pagination } from "../common/Pagination";
import { ContractMilestones } from "@/app/_types/ContractDetailsResponse";

type Props = { milestones: ContractMilestones };

function ContractPagination({ milestones }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  // Handle page change with an event handler if Pagination uses an event
  const handlePageChange = (page: number, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault(); // Prevent default browser behavior (e.g., if Pagination uses a link or button)
    }
    setCurrentPage(page);
    // Optionally, you can call an API or update state here to fetch new data for the selected page
  };

  return (
    <div className="self-center">
      <Pagination
        currentPage={currentPage}
        totalCount={milestones.totalElements}
        pageSize={milestones.size}
        onPageChange={(page: number, event?: React.MouseEvent) =>
          handlePageChange(page, event)
        }
      />
    </div>
  );
}

export default ContractPagination;
