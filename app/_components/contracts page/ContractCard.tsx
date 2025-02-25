import { formatDayMonthToString } from "@/app/_helpers/helper";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import StarRating from "../common/StarRating";
import MoreOptionButton from "./MoreOptionButton";
import StatusCard from "./StatusCard";
type Props = {
  contract: {
    contractID: string;
    jobID: string;
    jobTitle: string;
    clientName: string;
    clientID: string;
    contractStatus: "ACTIVE" | "ENDED";
    budget: number;
    activeMilestone: string;
    clientRateForFreelancer?: number;
    startDate: string;
    dueDate?: string;
    endDate?: string;
  };
};

export default function ContractCard({ contract }: Props) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 p-2 border-b-2 border-solid border-[var(--border-color)]">
      {/* upper div */}

      <div className="flex w-full  justify-between">
        <h2 className="text-2xl font-bold ">
          <Link
            href={`/nx/freelancer/jobs/${contract.jobID}`}
            className="hover:text-[var(--hover-color)] hover:underline"
          >
            {contract.jobTitle}
          </Link>
        </h2>
        {/* Buttons */}

        <div className="flex items-center gap-2">
          <Link
            href={`/nx/freelancer/mycontracts/${contract.contractID}`}
            className="text-[var(--hover-color)] border-[var(--hover-color)] border-solid border p-2 rounded-2xl text-md hover:border-[var(--btn-color)] hover:text-[var(--btn-color)]  "
          >
            View details
          </Link>
          {/* more option button  */}
          <MoreOptionButton />
        </div>
      </div>

      {/* Lower div */}
      <div className="flex gap-5 w-full">
        <div className="flex gap-4 w-1/3">
          <div className="flex flex-col">
            <div className="text-lg">{contract.clientName}</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-1/3">
          <div className="flex gap-3 items-center text-md">
            {/* Status here */}
            <StatusCard status={contract.contractStatus} />
            {contract.contractStatus === "ENDED" ? (
              <div className="pointer-events-none">
                <StarRating
                  defaultRating={contract.clientRateForFreelancer}
                  size={14}
                  color="#FFC107"
                />
              </div>
            ) : (
              <span className="items-center py-1">
                {contract.activeMilestone}
              </span>
            )}
          </div>
          <div className="text-md font-medium py-1">
            ${contract.budget.toFixed(2)} Budget
          </div>
          <div
            className={`text-md font-medium py-1 gap-1 flex items-center ${
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
      <div className="text-md font-extralight py-2">
        {formatDayMonthToString(contract.startDate)} -{" "}
        {contract.contractStatus === "ACTIVE"
          ? "Present"
          : contract.endDate
          ? formatDayMonthToString(contract?.endDate)
          : ""}
      </div>
    </div>
  );
}
