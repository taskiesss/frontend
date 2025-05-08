import {
  getNotifications,
  markAsRead,
} from "@/app/_lib/Notification/NotificationsAPI";
import { PaginatedNotificationResponse } from "@/app/_types/NotificationResponse";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import ProtectedPage from "./ProtectedPage";

type Props = { role: string; onClose: () => void; isOpen: boolean };

const defaultEmptyResponse: PaginatedNotificationResponse = {
  content: [],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: { empty: true, unsorted: true, sorted: false },
    offset: 0,
    unpaged: true,
    paged: false,
  },
  last: true,
  totalPages: 0,
  totalElements: 0,
  size: 0,
  number: 0,
  sort: { empty: true, unsorted: true, sorted: false },
  numberOfElements: 0,
  first: true,
  empty: true,
};

// const notificationsList: PaginatedNotificationResponse = {
//   content: [
//     {
//       notificationId: "notif001",
//       content: "New proposal received for project X ",
//       isRead: false,
//       type: NotificationDest.PROPOSAL,
//       routeId: "route001",
//     },
//     {
//       notificationId: "notif002",
//       content: "Contract signed for project Y",
//       isRead: true,
//       type: NotificationDest.CONTRACT,
//       routeId: "route002",
//     },
//     {
//       notificationId: "notif003",
//       content: "New community post in Jobs & Talents",
//       isRead: false,
//       type: NotificationDest.COMMUNITY_JOBS_AND_TALENTS,
//       routeId: "route003",
//     },
//     {
//       notificationId: "notif003",
//       content: "New community post in Jobs & Talents",
//       isRead: false,
//       type: NotificationDest.COMMUNITY_JOBS_AND_TALENTS,
//       routeId: "route003",
//     },
//     {
//       notificationId: "notif003",
//       content: "New community post in Jobs & Talents",
//       isRead: false,
//       type: NotificationDest.COMMUNITY_JOBS_AND_TALENTS,
//       routeId: "route003",
//     },
//     {
//       notificationId: "notif003",
//       content: "New community post in Jobs & Talents",
//       isRead: false,
//       type: NotificationDest.COMMUNITY_JOBS_AND_TALENTS,
//       routeId: "route003",
//     },
//   ],
//   pageable: {
//     pageNumber: 0,
//     pageSize: 10,
//     sort: {
//       empty: false,
//       unsorted: false,
//       sorted: true,
//     },
//     offset: 0,
//     unpaged: false,
//     paged: true,
//   },
//   last: false,
//   totalPages: 3,
//   totalElements: 25,
//   size: 10,
//   number: 0,
//   sort: {
//     empty: false,
//     unsorted: false,
//     sorted: true,
//   },
//   numberOfElements: 3,
//   first: true,
//   empty: false,
// };

function NotificationList({ role, onClose, isOpen }: Props) {
  const [notificationsResponse, setNotificationsResponse] = useState<
    {
      notifications: PaginatedNotificationResponse;
      page: number;
    }[]
  >([]);
  console.log("notifications", notificationsResponse);
  const [isLast, setIsLast] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isForbidden, setIsForbidden] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = Cookies.get("token");
      const response = await getNotifications(token, currentPage, 5);
      if (response.error) {
        if (
          response.error === "Forbidden" ||
          response.error === "Unauthorized user"
        ) {
          setIsForbidden(true);
        } else {
          console.error("Error fetching comments:", response.error);
        }
        return;
      }

      // Validation logic
      if (!response.content || !Array.isArray(response.content)) {
        console.warn("Invalid or missing content in API response:", response);
        setNotificationsResponse((state) => {
          const existingPage = state.find((c) => c.page === currentPage);
          if (existingPage) {
            return state.map((c) =>
              c.page === currentPage
                ? {
                    notifications: {
                      ...defaultEmptyResponse,
                      last: response.last ?? true,
                    },
                    page: currentPage,
                  }
                : c
            );
          }
          return [
            ...state,
            {
              notifications: {
                ...defaultEmptyResponse,
                last: response.last ?? true,
              },
              page: currentPage,
            },
          ];
        });
        setIsLast(response.last ?? true);
        return;
      }

      // Update notification state
      setNotificationsResponse((state) => {
        const existingPage = state.find((c) => c.page === currentPage);
        if (existingPage) {
          return state.map((c) =>
            c.page === currentPage
              ? { notifications: response, page: currentPage }
              : c
          );
        }
        return [...state, { notifications: response, page: currentPage }];
      });
      setIsLast(response.last);
    };
    fetchNotifications();
  }, [currentPage, isOpen]);

  const handleClose = async (id: string) => {
    const token = Cookies.get("token");
    const response = await markAsRead(id, token);
    console.log(response);
    setCurrentPage(0);
    setNotificationsResponse([]);
    onClose();
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in again" />
    );
  }

  return (
    <div className="min-w-[25rem] max-h-[20rem] bg-[var(--background-color)] border-2 border-[var(--border-color)] border-solid rounded-md overflow-y-auto shadow-lg ">
      <nav>
        <ul className="flex flex-col  w-full">
          {notificationsResponse.map((notificationsList, index) => (
            <div key={index}>
              {notificationsList.notifications.content.map((n, i) => (
                <li
                  key={i}
                  className={`text-md hover:bg-[var(--border-color)] ${
                    i !== notificationsList.notifications.content.length - 1
                      ? "border-b border-solid border-[--border-color]"
                      : ""
                  }`}
                >
                  <button
                    onClick={() => handleClose(n.notificationId)}
                    className="text-start self-start"
                  >
                    <NotificationCard role={role} notification={n} />
                  </button>
                </li>
              ))}
            </div>
          ))}
          {notificationsResponse[0]?.notifications.content.length === 0 && (
            <p className="p-4 py-6 text-center cursor-default">
              There is no Notification
            </p>
          )}
          {!isLast && (
            <button
              onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
              className="text-base text-[var(--button-hover-background-color)] hover:underline"
            >
              Load more comments
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NotificationList;
