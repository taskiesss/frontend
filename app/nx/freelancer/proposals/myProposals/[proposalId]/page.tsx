import ViewProposal from "@/app/_components/clientProposals/ViewProposal";
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Spinner from "@/app/_components/common/Spinner";
import { getProposalsDetails } from "@/app/_lib/Client/Proposals";
import { cookies } from "next/headers";
import { Suspense } from "react";

type Props = {
  params: Promise<{ proposalId: string }>;
};

async function page({ params }: Props) {
  const { proposalId } = await params;

  console.log("proposalId", proposalId);
  const token = (await cookies()).get("token")?.value;
  const response = await getProposalsDetails(proposalId, token);

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
      <ViewProposal proposal={response} />
    </Suspense>
  );
}

export default page;
