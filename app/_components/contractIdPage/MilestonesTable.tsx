import { formatDayMonthToString } from "@/app/_helpers/helper";
import { ContractMilestones } from "@/app/_types/ContractDetailsResponse";
import MoreOptionButton from "./MoreOptionButton";
import MilestoneStatus from "./MilestoneStatus";

type Props = { milestones: ContractMilestones };

function MilestonesTable({ milestones }: Props) {
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
              {m.status.toLowerCase() === "in_progress" && <MoreOptionButton />}
              {m.status.toLowerCase() === "in_review" ||
              m.status.toLowerCase() === "approved" ? (
                <button className="bg-[var(--btn-color)] t px-3 py-1.5 rounded hover:bg-[var(--hover-color)]">
                  View submissions
                </button>
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
