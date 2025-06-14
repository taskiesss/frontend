import { formatDayMonthToString } from "@/app/_helpers/helper";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import StarRating from "../common/StarRating";
import StatusCard from "./StatusCard";
import Image from "next/image";
import defaultProfile from "@/public/images/userprofile.jpg";
type Props = {
  pathname: string;
  communityid: string;
  contract: {
    contractID: string;
    jobID: string;
    jobTitle: string;
    clientName: string;
    clientID: string;
    contractStatus: "ACTIVE" | "ENDED" | "PENDING" | "CANCELLED";
    budget: number;
    activeMilestone: string;
    clientRateForFreelancer?: number;
    startDate: string;
    dueDate?: string;
    endDate?: string;
    freelancerName?: string;
    freelancerID?: string;
    isCommunity?: boolean;
    profilePicture?: string;
  };
  role?: string;
};

export default function ContractCard({
  communityid,
  contract,
  pathname,
  role,
}: Props) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 p-4 border-b-2 border-solid border-[var(--border-color)] w-full bg-[var(--background-color)] rounded-xl">
      {/* upper div */}

      <div className="flex w-full  justify-between">
        <h2 className=" md:text-xl text-lg font-bold ">
          <Link
            href={
              role === "client"
                ? `/nx/client/job-details/${contract.jobID}`
                : `/nx/freelancer/find-work/${contract.jobID}`
            }
            className="hover:text-[var(--hover-color)] hover:underline"
          >
            {contract.jobTitle}
          </Link>
        </h2>
        {/* Buttons */}

        <div className="flex items-center gap-2">
          <Link
            href={
              role === "client"
                ? `/nx/client/mycontracts/${contract.contractID}`
                : pathname === "/nx/freelancer/mycontracts"
                ? `/nx/freelancer/mycontracts/${contract.contractID}`
                : `/nx/freelancer/communities/${communityid}/contracts/${contract.contractID}`
            }
            className=" border-[var(--hover-color)] border-solid border px-3 py-2 rounded-2xl text-md  hover:border-[var(--btn-color)] hover:bg-[var(--button-hover-background-color)] transition-all  "
          >
            View details
          </Link>
          {/* more option button 
          {contract.contractStatus === "ACTIVE" && <MoreOptionButton />} */}
        </div>
      </div>

      {/* Lower div */}
      <div className="flex gap-5 w-full">
        <div className="flex gap-4 w-1/3">
          <Link
            href={
              role === "client"
                ? contract.isCommunity
                  ? `/nx/client/discover-communities/${contract.freelancerID}`
                  : `/nx/client/discover-talents/${contract.freelancerID}`
                : `/nx/freelancer/client-profile/${contract.clientID}`
            }
            className="flex gap-4 hover:text-[var(--hover-color)] hover:underline w-full items-center"
          >
            <div className="relative w-12 sm:w-16 aspect-square rounded-full">
              <Image
                src={contract.profilePicture || defaultProfile}
                alt={`${
                  role === "client"
                    ? contract.freelancerName
                    : contract.clientName
                } img`}
                fill
                priority
                className="object-cover rounded-full"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            <div className="self-center">
              <p className="text-md sm:text-lg">
                {role === "client"
                  ? contract.freelancerName
                  : contract.clientName}
              </p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-1/3">
          <div className="flex flex-col gap-3 items-center  text-md ">
            {/* Status here */}
            <StatusCard status={contract.contractStatus} />
            {contract.contractStatus === "ENDED" && (
              <div className="pointer-events-none self-center">
                <StarRating
                  defaultRating={contract.clientRateForFreelancer}
                  size={14}
                  color="#FFC107"
                  allowHalf={true}
                />
              </div>
            )}
            {contract.contractStatus === "ACTIVE" && (
              <span className="items-center py-1 sm:text-sm text-center">
                {contract.activeMilestone}
              </span>
            )}
          </div>
          <div className="text-md font-medium py-1">
            <span className="dark:text-green-500 text-green-600">
              ${contract.budget.toFixed(2)}
            </span>{" "}
            Budget
          </div>
          <div
            className={`opacity-80 lg:text-md text-sm font-medium py-1 gap-1 flex items-center ${
              contract.contractStatus === "ENDED" ? "invisible" : ""
            }`}
          >
            <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
            due{" "}
            {contract.dueDate ? formatDayMonthToString(contract.dueDate) : ""}
          </div>
        </div>
        <div className="w-1/3"></div>
      </div>
      <div className="lg:text-md text-sm font-extralight py-2 opacity-80">
        {formatDayMonthToString(contract.startDate)} -{" "}
        {contract.contractStatus === "ACTIVE"
          ? "Present"
          : contract.contractStatus === "PENDING"
          ? "Pending"
          : contract.endDate
          ? formatDayMonthToString(contract?.endDate)
          : ""}
      </div>
    </div>
  );
}
