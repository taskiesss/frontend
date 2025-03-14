"use client";
import { getMilestones } from "@/app/_lib/ContractsAPi/contractAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import { Pagination } from "../common/Pagination";
import ProtectedPage from "../common/ProtectedPage";
import MilestonesTable from "./MilestonesTable";

type Props = { contractId: string; role?: string; isAdmin: boolean };

//   content: [
//     {
//       title: "Initial Design Mockups",
//       description:
//         "Create wireframes and design mockups for the contract management page, including layout sketches and low-fidelity prototypes for desktop and mobile views.",
//       expectedHours: 30,
//       dueDate: "2025-03-03",
//       status: "in_progress",
//       milestoneId: "milestone_001",
//     },
//     {
//       title: "UI Design for Mobile App",
//       description:
//         "Design high-fidelity UI screens for the mobile version of the Taskaya application, focusing on user profiles, job listings, and contract details.",
//       expectedHours: 40,
//       dueDate: "2025-03-01",
//       status: "approved",
//       milestoneId: "milestone_002",
//     },
//     {
//       title: "Review UI Prototypes",
//       description:
//         "Conduct a review session with the client to gather feedback on UI prototypes for the freelancer dashboard and implement necessary revisions.",
//       expectedHours: 20,
//       dueDate: "2025-02-28",
//       status: "in_review",
//       milestoneId: "milestone_003",
//     },
//     {
//       title: "Final Design Handoff",
//       description:
//         "Prepare and deliver final design assets (Figma files, style guides, and documentation) for the Taskaya contract page and mobile app to the development team.",
//       expectedHours: 25,
//       dueDate: "2025-03-05",
//       status: "not_started",
//       milestoneId: "milestone_004",
//     },
//   ],
//   totalElements: 4,
//   totalPages: 1,
//   size: 2,
//   number: 0,
// };
function Milestones({ isAdmin, contractId, role }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const size = 10;

  // Get the query client instance
  const queryClient = useQueryClient();

  const token = Cookies.get("token");

  const { data, isError, error } = useQuery({
    queryKey: ["ContractMilestones", contractId, currentPage, size],
    queryFn: () =>
      getMilestones(
        { id: contractId, page: currentPage - 1, size: size },
        token
      ),
    placeholderData: () => {
      // Calculate the previous page number
      const prevPage = currentPage - 1;
      // Only try to get previous data if prevPage is valid (i.e., >= 1)
      if (prevPage >= 1) {
        // Attempt to retrieve the cached data for the previous page
        return queryClient.getQueryData([
          "ContractMilestones",
          contractId,
          prevPage,
          size,
        ]);
      }
      // If there's no previous page (e.g., on page 1), return undefined
      return undefined;
    },

    staleTime: 5 * 60 * 1000,
  });

  if (isError) {
    // Simulate the catch block logic
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (errorMessage === "Forbidden" || errorMessage === "Unauthorized user") {
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in" />
      );
    }
    // Fallback for other errors
    return <div>Error loading jobs list: {errorMessage}</div>;
  }
  // console.log("current page", data);

  if (!data) return;
  // Handle page change with an event handler if Pagination uses an event
  const handlePageChange = (page: number, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault(); // Prevent default browser behavior (e.g., if Pagination uses a link or button)
    }
    setCurrentPage(page);
    // Optionally, you can call an API or update state here to fetch new data for the selected page
  };
  return (
    <>
      <div className=" bg-[var(--foreground-color)] border  border-[var(--border-color)] rounded-xl">
        <table className="w-full border-collapse text-base">
          <thead>
            <tr className="bg-[var(--button-hover-background-color)] text-white">
              <th className="px-4 py-2 text-left text-lg w-1/12">Title</th>
              <th className="px-4 py-2 text-left text-lg w-3/12">
                Description
              </th>
              <th className="px-4 py-2 text-left text-lg w-1/12">
                Expected hours
              </th>
              <th className="px-4 py-2 text-left text-lg w-1/12">Status</th>
              <th className="px-4 py-2 text-left text-lg w-1/12">Due date</th>
              <th className="px-4 py-2 text-left text-lg w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            <MilestonesTable
              isAdmin={isAdmin}
              contractId={contractId}
              milestones={data}
              role={role}
            />
          </tbody>
        </table>
      </div>
      <div className="self-center">
        <Pagination
          currentPage={currentPage}
          setPageParamter={true}
          totalCount={data.totalElements}
          pageSize={data.size}
          onPageChange={(page: number, event?: React.MouseEvent) =>
            handlePageChange(page, event)
          }
        />
      </div>
    </>
  );
}

export default Milestones;
