"use client";
import React, { useState } from "react";
import ContractCard from "./ContractCard";
import { Pagination } from "../common/Pagination";

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
      clientRateForFreelancer: number;
      startDate: string;
      dueDate: string;
      endDate: string;
    }[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
};

export default function ContractList({ contracts }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="w-4/5 bg-[var(--foreground-color)] rounded-lg shadow-sm border border-gray-600 p-4 flex flex-col">
      {contracts.content.map((c, i) => (
        <ContractCard key={i} contract={c} />
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
    </div>
  );
}
