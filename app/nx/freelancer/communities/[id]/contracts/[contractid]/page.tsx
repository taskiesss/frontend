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
  freelancerId: "string",
  clientId: "string",
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
};
async function page({ params }: Props) {
  const { contractid } = await Promise.resolve(params);

  try {
    const token = (await cookies()).get("token")?.value;
    contract = await getContractDetails(
      {
        id: contractid,
      },
      token
    );
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized user")
      return <ProtectedPage message="You're not allowed to view this page" />;
    console.error(error.message);
  }
  return (
    <Contract
      isAdmin={contract.isCommunityAdmin || false}
      contract={contract}
      contractId={contractid}
    />
  );
}

export default page;
