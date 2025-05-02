"use client";

import React from "react";

import { Pagination } from "@/app/_components/common/Pagination";
import { useRouter } from "next/navigation";
import JobsList from "./JobProposalsList";

interface JobsAndPaginationProps {
  jobs: {
    jobName: string;
    jobId: string;
    postedAt: string;
    proposals: number;
    hired: number;
    contractId: string;
  }[];
  role?: string;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
}

const JobsAndPagination: React.FC<JobsAndPaginationProps> = ({
  jobs,
  currentPage,
  pageSize,
  totalElements,
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          <JobsList jobs={jobs} />
          <Pagination
            currentPage={currentPage}
            totalCount={totalElements}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            setPageParamter={true}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <span className="self-center text-2xl">
            There are no job posts yet
          </span>
        </div>
      )}
    </div>
  );
};

export default JobsAndPagination;
