"use client";
import { useState } from "react";
import Container from "../common/Container";
import { Pagination } from "../common/Pagination";
import FreelancerCard from "./FreelancerCard";
import { FreelancerResponse } from "@/app/_types/FreelancerSearch"; // Adjust the path as needed

interface Props {
  freelancers: {
    content: FreelancerResponse[];
    totalElements: number;
    size: number;
  };
}

export default function FreelancerList({ freelancers }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Container className="w-full px-3 sm:px-5 lg:px-7 xl:px-16">
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
              currentPage={currentPage}
              totalCount={freelancers.totalElements}
              pageSize={freelancers.size}
              onPageChange={setCurrentPage}
              siblingCount={0}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
