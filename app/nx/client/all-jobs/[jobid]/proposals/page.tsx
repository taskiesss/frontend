import ProposalsList from "@/app/_components/clientProposals/ProposalsList";
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Spinner from "@/app/_components/common/Spinner";
import { getProposals } from "@/app/_lib/Client/Proposals";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{ jobId: string }>;
  searchParams: Promise<{
    page: string;
  }>;
};

async function Page({ params, searchParams }: Props) {
  const { jobId } = await params;
  console.log(jobId);
  const { page } = await searchParams;
  const newPage = page ? Number(page) : 1;

  const reqBody = {
    page: newPage - 1,
    size: 10,
    jobId,
  };

  const token = (await cookies()).get("token")?.value;
  const response = await getProposals(reqBody, token);

  if (response.error) {
    if (
      response.error === "Forbidden" ||
      response.error === "Unauthorized user"
    ) {
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in again" />
      );
    }
    throw new Error("Error loading Proposals page:", response.error);
  }

  return (
    <Suspense fallback={<Spinner />}>
      <ProposalsList proposals={response} role={"client"} />
    </Suspense>
  );
}

export default Page;
