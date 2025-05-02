"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Job {
  jobName: string;
  jobId: string;
  postedAt: string;
  proposals: number;
  hired: number;
  contractId: string;
}

interface JobsListProps {
  jobs: Job[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full">
      {jobs.map((job) => (
        <div
          key={job.jobId}
          className="flex items-center justify-between border-b border-[var(--border-color)] py-4"
        >
          {/* Left Section */}
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{job.jobName}</span>
            <span className="text-sm text-gray-600">
              {formatDate(job.postedAt)}
            </span>
          </div>

          {/* Metrics Section */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-lg">{job.proposals}</span>
              <span className="text-sm text-gray-600">Proposals</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-lg">{job.hired}</span>
              <span className="text-sm text-gray-600">Hired</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => router.push(`nx/client/proposals/${job.jobId}`)}
          >
            View proposals
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobsList;
