/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Contract from "@/app/_components/contractIdPage/Contract";
import { getContractDetails } from "@/app/_lib/ContractsAPi/contractAPI";
import { contractDetailsResponse } from "@/app/_types/ContractDetailsResponse";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  params: { contractid: string };
  searchParams: Promise<{ page?: string }>;
};
let contract: contractDetailsResponse = {
  contractStatus: "active",
  jobId: "job_12345",
  jobTitle: "UI/UX Design for Taskaya Contract Page",
  clientName: "Emma Johnson",
  clientProfilePic: "/images/emma-johnson-profile.jpg",
  freelancerName: "Jonas Smith",
  freelancerProfilePic: "/images/jonas-smith-profile.jpg",
  isCommunity: false,
  pricePerHour: 45,
  totalCurrentEarnings: 450,
  hoursWorked: 10,
  startDate: "2025-02-10",
  endDate: "2025-03-15",
  projectType: "PerMilestones",
  milestones: {
    content: [
      {
        title: "Initial Design Mockups",
        description:
          "Create wireframes and design mockups for the contract management page, including layout sketches and low-fidelity prototypes for desktop and mobile views.",
        expectedHours: 30,
        dueDate: "2025-03-03",
        status: "in_progress",
        milestoneId: "milestone_001",
      },
      {
        title: "UI Design for Mobile App",
        description:
          "Design high-fidelity UI screens for the mobile version of the Taskaya application, focusing on user profiles, job listings, and contract details.",
        expectedHours: 40,
        dueDate: "2025-03-01",
        status: "approved",
        milestoneId: "milestone_002",
      },
      {
        title: "Review UI Prototypes",
        description:
          "Conduct a review session with the client to gather feedback on UI prototypes for the freelancer dashboard and implement necessary revisions.",
        expectedHours: 20,
        dueDate: "2025-02-28",
        status: "in_review",
        milestoneId: "milestone_003",
      },
      {
        title: "Final Design Handoff",
        description:
          "Prepare and deliver final design assets (Figma files, style guides, and documentation) for the Taskaya contract page and mobile app to the development team.",
        expectedHours: 25,
        dueDate: "2025-03-05",
        status: "not_started",
        milestoneId: "milestone_004",
      },
    ],
    totalElements: 4,
    totalPages: 1,
    size: 2,
    number: 0,
  },
};
async function page({ params, searchParams }: Props) {
  const { contractid } = await Promise.resolve(params);

  const resolvedSearchParams = await searchParams;
  const pageNumber = Number(resolvedSearchParams.page)
    ? Number(resolvedSearchParams.page)
    : 1;

  try {
    const token = (await cookies()).get("token")?.value;
    contract = await getContractDetails(
      {
        id: contractid,
        page: pageNumber - 1,
        size: 10,
      },
      token
    );
    return <Contract contract={contract} />;
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized user")
      return <ProtectedPage message="You're not allowed to view this page" />;
    console.error(error.message);
  }
}

export default page;
