import { formatDayMonthToString } from "@/app/_helpers/helper";
import { ContractMilestones } from "@/app/_types/ContractDetailsResponse";
import MoreOptionButton from "./MoreOptionButton";
import MilestoneStatus from "./MilestoneStatus";
import { Suspense, useState } from "react";
import ViewSubmission from "./ViewSubmissions";
import Spinner from "../common/Spinner";

type Props = { milestones: ContractMilestones; contractId: string };

function MilestonesTable({ milestones, contractId }: Props) {
  const [viewingMilestoneIndex, setViewingMilestoneIndex] = useState<
    number | null
  >(null);
  // console.log(milestones);
  return (
    <>
      {milestones.content.length > 0 ? (
        milestones.content.map((m, i) => (
          <tr key={i} className="border-b border-solid border-b-gray-500 ">
            <td className="px-4 py-4 align-top w-1/12 text-lg">{m.title}</td>
            <td className="px-4 py-4 align-top w-3/12 text-lg">
              <p className="whitespace-pre-wrap">{m.description}</p>
            </td>
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
              {m.status.toLowerCase() === "in_progress" && (
                <MoreOptionButton
                  contractId={contractId}
                  milestoneIndex={m.milestoneId}
                  title={m.title}
                />
              )}
              {m.status.toLowerCase() === "in_review" ||
              m.status.toLowerCase() === "approved" ? (
                <>
                  <button
                    onClick={() => setViewingMilestoneIndex(i)}
                    className="bg-[var(--btn-color)] t px-3 py-1.5 rounded hover:bg-[var(--hover-color)]"
                  >
                    View submissions
                  </button>
                  {viewingMilestoneIndex === i && (
                    <Suspense fallback={<Spinner />}>
                      <ViewSubmission
                        contractId={contractId}
                        notEditable={true}
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
        <span>There is no milestones</span>
      )}
    </>
  );
}

export default MilestonesTable;
