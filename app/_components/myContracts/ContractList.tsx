"use client";
import React, { useState } from "react";
import ContractCard from "./ContractCard";
import { Pagination } from "../common/Pagination";
import { useParams, usePathname } from "next/navigation";

type Props = {
  contracts: {
    content: {
      contractID: string;
      jobID: string;
      jobTitle: string;
      clientName: string;
      clientID: string;
      contractStatus: "ACTIVE" | "ENDED";
      budget: number;
      activeMilestone: string;
      clientRateForFreelancer?: number;
      startDate: string;
      dueDate?: string;
      endDate?: string;
    }[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
};
type RouteParams = {
  id?: string; // Make id optional if it might not always be present
};
export default function ContractList({ contracts }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams<RouteParams>();
  const pathname = usePathname();
  const { id } = params || {};
  return (
    <>
      {contracts.content.map((c, i) => (
        <ContractCard
          communityid={id || ""}
          pathname={pathname || ""}
          key={i}
          contract={c}
        />
      ))}
      <div className="self-center">
        <Pagination
          currentPage={currentPage}
          totalCount={contracts.totalElements}
          pageSize={contracts.size}
          onPageChange={setCurrentPage}
          siblingCount={0}
          setPageParamter={false}
        />
      </div>
    </>
  );
}
