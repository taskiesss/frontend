"use client";
import { useState } from "react";
import { Pagination } from "../common/Pagination";
import CompletedJobsCard from "./CompletedJobsCard";

const jobs = {
  content: [
    {
      jobId: "string",
      jobName: "E-commerce Website",
      rate: 5,
      pricePerHour: 10,
      totalHours: 80,
    },
    {
      jobId: "string",
      jobName: "E-commerce Website",
      rate: 5,
      pricePerHour: 10,
      totalHours: 80,
    },
    {
      jobId: "string",
      jobName: "Shopify Website",
      rate: 5,
      pricePerHour: 10,
      totalHours: 80,
    },
    {
      jobId: "string",
      jobName: "Shopify Website",
      rate: 5,
      pricePerHour: 10,
      totalHours: 80,
    },
  ],
  pageable: {
    sort: {
      unsorted: true,
      sorted: true,
      empty: true,
    },
    pageNumber: 0,
    pageSize: 0,
    offset: 0,
    unpaged: true,
  },
  totalElements: 10,
  totalPages: 0,
  size: 5,
  number: 0,
};

export default function CompletedJobslist() {
  const [currentPage, setCurrentPage] = useState(1);
  console.log("current page", currentPage);
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col  gap-9 flex-wrap">
        {jobs.content.map((j, i) => (
          <CompletedJobsCard key={i} job={j} />
        ))}
      </div>
      <div className="flex self-center">
        <Pagination
          currentPage={currentPage}
          totalCount={jobs.totalElements}
          pageSize={jobs.size}
          onPageChange={setCurrentPage}
          siblingCount={0}
          setPageParamter={true}
        />
      </div>
    </div>
  );
}
