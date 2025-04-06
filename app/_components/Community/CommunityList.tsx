"use client";
import { CommunityResponse } from "@/app/_types/CommunitySearch";
import { useState } from "react";
import { Pagination } from "../common/Pagination";
import CommunityCard from "./CommunityCard";

interface Props {
  communities: {
    content: CommunityResponse[];
    totalElements: number;
    size: number;
    number: number;
  };
}

// await new Promise((resolve) => setTimeout(resolve, 5000));

export default function CommunityList({ communities }: Props) {
  const [currentPage, setCurrentPage] = useState(communities.number + 1);

  return (
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
            currentPage={communities.number + 1}
            totalCount={communities.totalElements}
            pageSize={communities.size}
            onPageChange={setCurrentPage}
            siblingCount={0}
          />
        </div>
      </div>
    </div>
  );
}
