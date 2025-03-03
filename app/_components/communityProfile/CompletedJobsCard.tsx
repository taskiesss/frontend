import React from "react";
import StarRating from "../common/StarRating";
import Link from "next/link";

export default function CompletedJobsCard({
  job,
}: {
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
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-extrabold">
          <Link
            href={`/nx/freelancer/find-work/${job.jobId}`}
            className="text-[var(--accent-color)] hover:underline hover:text-[var(--hover-color)]"
          >
            {job.jobName}
          </Link>
        </h2>
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
