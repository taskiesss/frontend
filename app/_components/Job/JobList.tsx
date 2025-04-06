"use client";
import React, { useState } from "react";
import JobCard from "./JobCard";
import { Pagination } from "../common/Pagination";
import Container from "../common/Container";

interface Job {
  id: string;
  title: string;
  description: string;
  experienceLevel: string;
  skills: string[];
  pricePerHour: number;
  postedDate: string;
  projectLength: string;
  rate: number;
  isSaved: boolean;
}

interface Props {
  jobs: {
    content: Job[];
    totalElements: number;
    size: number;
    number: number;
  };
}

// await new Promise((resolve) => setTimeout(resolve, 5000));

export default function JobList({ jobs }: Props) {
  const [currentPage, setCurrentPage] = useState(jobs.number + 1);
  console.log(jobs);
  return (
    <div className=" w-full flex flex-col gap-8 justify-start ">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <div className="flex flex-col justify-between">
        <section className="row-start-3 col-start-2 w-full flex flex-col gap-6">
          {jobs.content.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
        <div className="self-center ">
          <Pagination
            currentPage={jobs.number + 1}
            totalCount={jobs.totalElements}
            pageSize={jobs.size}
            onPageChange={setCurrentPage}
            siblingCount={0}
          />
        </div>
      </div>
    </div>
  );
}
