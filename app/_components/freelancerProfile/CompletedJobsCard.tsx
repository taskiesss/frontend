import React from "react";
import StarRating from "../common/StarRating";
import Link from "next/link";

export default function CompletedJobsCard({
  role,
  job,
}: {
  role?: string;
  job: {
    jobId: string;
    jobName: string;
    rate: number;
    pricePerHour: number;
    totalHours: number;
  };
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <Link
          href={
            role === "client"
              ? `/nx/client/job-details/${job.jobId}`
              : `/nx/freelancer/find-work/${job.jobId}`
          }
        >
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
          />
        </div>
        <div className="flex gap-4 text-md font-extralight">
          <span>${job.pricePerHour}/hour</span>
          <span>{job.totalHours} hours</span>
        </div>
      </div>
    </div>
  );
}
