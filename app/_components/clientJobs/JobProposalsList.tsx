"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className="flex flex-col gap-4 w-full px-7 py-5">
        {/* Job Rows */}
        {jobs.map((job) => (
          <div
            key={job.jobId}
            className="grid grid-cols-[1.5fr_1.2fr_0.5fr] gap-x-4 border-b border-[var(--border-color)] py-4"
          >
            {/* Column 1: Job Name + Posted Date */}
            <div className="flex flex-col">
              <Link
                href={`/nx/client/job-details/${job.jobId}`}
                className="text-lg font-semibold truncate hover:text-[var(--hover-color)] transition-colors duration-200 w-fit"
              >
                {job.jobName}
              </Link>
              <span className="text-sm">
                Posted on {formatDate(job.postedAt)}
              </span>
            </div>

            {/* Column 2: Proposals + Hired */}
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">
                  {job.proposals || 0}
                </span>
                <span className="text-sm">Proposals</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">{job.hired}</span>
                <span className="text-sm">Hired</span>
              </div>
            </div>

            {/* Column 3: Action Button */}
            <div className="flex items-center justify-end">
              <button
                className="px-5 py-2 bg-[var(--btn-color)] rounded-md hover:bg-[var(--button-hover-background-color)] whitespace-nowrap"
                onClick={() =>
                  router.push(`/nx/client/all-jobs/${job.jobId}/proposals`)
                }
              >
                View proposals
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
