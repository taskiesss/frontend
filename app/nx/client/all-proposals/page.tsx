import ProposalsList from "@/app/_components/clientProposals/ProposalsList";
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import { getProposals } from "@/app/_lib/Client/Proposals";
import { cookies } from "next/headers";
import React from "react";

type props = {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
};
async function page({ searchParams }: props) {
  const { search, status, page } = await searchParams;
  const newpage = page ? Number(page) : 1;
  const newStatus = status ? status.split(",") : [];
  const newSearch = search ? search : "";
  const reqBody = {
    page: newpage - 1,
    size: 2,
    status: newStatus,
    search: newSearch,
    jobId: undefined,
  };
  const token = (await cookies()).get("token")?.value;
  const response = await getProposals(reqBody, token);
  console.log(response);
  if (response.error) {
    if (
      response.error === "Forbidden" ||
      response.error === "Unauthorized user"
    ) {
      return (
        <ProtectedPage message="You are not alloed to do this action. Please log in again" />
      );
    }
    throw new Error("Error loading Proposals page:", response.error);
  }
  return <ProposalsList proposals={response} />;
}

export default page;
