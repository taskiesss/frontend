import {
  NotificationDest,
  NotificationResponseDTO,
} from "@/app/_types/NotificationResponse";
import {
  faFileAlt,
  faFileSignature,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

type Props = { role: string; notification: NotificationResponseDTO };

function NotificationCard({ role, notification }: Props) {
  const [onHover, setOnHover] = useState(false);
  let icon = faFileSignature;
  let url: string = "/";
  switch (notification.type) {
    case NotificationDest.COMMUNITY_JOBS_AND_TALENTS:
      icon = faUsers;
      url = `/nx/freelancer/communities/${notification.routeId}/board`;
      break;
    case NotificationDest.COMMUNITY_POSTS:
      icon = faUsers;
      url = `/nx/freelancer/communities/${notification.routeId}/posts`;
      break;
    case NotificationDest.COMMUNITY_PROFILE:
      icon = faUsers;
      url = `/nx/freelancer/communities/${notification.routeId}/about`;
      break;
    case NotificationDest.COMMUNITY_SETTINGS:
      icon = faUsers;
      url = `/nx/freelancer/communities/${notification.routeId}/settings`;
      break;
    case NotificationDest.CONTRACT:
      icon = faFileSignature;
      url =
        role.toLowerCase() === "client"
          ? `/nx/client/mycontracts/${notification.routeId}`
          : `/nx/freelancer/mycontracts/${notification.routeId}`;
      break;
    case NotificationDest.CONTRACT_COMMUNITY:
      icon = faFileSignature;
      url =
        role.toLowerCase() === "client"
          ? `/nx/client/mycontracts/${notification.routeId}`
          : `/nx/freelancer/communities/${"mycommunity"}/contracts/${
              notification.routeId
            }`;
      break;
    case NotificationDest.PROPOSAL:
      icon = faFileAlt;
      url =
        role.toLowerCase() === "client"
          ? `/nx/client/all-proposals/${notification.routeId}`
          : `/nx/freelancer/proposals/myProposals/${notification.routeId}`;
      break;

    default:
      url = "/";
      break;
  }

  return (
    <Link
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      href={url}
      className="flex  items-center gap-4 p-4 py-6 w-full"
    >
      <FontAwesomeIcon icon={icon} size="lg" className="self-start py-1" />
      <div className="flex flex-col items-start gap-1">
        <p className="text-base whitespace-pre-wrap self-start">
          {onHover || notification.content.length < 90
            ? notification.content
            : notification.content.slice(0, 90) + "..."}
        </p>
        {!notification.read && (
          <p className="bg-blue-500 text-sm rounded-xl overflow-hidden p-2 text-white">
            New!
          </p>
        )}
      </div>
    </Link>
  );
}

export default NotificationCard;
