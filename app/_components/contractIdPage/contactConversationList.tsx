"use client";

import { useQuery } from "@tanstack/react-query";
import ContractConversationCard from "./ContractConversationCard";
import { Pagination } from "../common/Pagination";
import Cookies from "js-cookie";
import { getContractConversations } from "@/app/_lib/ContractsAPi/contractConversationsApi";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// const fakeContractConversations = {
//   content: [
//     {
//       convoId: "conv-001",
//       content: "Hey, are we still on for tomorrow?",
//       date: new Date().toISOString(),
//       convoOwner: {
//         profilePicture:
//           "https://res.cloudinary.com/dhfb7i5h1/image/upload/v1740614334/freelancers_profile_pictures/ii1qf658zpi5f2tiwhby.png",
//         name: "John Doe",
//         role: "CLIENT",
//         id: "user-001",
//       },
//     },
//     {
//       convoId: "conv-002",
//       content: "Yes, I'll send over the files shortly.",
//       date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
//       convoOwner: {
//         profilePicture:
//           "https://res.cloudinary.com/dhfb7i5h1/image/upload/v1740614334/freelancers_profile_pictures/ii1qf658zpi5f2tiwhby.png",
//         name: "Jane Smith",
//         role: "FREELANCER",
//         id: "user-002",
//       },
//     },
//     {
//       convoId: "conv-003",
//       content: "Awesome, looking forward to it!",
//       date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
//       convoOwner: {
//         profilePicture:
//           "https://res.cloudinary.com/dhfb7i5h1/image/upload/v1740614334/freelancers_profile_pictures/ii1qf658zpi5f2tiwhby.png",
//         name: "John Doe",
//         role: "CLIENT",
//         id: "user-001",
//       },
//     },
//     {
//       convoId: "conv-004",
//       content: "Let me know if anything comes up.",
//       date: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
//       convoOwner: {
//         profilePicture:
//           "https://res.cloudinary.com/dhfb7i5h1/image/upload/v1740614334/freelancers_profile_pictures/ii1qf658zpi5f2tiwhby.png",
//         name: "Jane Smith",
//         role: "FREELANCER",
//         id: "user-002",
//       },
//     },
//     {
//       convoId: "conv-005",
//       content: "All set on my end.",
//       date: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
//       convoOwner: {
//         profilePicture:
//           "https://res.cloudinary.com/dhfb7i5h1/image/upload/v1740614334/freelancers_profile_pictures/ii1qf658zpi5f2tiwhby.png",
//         name: "John Doe",
//         role: "CLIENT",
//         id: "user-001",
//       },
//     },
//     {
//       convoId: "conv-006",
//       content: "All set on my end.",
//       date: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
//       convoOwner: {
//         profilePicture:
//           "https://res.cloudinary.com/dhfb7i5h1/image/upload/v1740614334/freelancers_profile_pictures/ii1qf658zpi5f2tiwhby.png",
//         name: "John Doe",
//         role: "CLIENT",
//         id: "user-001",
//       },
//     },
//   ],
//   pageable: {
//     pageNumber: 0,
//     pageSize: 5,
//     sort: {
//       empty: true,
//       unsorted: true,
//       sorted: false,
//     },
//     offset: 0,
//     unpaged: false,
//     paged: true,
//   },
//   last: false,
//   totalElements: 6,
//   totalPages: 3,
//   size: 5,
//   number: 0,
//   numberOfElements: 5,
//   first: true,
//   empty: false,
// };

export default function ContractConversationsList({
  contractId,
  isVisible,
  role,
}: {
  contractId: string;
  isVisible: boolean;
  role?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current page from URL params, default to 1
  const pageFromUrl = parseInt(searchParams?.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  // Sync state with URL params
  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  const token = Cookies.get("token");
  const PAGE_SIZE = 5;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contractConversations", contractId, currentPage],
    queryFn: () =>
      getContractConversations(contractId, token, currentPage - 1, PAGE_SIZE),
  });

  const handlePageChange = (page: number, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setCurrentPage(page);

    // Method 1: Using router.replace instead of router.push
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`, { scroll: false });

    // Method 2: Alternative using window.history (uncomment if router.replace doesn't work)
    // const url = new URL(window.location.href);
    // url.searchParams.set("page", page.toString());
    // window.history.replaceState({}, "", url.toString());
  };

  if (!isVisible) return null;

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
  //   if (!data || data.empty) {
  //     return <div className="text-center py-6">No conversations yet</div>;
  //   }

  return (
    <div className="flex flex-col gap-7">
      <h2 className="text-2xl font-semibold">Posts</h2>
      <div className="space-y-4 bg-[var(--foreground-color)] p-4 rounded-xl">
        {/* Conversations List */}

        {data?.content.length > 0 ? (
          data.content.map((convo) => (
            <ContractConversationCard
              key={convo.convoId}
              convo={convo}
              role={role}
            />
          ))
        ) : (
          <div className="text-center py-6">
            No conversations yet. Start a conversation with your{" "}
            {role === "client" ? "freelancer" : "client"}.
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalCount={data.totalElements}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
          siblingCount={1}
          setPageParamter={false}
        />
      </div>
    </div>
  );
}
