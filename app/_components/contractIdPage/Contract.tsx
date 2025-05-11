import { formatDayMonthToString } from "@/app/_helpers/helper";
import { contractDetailsResponse } from "@/app/_types/ContractDetailsResponse";
import {
  faArrowAltCircleLeft,
  faMessage,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarAlt,
  faSackDollar,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Container from "../common/Container";
import Spinner from "../common/Spinner";
import StatusCard from "../myContracts/StatusCard";
import ApproveContract from "./ApproveContract";
import Milestones from "./Milestones";
import RatingModal from "./RatingModal";

type Props = {
  contract: contractDetailsResponse;
  contractId: string;
  role?: string;
  isAdmin: boolean;
};

function Contract({ contract, contractId, role, isAdmin }: Props) {
  return (
    <Container className="flex flex-col gap-8">
      {/* title section */}
      <div className="flex items-center pt-10 gap-8">
        <div className="flex flex-wrap items-center  gap-3">
          <h1 className="text-3xl font-bold ">
            Contract Details for {contract.jobTitle}
          </h1>
          <StatusCard status={contract.contractStatus} />
        </div>

        {contract.contractStatus.toLowerCase() === "active" &&
          !contract.pendingClientToRate &&
          !contract.pendingFreelancerToRate &&
          isAdmin && (
            <div className="flex gap-4">
              <span className="text-[var(--bg-skill)] font-semibold text-lg">
                Do you want to end contract?
              </span>
              <button className="hover:underline text-lg underline text-[var(--hover-color)] hover:text-[var(--btn-color)]">
                End Contract
              </button>
            </div>
          )}
        {((contract.pendingClientToRate && role === "client") ||
          (contract.pendingFreelancerToRate && role !== "client")) && (
          <div className="flex gap-4">
            <p className="text-[var(--bg-skill)] font-semibold text-lg">
              Give your feedback on your experience!
            </p>
            <RatingModal
              contractId={contractId}
              canRate={
                (contract.pendingClientToRate && role === "client") ||
                contract.pendingFreelancerToRate
              }
            />
          </div>
        )}
      </div>
      {/* view job button section */}
      <div className="border-b-[var(--border-color)] w-full border-solid border-b-2 pb-10">
        <Link
          href={
            role === "client"
              ? `/nx/client/job-details/${contract.jobId}`
              : `/nx/freelancer/find-work/${contract.jobId}`
          }
          className="underline text-[var(--hover-color)] hover:text-[var(--btn-color)] text-xl"
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className="pr-1" />
          view job details
        </Link>
      </div>
      {/* Price Per hour Visualization */}
      <div className="flex justify-between bg-[var(--btn-color)] items-center p-8">
        <div className="flex gap-3 items-center">
          <div className="items-center p-5 w-fit bg-[var(--foreground-color)] rounded-full">
            <FontAwesomeIcon
              icon={faSackDollar}
              className="text-[var(--accent-color)] text-5xl font-bold"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl">Hourly Rate</span>
            <span className="text-4xl font-bold">
              $ {contract.pricePerHour.toFixed(2)}
            </span>
          </div>
        </div>
        {(contract.contractStatus.toLowerCase() === "active" ||
          contract.contractStatus.toLowerCase() === "ended") && (
          <div className="flex gap-4 self-center ">
            <div className="flex flex-col justify-center gap-3 bg-[var(--foreground-color)] p-4 rounded-lg">
              <span className="text-xl">
                {role === "client" ? "Total Spent" : "Total Earnings"}
              </span>
              <span className="text-4xl font-bold">
                $ {contract.totalCurrentEarnings.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-3 bg-[var(--foreground-color)] p-4 rounded-lg">
              <span className="text-xl">Hours worked</span>
              <span className="text-4xl font-bold">
                {contract.hoursWorked} hrs
              </span>
            </div>
            {contract.isCommunity && role !== "client" && (
              <div className="flex flex-col gap-3 justify-center bg-[var(--foreground-color)] p-4 rounded-lg">
                <span className="text-xl">My Earnings</span>
                <span className="text-4xl font-bold">
                  $ {contract.memberEarnings.toFixed(2)}
                </span>
                <span className="text-lg opacity-85">
                  {contract.memberPercentage.toFixed(2)} % of project value
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      {/* OVERVIEW */}
      <div className="flex flex-col gap-6 border-b-[var(--border-color)] w-full border-solid border-b-2 pb-10">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <div className=" flex items-center gap-4">
          <div className="flex items-center gap-5">
            <Link
              href={`${
                contract.isCommunity
                  ? role === "client"
                    ? `/nx/client/discover-communities/${contract.freelancerId}`
                    : `/nx/freelancer/communities/${contract.freelancerId}/about`
                  : role === "client"
                  ? `/nx/client/discover-talents/${contract.freelancerId}`
                  : "/nx/freelancer/myprofile"
              }`}
              className="flex items-center gap-5 border-solid border border-gray-600 p-4 rounded-lg cursor-default"
            >
              <FontAwesomeIcon icon={faUserCircle} className="text-2xl " />
              <div className="flex-col flex justify-center gap-2">
                <span className="text-slate-500">
                  {contract.isCommunity ? "Community:" : "Freelancer:"}{" "}
                </span>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 md:w-10 lg:w-14 aspect-square rounded-full flex-shrink-0 ">
                    <Image
                      src={contract.freelancerProfilePic}
                      alt="pic"
                      quality={70}
                      fill
                      priority
                      className="object-cover rounded-full"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>
                  <span className="text-lg hover:underline cursor-pointer">
                    {contract.freelancerName}
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex border-solid border border-gray-600 items-center  pr-4 rounded-lg ">
              <Link
                href={
                  role === "client"
                    ? `/nx/client/my-profile`
                    : `/nx/freelancer/client-profile/${contract.clientId}`
                }
                className="flex items-center gap-5  p-4  cursor-default"
              >
                <FontAwesomeIcon icon={faUserCircle} className="text-2xl " />
                <div className="flex-col flex justify-center gap-2">
                  <span className="text-slate-500">Client: </span>
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 md:w-10 lg:w-14 aspect-square rounded-full flex-shrink-0 ">
                      <Image
                        src={contract.clientProfilePic}
                        alt="pic"
                        quality={70}
                        fill
                        priority
                        className="object-cover rounded-full"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                      />
                    </div>
                    <span className="text-lg hover:underline cursor-pointer">
                      {contract.clientName}
                    </span>
                  </div>
                </div>
              </Link>
              <Link href={"/#/"}>
                <FontAwesomeIcon icon={faMessage} className="pl-6 text-2xl" />
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <span className="text-lg text-slate-500">
            <FontAwesomeIcon
              icon={faSuitcase}
              className="text-[var(--accent-color)] text-xl"
            />{" "}
            Project type:{" "}
            <span className="text-[var(--accent-color)] font-bold">
              {contract.projectType === "PerMilestones"
                ? "Per Milestones"
                : "Per Project"}
            </span>
          </span>
        </div>
        {/* Contract Dates */}
        <div className="flex gap-16">
          <span className="text-lg text-slate-500">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-red-400 text-xl"
            />{" "}
            Start date:{" "}
            <span className="text-[var(--accent-color)] font-bold">
              {formatDayMonthToString(contract.startDate)}
            </span>
          </span>
          <span className="text-lg text-slate-500">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-red-400 text-xl"
            />{" "}
            End date:{" "}
            <span className="text-[var(--accent-color)] font-bold">
              {contract.contractStatus.toLowerCase() === "ended"
                ? formatDayMonthToString(contract.endDate)
                : "Present"}
            </span>
          </span>
        </div>
      </div>
      {/* MILESTONES */}
      <div
        className={`flex flex-col gap-4 ${
          contract.contractStatus.toLowerCase() === "pending" ? "" : "pb-20"
        }`}
      >
        <h2 className="text-2xl font-semibold">Milestones</h2>
        <Suspense fallback={<Spinner />}>
          <Milestones
            communityid={
              contract.isCommunity ? contract.freelancerId : undefined
            }
            isAdmin={isAdmin}
            contractId={contractId}
            role={role}
          />
        </Suspense>
      </div>
      {/* Accept or reject contract */}
      {contract.contractStatus.toLowerCase() === "pending" &&
        role !== "client" && (
          <ApproveContract contract={contract} contractId={contractId} />
        )}
    </Container>
  );
}

export default Contract;
