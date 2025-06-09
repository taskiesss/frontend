import { Proposal } from "@/app/_types/ClientProposalsTypes";
import {
  faCircleCheck,
  faCircleXmark,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import {
  faFileSignature,
  faSuitcase,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = { proposal: Proposal; isLast: boolean; role?: string };

function ProposalCard({ proposal, isLast, role }: Props) {
  console.log(proposal);
  return (
    <main
      className={`flex flex-col ${
        isLast ? "" : "border-b-2 border-b-[var(--border-color)]"
      } pb-5 bg-[var(--background-color)] rounded-xl p-5`}
    >
      {/* job Name and status  */}
      <section className="flex justify-between items-center  ">
        <div className="flex gap-2 items-center">
          <Link
            href={
              role === "client"
                ? `/nx/client/job-details/${proposal.jobId}`
                : `/nx/freelancer/find-work/${proposal.jobId}`
            }
            className="hover:text-[var(--hover-color)] hover:underline transition-all"
          >
            <p className="lg:text-xl md:text-lg text-sm font-semibold">
              {proposal.jobName}
            </p>
          </Link>
          {/* Component for displaying proposal status */}
          {proposal.status === "PENDING" && (
            <span className=" items-center px-2 py-1 rounded-xl text-sm md:text-md font-medium bg-[var(--status-inprogress)] text-white flex gap-1">
              <FontAwesomeIcon icon={faClock} />
              Pending
            </span>
          )}
          {proposal.status === "ACCEPTED" && (
            <span className=" items-center px-2 py-1 rounded-xl text-sm md:text-md font-medium bg-[var(--status-active)] text-white flex gap-1">
              <FontAwesomeIcon icon={faCircleCheck} />
              Accepted
            </span>
          )}
          {proposal.status === "DECLINED" && (
            <span className=" items-center px-2 py-1 rounded-xl text-sm md:text-md font-medium bg-red-500 text-white flex gap-1">
              <FontAwesomeIcon icon={faCircleXmark} />
              Declined
            </span>
          )}
          {proposal.status === "HIRED" && (
            <span className="items-center px-2 py-1 rounded-xl text-sm md:text-md font-medium bg-blue-600 text-white flex gap-1">
              <FontAwesomeIcon icon={faSuitcase} />
              Hired
            </span>
          )}
        </div>
        <div className="flex gap-5 items-center">
          {proposal.status === "PENDING" && role === "client" && (
            <Link
              href={`/nx/client/mycontracts/new/${proposal.proposalId}`}
              className="bg-[var(--btn-color)] py-2 px-10 rounded-xl hover:bg-[var(--button-hover-background-color)] transition-all flex gap-1 items-center lg:text-md  text-xs md:text-sm"
            >
              <FontAwesomeIcon icon={faSuitcase} />
              Hire
            </Link>
          )}
          {(proposal.status === "ACCEPTED" || proposal.status === "HIRED") && (
            <Link
              href={
                role === "client"
                  ? `/nx/client/mycontracts/${proposal.contractId}`
                  : `/nx/freelancer/mycontracts/${proposal.contractId}`
              }
              className="border-2 border-solid border-[var(--btn-color)] py-2 px-3 rounded-xl hover:bg-[var(--button-hover-background-color)] transition-all flex gap-1 items-center lg:text-md  text-xs md:text-sm"
            >
              <FontAwesomeIcon icon={faFileSignature} />
              View Contract
            </Link>
          )}
          <Link
            href={
              role === "client"
                ? `/nx/client/all-proposals/${proposal.proposalId}`
                : `/nx/freelancer/proposals/myProposals/${proposal.proposalId}`
            }
            className="border-2 border-solid border-[var(--btn-color)] py-2 px-3 rounded-xl hover:bg-[var(--button-hover-background-color)] transition-all flex gap-1 items-center lg:text-md  text-xs md:text-sm"
          >
            <FontAwesomeIcon icon={faFileAlt} />
            View Proposal
          </Link>
        </div>
      </section>
      {/* freelancer name and image and job title */}
      {role === "client" && (
        <section className="flex gap-4 items-center">
          <Link
            href={
              proposal.community
                ? `/nx/client/discover-communities/${proposal.freelancerId}`
                : `/nx/client/discover-talents/${proposal.freelancerId}`
            }
            className="w-fit"
          >
            <div className="relative w-16 aspect-square rounded-full overflow-hidden">
              <Image
                src={proposal.profilePicture}
                alt={`${proposal.freelancerName} img`}
                fill
                className="object-cover rounded-full overflow-hidden"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </Link>
          <div className="flex flex-col">
            <Link
              href={
                proposal.community
                  ? `/nx/client/discover-communities/${proposal.freelancerId}`
                  : `/nx/client/discover-talents/${proposal.freelancerId}`
              }
              className="hover:text-[var(--hover-color)] hover:underline transition-all"
            >
              <p className="text-lg font-semibold">{proposal.freelancerName}</p>
            </Link>
            <p className="text-md opacity-70">{proposal.freelancerTitle}</p>
          </div>
        </section>
      )}
    </main>
  );
}

export default ProposalCard;
