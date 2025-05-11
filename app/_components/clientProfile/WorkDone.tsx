"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "../common/Pagination";
import { getClientWorkDone, WorkDoneResponse } from "@/app/_lib/Client/Profile";
import Cookies from "js-cookie";

interface WorkHistoryProps {
  id: string;
}

export default function WorkHistory({ id }: WorkHistoryProps) {
  const [data, setData] = useState<WorkDoneResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 10;

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getClientWorkDone(
          id,
          currentPage - 1,
          pageSize,
          token
        );

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    };
    fetchData();
  }, [id, currentPage, token]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error)
    return (
      <div className="p-6 bg-[var(--foreground-color)] rounded-lg ">
        {error}
      </div>
    );
  if (!data) return;

  const jobsToDisplay = data.content.map((job) => {
    // Calculate budget as pricePerHour * totalHours if totalHours is provided, otherwise use rate
    const budget = job.totalHours
      ? (job.pricePerHour * job.totalHours).toFixed(2)
      : job.pricePerHour.toFixed(2);
    // Generate star rating string based on rating (default to 5 if not provided)
    const ratingStars =
      "★".repeat(job.rate ?? 5) + "☆".repeat(5 - (job.rate ?? 5));

    return (
      <div
        key={job.jobId}
        className="p-4 bg-[var(--foreground-color)] rounded-lg mb-4"
      >
        <h3 className="text-lg font-semibold mb-2">{job.jobName}</h3>
        <div className="flex justify-between items-start">
          <div className="text-right">
            <p className="text-gray-800 font-semibold">${budget} Budget</p>
          </div>
        </div>
        <div className="mt-2">
          <p>Freelancer response: {ratingStars}</p>
          <p>
            Great to work with John provided clear instructions and was
            responsive throughout the project.
          </p>
        </div>

        <hr className="my-4 border-[var(--border-color)]" />
      </div>
    );
  });

  return (
    <div className="p-6 bg-[var(--foreground-color)] rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Work History</h2>
      {jobsToDisplay}
      <Pagination
        currentPage={currentPage}
        totalCount={data.totalElements}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        setPageParamter={true}
      />
    </div>
  );
}
