"use client";

import React, { Suspense, useEffect, useState } from "react";

import { Pagination } from "@/app/_components/common/Pagination";
import { ProposalsPageDTO } from "@/app/_types/Proposals";
import { getFreelancerProposals } from "@/app/_lib/Proposals/ProposalsSearch";
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Cookies from "js-cookie";
import Spinner from "@/app/_components/common/Spinner";
import Container from "@/app/_components/common/Container";
import { formatDateString, timeAgo } from "@/app/_helpers/helper";

// Define sample fake proposals data
// const defaultProposalsData: ProposalsPageDTO = {
//   content: [
//     {
//       date: "2016-05-31T00:00:00Z",
//       jobTitle: "Need Data Entry People",
//       proposalId: "proposal-1",
//       jobId: "job-1",
//       status: "DECLINED",
//       contractId: "",
//     },
//     {
//       date: "2016-05-31T00:00:00Z",
//       jobTitle: "E-Commerce Website",
//       proposalId: "proposal-2",
//       jobId: "job-2",
//       status: "HIRED",
//       contractId: "",
//     },
//     {
//       date: "2016-05-31T00:00:00Z",
//       jobTitle: "E-Commerce Website",
//       proposalId: "proposal-2",
//       jobId: "job-2",
//       status: "HIRED",
//       contractId: "",
//     },
//     {
//       date: "2016-05-31T00:00:00Z",
//       jobTitle: "E-Commerce Website",
//       proposalId: "proposal-2",
//       jobId: "job-2",
//       status: "HIRED",
//       contractId: "",
//     },
//     {
//       date: "2016-05-31T00:00:00Z",
//       jobTitle: "E-book Website",
//       proposalId: "proposal-3",
//       jobId: "job-3",
//       status: "PENDING",
//       contractId: "",
//     },
//     {
//       date: "2016-05-31T00:00:00Z",
//       jobTitle: "E-book Website",
//       proposalId: "proposal-4",
//       jobId: "job-4",
//       status: "PENDING",
//       contractId: "",
//     },
//     {
//       date: "2016-05-31T00:00:00Z",
//       jobTitle: "E-Commerce Website",
//       proposalId: "proposal-5",
//       jobId: "job-5",
//       status: "HIRED",
//       contractId: "",
//     },
//   ],
//   page: 1,
//   size: 5,
//   totalElements: 10,
//   totalPages: 2,
// };

export default function MyProposalsPage() {
  // Retrieve JWT token from cookies (or any other approach)
  const [token] = useState<string | undefined>(Cookies.get("token"));
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Proposals data: set default to our fake data
  const [proposalsData, setProposalsData] = useState<ProposalsPageDTO | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Tabs for "Active" vs. "Archived"
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "ARCHIVED">("ACTIVE");

  // Fetch proposals whenever currentPage changes
  useEffect(() => {
    if (!token) {
      setError("No token found");
      return;
    }

    getFreelancerProposals(token, currentPage, 10)
      .then((data) => {
        setProposalsData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        // If the fetch fails, we retain the default fake data
        setProposalsData(null);
      });
  }, [token, currentPage]);

  // If there's an error (e.g., 401, 403), show a protected page message
  if (error) {
    return <ProtectedPage message="You are not allowed to do this action." />;
  }

  // Handle page change from Pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSwitch = (tab: "ACTIVE" | "ARCHIVED") => {
    setCurrentPage(1);
    setActiveTab(tab);
  };

  // Filter proposals based on the selected tab
  const displayedProposals =
    proposalsData?.content.filter((p) => {
      if (activeTab === "ACTIVE") {
        return p.status !== "DECLINED";
      } else {
        return p.status === "DECLINED";
      }
    }) || [];

  return (
    <Container>
      <div className="min-h-screen px-4 py-20 bg-[var(--background-color)] text-[var(--accent-color)]">
        <h1 className="text-2xl font-bold mb-12">My Proposals</h1>

        {/* Tabs for Active / Archived */}
        <div className="border-b border-[var(--border-color)] mb-6">
          <nav className="flex gap-20">
            <button
              onClick={() => handleSwitch("ACTIVE")}
              className={`relative pb-2 text-base ${
                activeTab === "ACTIVE"
                  ? "font-medium text-[var(--hover-color)] border-solid border-b-2 border-[var(--hover-color)]"
                  : "text-[var(--star)]"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => handleSwitch("ARCHIVED")}
              className={`relative pb-2 text-base ${
                activeTab === "ARCHIVED"
                  ? "font-medium text-[var(--hover-color)] border-solid border-b-2 border-[var(--hover-color)]"
                  : "text-[var(--star)]"
              }`}
            >
              Archived
            </button>
          </nav>
        </div>

        <Suspense fallback={<Spinner />}>
          <div className="overflow-x-auto bg-[var(--foreground-color)] border border-[var(--border-color)]">
            <table className="w-full border-collapse text-base">
              <thead>
                <tr className="bg-[var(--button-hover-background-color)] text-white">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Job Title</th>
                  <th className="px-4 py-2 text-left">
                    Income/Outcome (active)
                  </th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedProposals.map((proposal) => {
                  const formattedDate = formatDateString(proposal.date);
                  const relative = timeAgo(proposal.date);

                  // Income/Outcome logic
                  let incomeOutcome = "";
                  switch (proposal.status) {
                    case "DECLINED":
                      incomeOutcome = "Declined by client";
                      break;
                    case "HIRED":
                      incomeOutcome = "Hired → View";
                      break;
                    default:
                      incomeOutcome = "Pending";
                  }

                  // Status text
                  let statusText: string = proposal.status;
                  if (proposal.status === "HIRED") {
                    statusText = "Job is closed";
                  } else if (proposal.status === "PENDING") {
                    statusText = "Awaiting client response";
                  }

                  return (
                    <tr
                      key={proposal.proposalId}
                      className="border-b border-[var(--border-color)]"
                    >
                      <td className="px-4 py-2 align-top">
                        <span className="block text-base text-[var(--accent-color)]">
                          Initiated {formattedDate}
                        </span>
                        <span className="block text-sm text-[var(--star)]">
                          {relative}
                        </span>
                      </td>
                      <td className="px-4 py-2 align-top">
                        <a href="#" className="text-blue-600 hover:underline">
                          {proposal.jobTitle}
                        </a>
                      </td>
                      <td className="px-4 py-2 align-top">{incomeOutcome}</td>
                      <td className="px-4 py-2 align-top">{statusText}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {proposalsData && (
            <div className="flex justify-center py-5">
              <Pagination
                currentPage={currentPage}
                totalCount={proposalsData.totalElements}
                pageSize={proposalsData.size}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </Suspense>
      </div>
    </Container>
  );
}
