"use client";
import { CommunityResponse } from "@/app/_types/CommunitySearch";
import { useState } from "react";
import Container from "../common/Container";
import { Pagination } from "../common/Pagination";
import CommunityCard from "./CommunityCard";

interface Props {
  communities: {
    content: CommunityResponse[];
    totalElements: number;
    size: number;
  };
}

// await new Promise((resolve) => setTimeout(resolve, 5000));

export default function CommunityList({ communities }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Container className=" w-full px-3 sm:px-5 lg:px-7 xl:px-16">
      <div className=" w-full flex flex-col gap-8 justify-start  ">
        <h1 className="text-3xl font-bold mb-6">Community Listings</h1>
        <div className="flex flex-col justify-between">
          <section className="row-start-3 col-start-2 w-full flex flex-col gap-6">
            {communities.content.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </section>
          <div className="self-center ">
            <Pagination
              currentPage={currentPage}
              totalCount={communities.totalElements}
              pageSize={communities.size}
              onPageChange={setCurrentPage}
              siblingCount={0}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
