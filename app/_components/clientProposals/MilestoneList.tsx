"use client";
import { getProposalMilestones } from "@/app/_lib/Client/Proposals";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "../common/Pagination";
import ProtectedPage from "../common/ProtectedPage";
import DescriptionComponent from "../contractIdPage/DescriptionComponent";
import Spinner from "../common/Spinner";
import { toast, ToastContainer } from "react-toastify";

type Props = { proposalId: string };

interface Milestone {
  title: string;
  description: string;
  expectedHours: number;
  dueDate: string;
  milestoneId: string;
}

interface MilestoneResponse {
  content: Milestone[];
  totalElements: number;
  size: number;
  number: number;
  error?: string;
}

function MilestoneList({ proposalId }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const token = Cookies.get("token");

  // Fetch milestones using React Query
  const { data, isLoading, error } = useQuery<MilestoneResponse, Error>({
    queryKey: ["milestones", proposalId, currentPage],
    queryFn: async () => {
      const response = await getProposalMilestones(
        proposalId,
        currentPage - 1, // Convert to 0-based indexing
        5, // Size
        token
      );
      return response;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, { autoClose: 5000 });
      // Delay removal of the toast message from localStorage by 1 second
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
    }
  }, [errorMsg]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="text-gray-500">
        <Spinner />
      </div>
    );
  }

  // Handle error state
  if (error || data?.error) {
    const errorMessage = error?.message || data?.error;
    if (errorMessage === "Forbidden" || errorMessage === "Unauthorized user") {
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in again" />
      );
    }
    setErrorMsg(errorMessage || "You are not allowed to do this action");
    return (
      <div className="text-red-600">
        Error loading milestones: {errorMessage}
      </div>
    );
  }

  // Destructure response data
  const { content: milestones, totalElements, size } = data!;

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="w-full">
        {milestones.length === 0 ? (
          <p className="text-gray-500">No milestones added.</p>
        ) : (
          <div className="overflow-x-auto flex flex-col w-full">
            <div className="min-w-full rounded-lg">
              <div className="bg-[var(--btn-color)] rounded-t-lg grid grid-cols-4 gap-6 px-4 py-2 text-lg font-medium">
                <div className="col-start-1 col-end-3">Title</div>
                <div>Expected Hours</div>
                <div>Due Date</div>
              </div>
              <div>
                {milestones.map((m: Milestone, index: number) => (
                  <div
                    key={m.milestoneId || index}
                    className={`grid grid-cols-4 gap-6 px-4 py-2 text-lg bg-[var(--foreground-color)] ${
                      index === milestones.length - 1 && "rounded-b-lg"
                    }`}
                  >
                    <div className="flex flex-col col-start-1 col-end-3 gap-2">
                      {m.title || "N/A"}
                      <DescriptionComponent
                        description={m.description}
                        splitchar={50}
                      />
                    </div>
                    <div>{m.expectedHours || "0"}</div>
                    <div>
                      {m.dueDate
                        ? new Date(m.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full items-center ">
              <Pagination
                currentPage={currentPage}
                setPageParamter={true}
                totalCount={totalElements}
                pageSize={size}
                onPageChange={setCurrentPage}
                siblingCount={0}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MilestoneList;
