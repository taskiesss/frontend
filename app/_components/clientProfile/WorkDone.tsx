"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "../common/Pagination";
import { getClientWorkDone, WorkDoneResponse } from "@/app/_lib/Client/Profile";
import Cookies from "js-cookie";
import StarRating from "../common/StarRating";
import Link from "next/link";

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
      <div className="flex flex-col mb-5" key={job.jobId}>
        <div className="flex flex-col gap-2">
          <Link href={`/nx/client/job-details/${job.jobId}`}>
            <h2 className="text-xl text-[var(--accent-color)] font-extrabold hover:underline hover:text-[var(--hover-color)]">
              {job.jobName}
            </h2>
          </Link>
          <div className="pointer-events-none">
            <StarRating
              size={18}
              defaultRating={job.rate}
              color="#FFC107"
              className="text-lg"
              allowHalf={true}
            />
          </div>
          <div className="flex gap-4 text-md font-extralight">
            <span>${job.pricePerHour}/hour</span>
            <span>{job.totalHours} hours</span>
          </div>
        </div>
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
