"use client";

import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

interface ContractConversationProps {
  convo: {
    content: string;
    convoId: string;
    convoOwner: {
      profilePicture: string;
      name: string;
      role: string;
      id: string;
    };
    date: string;
  };
  role?: string;
}

export default function ContractConversationCard({
  convo,
  role,
}: ContractConversationProps) {
  const formattedDate = format(new Date(convo.date), "PPP p"); // e.g., "May 10, 2025 2:28 PM"
  console.log(convo.convoOwner, convo.content, convo.date);
  return (
    <div className="p-4 shadow-sm border-b ">
      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        {/* Profile Picture Column */}
        <Link
          href={
            convo.convoOwner.role === "CLIENT"
              ? role === "client"
                ? `/nx/client/myprofile`
                : `/nx/freelancer/client-profile/${convo.convoOwner.id}`
              : role === "client"
              ? `/nx/client/discover-talents/${convo.convoOwner.id}`
              : `/nx/freelancer/myprofile`
          }
          className="flex justify-center"
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={convo.convoOwner.profilePicture}
              alt={`${convo.convoOwner.name}'s profile`}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        {/* Text Content Column */}
        <div>
          {/* Name and Date Row */}
          <div className="flex justify-between text-sm">
            <Link
              href={
                convo.convoOwner.role === "CLIENT"
                  ? role === "client"
                    ? `/nx/client/myprofile`
                    : `/nx/freelancer/client-profile/${convo.convoOwner.id}`
                  : role === "client"
                  ? `/nx/client/discover-talents/${convo.convoOwner.id}`
                  : `/nx/freelancer/myprofile`
              }
              className="font-medium text-base hover:underline"
            >
              {convo.convoOwner.name}
            </Link>
            <span>{formattedDate}</span>
          </div>

          {/* Content Row */}
          <div className="mt-1">
            <p className="text-base">{JSON.parse(convo.content).content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
