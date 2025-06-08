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
let contract: contractDetailsResponse;
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
    return (
      <Contract isAdmin={true} contract={contract} contractId={contractid} />
    );
  } catch (error: any) {
    if (error.message === "Forbidden" || error.message === "Unauthorized user")
      return <ProtectedPage message="You're not allowed to view this page" />;
    throw new Error(error.message);
  }
}

export default page;
