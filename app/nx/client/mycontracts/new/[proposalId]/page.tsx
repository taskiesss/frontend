import ContractForm from "@/app/_components/myContracts/ContractForm/ContractForm";
import React from "react";

type Props = { params: Promise<{ proposalId: string }> };

async function page({ params }: Props) {
  const { proposalId } = await params;
  return <ContractForm proposalId={proposalId} />;
}

export default page;
