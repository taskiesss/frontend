"use client";
import { FreelancerResponse } from "@/app/_types/FreelancerSearch"; // Adjust the path as needed
import { useState } from "react";
import { Pagination } from "../common/Pagination";
import FreelancerCard from "./FreelancerCard";

interface Props {
  freelancers: {
    content: FreelancerResponse[];
    totalElements: number;
    size: number;
    number: number;
  };
}

export default function FreelancerList({ freelancers }: Props) {
  const [currentPage, setCurrentPage] = useState(freelancers.number + 1);

  return (
    <div className="w-full flex flex-col gap-8 justify-start">
      <h1 className="text-3xl font-bold mb-6">Freelancer Listings</h1>
      <div className="flex flex-col justify-between">
        <section className="w-full flex flex-col gap-6">
          {freelancers.content.map((freelancer) => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} />
          ))}
        </section>
        <div className="self-center">
          <Pagination
            currentPage={freelancers.number + 1}
            totalCount={freelancers.totalElements}
            pageSize={freelancers.size}
            onPageChange={setCurrentPage}
            siblingCount={0}
          />
        </div>
      </div>
    </div>
  );
}
