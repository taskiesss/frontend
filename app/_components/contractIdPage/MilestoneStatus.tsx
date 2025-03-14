import React from "react";

type Props = {
  status: "not_started" | "pending_review" | "in_progress" | "approved";
};

function MilestoneStatus({ status }: Props) {
  if (status.toLowerCase() === "approved") {
    return (
      <span className=" items-center px-3 py-2 rounded-full text-md font-medium bg-[var(--status-active)] text-white">
        Approved
      </span>
    );
  } else if (status.toLowerCase() === "pending_review") {
    return (
      <span className=" items-center px-3 py-2 rounded-xl text-md font-medium bg-[var(--status-pending)] text-white">
        In Review
      </span>
    );
  } else if (status.toLowerCase() === "in_progress")
    return (
      <span className=" items-center px-3 py-2 rounded-xl text-md font-medium bg-[var(--status-inprogress)] text-white">
        In Progress
      </span>
    );
  else if (status.toLowerCase() === "not_started")
    return (
      <span className=" items-center px-3 py-2 rounded-xl text-md font-medium bg-[var(--status-ended)] text-white">
        Not Started
      </span>
    );
}

export default MilestoneStatus;
