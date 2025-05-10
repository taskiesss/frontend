"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import logo_dark from "@/public/images/logo_dark.png";
import Image from "next/image";
import Container from "./Container";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import DropLoggedin from "./DropLoggedin";
import ProfileMenu from "./ProfileMenu";
import userProfile from "@/public/images/userprofile.jpg";
import Cookies from "js-cookie";
import ProtectedPage from "./ProtectedPage";
import { useDispatch } from "react-redux";
import { updateAuthInfo } from "@/app/_store/_contexts/userSlice";
import useWebSocket from "@/app/_lib/Notification/useWebSocket";
import NotificationList from "./NotificationList";
import NotificationCard from "./NotificationCard";
import {
  NotificationDest,
  NotificationResponseDTO,
  NotificationWebSocketDTO,
} from "@/app/_types/NotificationResponse";

interface NavItem {
  label: string;
  options: { label: string; link: string }[];
}

const testNotification = {
  notification: {
    type: "PROPOSAL",
    content:
      "You received a new proposal for your job posting 'Web Developer Needed'.",
    routeId: "12345",
    read: false,
  },
  newNotificationsCount: 3,
};

const NavLoggedin: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  // Store user name and image from API
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [newNotifications, setNewNotifications] = useState(0);
  const [userId, setUserId] = useState("");

  // Notification states
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Control showing/hiding ProfileMenu
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [isError, setIsError] = useState(false);

  // State for managing alerts
  const [alerts, setAlerts] = useState<
    { id: number; notification: NotificationResponseDTO }[]
  >([]);

  // Ref for detecting clicks outside the profile menu container
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const token = Cookies.get("token");

  const { messages } = useWebSocket(userId, token);

  // Add new alert when a WebSocket message is received
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[
        messages.length - 1
      ] as NotificationWebSocketDTO;
      setAlerts((prev) => [
        ...prev,
        { id: Date.now(), notification: latestMessage.notification },
      ]);
      setNewNotifications(latestMessage.newNotificationsCount);
    }
  }, [messages]);

  // Auto-remove alerts after 5 seconds
  useEffect(() => {
    if (alerts.length > 0) {
      const timers = alerts.map((alert) =>
        setTimeout(() => {
          setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
        }, 5000)
      );
      return () => timers.forEach((timer) => clearTimeout(timer));
    }
  }, [alerts]);

  useEffect(() => {
    const fetchUserNameAndImage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/name-and-picture`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 403) {
          setIsError(true);
        }
        const data = await response.json();
        setImage(data.profilePicture);
        setName(data.name);
        dispatch(
          updateAuthInfo({
            profilePic: data.profilePicture,
            newNotifications: data.newNotifications,
            userId: data.id,
          })
        );
        // console.log(data);
        setUserId(data.id);
        setRole(data.role);
        setNewNotifications(data.newNotifications);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchUserNameAndImage();
  }, [token, notificationOpen]);

  // Close profile menu when clicking outside its container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close profile menu when clicking outside its container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isError) {
    return <ProtectedPage message="Please login again"></ProtectedPage>;
  }

  // Your nav items
  const navItems: NavItem[] =
    role === "FREELANCER"
      ? [
          {
            label: "My Tasks",
            options: [
              { label: "All contracts", link: "/nx/freelancer/mycontracts" },
            ],
          },
          {
            label: "Explore Jobs",
            options: [
              { label: "Find work", link: "/nx/freelancer/find-work" },
              { label: "Saved Jobs", link: "/nx/freelancer/saved-jobs" },
              {
                label: "Proposals",
                link: "/nx/freelancer/proposals/myProposals",
              },
            ],
          },
          {
            label: "Finance",
            options: [
              { label: "Transactions", link: "/nx/freelancer/transactions" },
            ],
          },
        ]
      : [
          {
            label: "My Jobs",
            options: [
              { label: "Post a job", link: "/nx/client/job-post" },
              { label: "My posted job", link: "/nx/client/all-jobs" },
              { label: "All Proposals", link: "/nx/client/all-proposals" },
              { label: "All contracts", link: "/nx/client/mycontracts" },
            ],
          },
          {
            label: "Discover Talents",
            options: [
              {
                label: "Discover talents",
                link: "/nx/client/discover-talents",
              },
              {
                label: "Discover communities",
                link: "/nx/client/discover-communities",
              },
            ],
          },
          {
            label: "Finance",
            options: [
              { label: "Transactions", link: "/nx/client/transactions" },
            ],
          },
        ];

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;

    const currentPath = window.location.pathname;
    const searchRegex = /^\/search\/(jobs|freelancers|communities)(\/)?$/i;

    if (searchRegex.test(currentPath)) {
      router.push(`${currentPath}?query=${encodeURIComponent(searchTerm)}`);
    } else {
      const searchtype = currentPath.includes("find-work")
        ? "jobs"
        : currentPath.includes("find-talents") ||
          currentPath.includes("discover-talents")
        ? "freelancers"
        : currentPath.includes("communities") ||
          currentPath.includes("discover-communities")
        ? "communities"
        : role === "FREELANCER"
        ? "jobs"
        : "freelancers";
      router.push(
        `/nx/${role.toLowerCase()}/search/${searchtype}?query=${encodeURIComponent(
          searchTerm
        )}`
      );
    }
  };

  // Toggle the standard nav dropdowns
  const toggleDropdown = (index: number | null) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    if (index === null) setIsProfileMenuOpen(false);
  };

  // Toggle the ProfileMenu dropdown
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Dynamic Alerts */}
      <div className="fixed bottom-5 left-5 z-30 flex flex-col-reverse gap-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-[--foreground-color] rounded-lg shadow-lg w-[25rem]  animate-slide-in"
          >
            <NotificationCard role={role} notification={alert.notification} />
          </div>
        ))}
      </div>

      <Container className="z-20 mx-0 bg-transparent">
        <nav className="bg-[var(--background-color)] py-10 grid grid-rows-1 grid-cols-[min-content,1fr,1fr] place-items-center ">
          {/* Logo Section */}
          <div className="flex w-[10rem] h-auto justify-center flex-col">
            <Link
              href={
                role === "CLIENT"
                  ? `/nx/client/discover-talents`
                  : "/nx/freelancer/find-work"
              }
            >
              <Image
                src={logo_dark}
                alt="Taskaya Logo"
                className="h-auto w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="w-full">
            <ul className="list-none flex justify-around items-center">
              {navItems.map((item, index) => (
                <li
                  key={item.label}
                  onMouseEnter={() => toggleDropdown(index)}
                  onMouseLeave={() => toggleDropdown(null)}
                  className="relative flex flex-col items-center"
                >
                  <div className="flex items-center gap-1">
                    <button
                      className={`bg-inherit cursor-pointer ${
                        openDropdownIndex === index &&
                        "text-[--button-hover-background-color]"
                      }`}
                    >
                      <span className="font-semibold text-xl">
                        {item.label}
                      </span>
                    </button>
                    <button className="p-1">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`text-[var(--hover-color)] text-sm transition-transform duration-200 ${
                          openDropdownIndex === index ? "rotate-180" : ""
                        }`}
                        size="sm"
                      />
                    </button>
                  </div>
                  {openDropdownIndex === index && (
                    <div className="absolute top-full left-0 shadow-md">
                      <DropLoggedin
                        onClose={() => toggleDropdown(index)}
                        options={item.options}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Search & Profile Section */}
          <div className="flex flex-col justify-center w-full">
            <ul className="list-none flex items-center justify-between gap-7">
              {/* Search Form */}
              <li>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <button
                        aria-label="Search"
                        className="bg-inherit p-0 cursor-pointer flex"
                        type="submit"
                      >
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          className="text-gray-400 text-xl"
                        />
                      </button>
                    </div>
                    <input
                      type="text"
                      name="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="What are you looking for?"
                      className="bg-[var(--background-color)] placeholder:text-gray-400 pl-[3rem] p-2 w-[28rem] rounded-2xl border-solid border border-[var(--border-color)] focus:outline-none focus:ring-2"
                    />
                  </div>
                </form>
              </li>

              {/* Notification & Profile */}
              <li>
                <div className="flex gap-7 items-center ">
                  <div
                    ref={notificationMenuRef}
                    onClick={() => setNotificationOpen((prev) => !prev)}
                    className="relative cursor-pointer"
                  >
                    <div className="relative border-solid rounded-full border border-[--accent-color] border-opacity-80 aspect-square p-2 min-w-12 flex flex-col justify-center">
                      {newNotifications !== 0 && (
                        <div className="rounded-full bg-red-500 text-center absolute left-6 -top-2   aspect-square justify-center self-center flex flex-col z-20 text-sm min-w-6">
                          {newNotifications}
                        </div>
                      )}
                      <FontAwesomeIcon
                        size="xl"
                        icon={faBell}
                        className="cursor-pointer"
                        shake={newNotifications !== 0}
                      />
                    </div>
                    {notificationOpen && (
                      <div className="absolute top-full -right-4 mt-4 ">
                        <NotificationList
                          isOpen={notificationOpen}
                          role={role}
                          onClose={() => setIsProfileMenuOpen(false)}
                        />
                      </div>
                    )}
                  </div>
                  {/* Wrap avatar and dropdown in a container with a ref */}
                  <div ref={profileMenuRef} className="relative">
                    <div
                      className="relative w-12 aspect-square rounded-full overflow-hidden cursor-pointer"
                      onClick={toggleProfileMenu}
                    >
                      <Image
                        src={image || userProfile}
                        fill
                        alt="userProfile"
                        className="object-cover"
                        sizes="(max-width: 768px) 48px, 64px" // 48px on mobile, 64px on desktop
                      />
                    </div>
                    {isProfileMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 ">
                        <ProfileMenu
                          role={role}
                          onClose={() => setIsProfileMenuOpen(false)}
                          name={name || "Ahmed"}
                          avatarUrl={image || userProfile}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </>
  );
};

export default NavLoggedin;
