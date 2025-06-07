"use client";

import Image from "next/image";
import { format } from "date-fns";

interface ContractConversationProps {
  convoId: string;
  convoOwner: {
    profilePicture: string;
    name: string;
    role: string;
    id: string;
  };
  content: string;
  date: string; // ISO date string like "2025-05-10T14:28:41.719+00:00"
}

export default function ContractConversationCard({
  convoOwner,
  content,
  date,
}: ContractConversationProps) {
  const formattedDate = format(new Date(date), "PPP p"); // e.g., "May 10, 2025 2:28 PM"

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-[var(--foreground-color)]">
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        {/* Profile Picture Column */}
        <div className="flex justify-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={convoOwner.profilePicture}
              alt={`${convoOwner.name}'s profile`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text Content Column */}
        <div>
          {/* Name and Date Row */}
          <div className="flex justify-between text-sm">
            <span className="font-medium">{convoOwner.name}</span>
            <span>{formattedDate}</span>
          </div>

          {/* Content Row */}
          <div className="mt-1">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
