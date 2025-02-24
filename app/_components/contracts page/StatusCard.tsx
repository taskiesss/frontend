import React from "react";

type Props = { status: string };

export default function StatusCard({ status }: Props) {
  if (status.toLowerCase() === "active") {
    return (
      <span className=" items-center px-2 py-1 rounded-full text-md font-medium bg-[var(--status-active)] text-white">
        Active
      </span>
    );
  } else if (status.toLowerCase() === "pending") {
    return (
      <span className=" items-center px-2 py-1 rounded-xl text-md font-medium bg-[var(--status-pending)] text-white">
        Pending
      </span>
    );
  } else if (status.toLowerCase() === "ended")
    return (
      <span className=" items-center px-2 py-1 rounded-xl text-md font-medium bg-[var(--status-ended)] text-white">
        Ended
      </span>
    );
}
