import React from "react";
import Container from "../common/Container";
import ProposalCard from "./ProposalCard";
import { ProposalsListProps } from "@/app/_types/ClientProposalsTypes";
import FilterComponent from "./FilterComponent";
import PostPagination from "../communityProfile/posts/PostPagination";

type Props = { proposals: ProposalsListProps };

function ProposalsList({ proposals }: Props) {
  return (
    <Container className="pt-10 flex flex-col gap-8">
      <h1 className="text-4xl">All Proposals</h1>

      <>
        <div className="flex flex-col gap-4 bg-[var(--foreground-color)] py-6 px-5 rounded-lg shadow-md">
          <FilterComponent />
          {proposals.content.length > 0 ? (
            <>
              {proposals.content.map((proposal, index) => (
                <ProposalCard
                  key={proposal.proposalId}
                  proposal={proposal}
                  isLast={index === proposals.content.length - 1}
                />
              ))}
            </>
          ) : (
            <p className="font-semibold text-lg self-center">
              No proposals found...
            </p>
          )}
        </div>
        <div className="self-center">
          <PostPagination
            totalElements={proposals.totalElements}
            size={proposals.size}
            page={proposals.number + 1}
          />
        </div>
      </>
    </Container>
  );
}

export default ProposalsList;
