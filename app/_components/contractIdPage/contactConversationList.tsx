"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ContractConversationCard from "./ContractConversationCard";
import { Pagination } from "../common/Pagination";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ContractConversation {
  convoId: string;
  convoOwner: {
    profilePicture: string;
    name: string;
    role: string;
    id: string;
  };
  content: string;
  date: string;
}

interface ContractConversationsResponse {
  content: ContractConversation[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

async function fetchContractConversations(
  contractId: string,
  token: string | undefined,
  page: number = 0,
  size: number = 10
): Promise<ContractConversationsResponse> {
  console.log("Token:", token);
  console.log("contr", contractId);

  const res = await fetch(
    `${BASE_URL}/contracts/${contractId}/contract-conversations?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch contract conversations");
  }

  return res.json();
}

export default function ContractConversationsList({
  contractId,
}: {
  contractId: string;
}) {
  const searchParams = useSearchParams();
  const token = Cookies.get("token");

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const PAGE_SIZE = 5; // Change this as needed

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contractConversations", contractId, pageFromUrl],
    queryFn: () =>
      fetchContractConversations(contractId, token, pageFromUrl - 1, PAGE_SIZE), // API uses zero-based index
  });

  const handlePageChange = (newPage: number) => {
    // No need to refetch manually, react-query will do it via queryKey change
  };

  if (isLoading) {
    return <div className="text-center py-6">Loading conversations...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-6 text-red-500">
        {(error as Error).message || "An error occurred"}
      </div>
    );
  }

  if (!data || data.empty) {
    return <div className="text-center py-6 ">No conversations yet.</div>;
  }

  const totalCount = data.totalElements;
  const currentPage = pageFromUrl;

  return (
    <div className="space-y-4">
      {/* Conversations List */}
      {data.content.map((convo) => (
        <ContractConversationCard key={convo.convoId} {...convo} />
      ))}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
        siblingCount={1}
        setPageParamter={false}
      />
    </div>
  );
}
