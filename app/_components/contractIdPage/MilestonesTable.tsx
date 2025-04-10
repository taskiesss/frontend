import { formatDayMonthToString } from "@/app/_helpers/helper";
import { ContractMilestones } from "@/app/_types/ContractDetailsResponse";
import MoreOptionButton from "./MoreOptionButton";
import MilestoneStatus from "./MilestoneStatus";
import { Suspense, useEffect, useState } from "react";
import ViewSubmission from "./ViewSubmissions";
import Spinner from "../common/Spinner";
import DescriptionComponent from "./DescriptionComponent";

type Props = {
  isAdmin: boolean;
  milestones: ContractMilestones;
  contractId: string;
  role?: string;
  communityid?: string;
  currentPage: number;
  size: number;
};

function MilestonesTable({
  communityid,
  milestones,
  contractId,
  role,
  isAdmin,
  size,
  currentPage,
}: Props) {
  const [viewingMilestoneIndex, setViewingMilestoneIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (viewingMilestoneIndex !== null)
      document.body.style.overflow = "hidden"; // Hide page scrollbar
    else document.body.style.overflow = "auto";
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewingMilestoneIndex]);

  return (
    <>
      {milestones.content.length > 0 ? (
        milestones.content.map((m, i) => (
          <tr
            key={i}
            className={`${
              i === milestones.content.length - 1
                ? "rounded-bl-lg rounded-br-lg"
                : "border-b border-solid border-b-gray-500"
            }`}
          >
            <td className="px-4 py-4 align-top w-4/12 text-lg">
              <div className="flex flex-col gap-3">
                {m.title}
                <DescriptionComponent description={m.description} />
              </div>
            </td>
            {/* <td className="px-4 py-4 align-top w-3/12 text-lg">
              <p className="whitespace-pre-wrap">{m.description}</p>
            </td> */}
            <td className="px-4 py-4 align-top w-1/12 text-lg">
              {m.expectedHours} Hours
            </td>
            <td className="px-4 py-4 align-top w-1/12 text-lg">
              <MilestoneStatus status={m.status} />
            </td>
            <td className="px-4 py-4 align-top w-1/12 text-lg">
              {formatDayMonthToString(m.dueDate)}
            </td>
            <td className="px-4 py-4 align-top w-1/12 text-lg">
              {m.status.toLowerCase() === "in_progress" &&
                isAdmin &&
                role !== "client" && (
                  <MoreOptionButton
                    index={i}
                    communityid={communityid}
                    status={m.status}
                    contractId={contractId}
                    milestoneIndex={m.milestoneId}
                    title={m.title}
                    currentPage={currentPage}
                    size={size}
                  />
                )}

              {(m.status.toLowerCase() === "in_progress" && !isAdmin) ||
              m.status.toLowerCase() === "pending_review" ||
              m.status.toLowerCase() === "approved" ? (
                <>
                  <button
                    onClick={() => setViewingMilestoneIndex(i)}
                    className="bg-[var(--btn-color)] t px-3 py-1.5 rounded hover:bg-[var(--hover-color)]"
                  >
                    {role === "client"
                      ? "Review Submission"
                      : "View submissions"}
                  </button>
                  {viewingMilestoneIndex === i && (
                    <Suspense fallback={<Spinner />}>
                      <ViewSubmission
                        index={i}
                        currentPage={currentPage}
                        size={size}
                        status={m.status}
                        role={role}
                        contractId={contractId}
                        notEditable={
                          m.status.toLowerCase() === "in_progress"
                            ? false
                            : true
                        }
                        title={m.title}
                        milestoneIndex={m.milestoneId}
                        closeView={() => setViewingMilestoneIndex(null)}
                      />
                    </Suspense>
                  )}
                </>
              ) : (
                ""
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="p-4">
            <span>There is no milestones</span>
          </td>
        </tr>
      )}
    </>
  );
}

export default MilestonesTable;
