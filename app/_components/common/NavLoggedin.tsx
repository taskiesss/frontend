"use client";
import useWebSocket from "@/app/_lib/Notification/useWebSocket";
import { updateAuthInfo } from "@/app/_store/_contexts/userSlice";
import {
  NotificationResponseDTO,
  NotificationWebSocketDTO,
} from "@/app/_types/NotificationResponse";
import logo_dark from "@/public/images/logo_dark.png";
import userProfile from "@/public/images/userprofile.jpg";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Container from "./Container";
import DropLoggedin from "./DropLoggedin";
import NotificationCard from "./NotificationCard";
import NotificationList from "./NotificationList";
import ProfileMenu from "./ProfileMenu";
import ProtectedPage from "./ProtectedPage";

interface NavItem {
  label: string;
  options: { label: string; link: string }[];
}

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Ref for detecting clicks outside the profile menu container
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const timerRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});

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

  // Auto-remove alerts after 8 seconds and handle timer cleanup
  useEffect(() => {
    if (alerts.length > 0) {
      alerts.forEach((alert) => {
        // Only set a new timer if one doesn't exist
        if (!timerRefs.current[alert.id]) {
          timerRefs.current[alert.id] = setTimeout(() => {
            setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
            delete timerRefs.current[alert.id]; // Clean up timer
          }, 8000);
        }
      });

      // Cleanup all timers on unmount or when alerts change
      return () => {
        Object.values(timerRefs.current).forEach((timer) =>
          clearTimeout(timer)
        );
        timerRefs.current = {}; // Reset timers
      };
    }
  }, [alerts]);

  // Handle hover to restart timer for a specific alert
  const handleMouseEnter = (alertId: number) => {
    // Clear existing timer for this alert
    console.log(timerRefs);
    if (timerRefs.current[alertId]) {
      clearTimeout(timerRefs.current[alertId]);
      delete timerRefs.current[alertId];
    }
    // Start a new 8-second timer
    timerRefs.current[alertId] = setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== alertId));
      delete timerRefs.current[alertId];
    }, 8000);
  };

  useEffect(() => {
    const fetchUserNameAndImage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/name-and-picture`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 403 || response.status === 401) {
          setIsError(true);
        }
        if (response.status === 400) {
          const error = await response.json();
          throw new Error(error.message);
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
            onMouseEnter={() => handleMouseEnter(alert.id)}
            className="bg-[--foreground-color] rounded-lg shadow-lg w-[25rem] animate-slide-in"
          >
            <NotificationCard role={role} notification={alert.notification} />
          </div>
        ))}
      </div>

      <Container className="z-20 mx-0 bg-transparent w-full">
        <nav className="bg-[var(--background-color)] py-3 sm:py-4 md:py-6 lg:py-8 xl:py-10 relative">
          {/* Top Bar - Logo and Actions */}
          <div className="flex items-center justify-between w-full">
            {/* Logo Section */}
            <div className="flex-shrink-0 w-[7rem] sm:w-[8rem] md:w-[9rem] lg:w-[10rem]">
              <Link
                href={
                  role === "CLIENT"
                    ? `/nx/client/discover-talents`
                    : "/nx/freelancer/find-work"
                }
                className="block w-full"
              >
                <Image
                  src={logo_dark}
                  alt="Taskaya Logo"
                  className="w-full h-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="list-none flex justify-around items-center w-full max-w-3xl">
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
                        <span className="font-semibold text-xl hover:text-[var(--btn-color)] transition-colors">
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
                      <div className="absolute top-full left-0 shadow-md z-50">
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

            {/* Desktop Search & Profile Section */}
            <div className="hidden lg:flex items-center gap-4 lg:gap-7 flex-shrink-0">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <button
                      aria-label="Search"
                      className="bg-inherit p-0 cursor-pointer flex"
                      type="submit"
                    >
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="text-gray-400 text-lg lg:text-xl"
                      />
                    </button>
                  </div>
                  <input
                    type="text"
                    name="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className="bg-[var(--background-color)] placeholder:text-gray-400 pl-[2.5rem] lg:pl-[3rem] p-2 w-[16rem] sm:w-[20rem] md:w-[24rem] lg:w-[28rem] rounded-2xl border-solid border border-[var(--border-color)] focus:outline-none focus:ring-2 text-sm lg:text-base"
                  />
                </div>
              </form>

              {/* Notification & Profile */}
              <div className="flex gap-4 lg:gap-7 items-center">
                <div
                  ref={notificationMenuRef}
                  onClick={() => setNotificationOpen((prev) => !prev)}
                  className="relative cursor-pointer"
                >
                  <div className="relative border-solid rounded-full border border-[--accent-color] border-opacity-80 aspect-square p-2 min-w-12 flex flex-col justify-center">
                    {newNotifications !== 0 && (
                      <div className="rounded-full bg-red-500 text-center absolute left-6 -top-2 aspect-square justify-center self-center flex flex-col z-20 text-sm min-w-6">
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
                    <div className="absolute top-full -right-4 mt-4 z-50">
                      <NotificationList
                        isOpen={notificationOpen}
                        role={role}
                        onClose={() => setNotificationOpen(false)}
                      />
                    </div>
                  )}
                </div>
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
                      sizes="(max-width: 768px) 48px, 64px"
                    />
                  </div>
                  {isProfileMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 z-50">
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
            </div>

            {/* Mobile & Tablet Menu Buttons */}
            <div className="flex lg:hidden items-center gap-3 sm:gap-4 flex-shrink-0">
              {/* Search Toggle */}
              <button
                id="search-toggle-button"
                onClick={() => {
                  setIsSearchVisible(!isSearchVisible);
                  if (isMenuOpen) setIsMenuOpen(false);
                }}
                className="p-2 hover:text-[var(--btn-color)] transition-colors"
                aria-label="Toggle search"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-lg sm:text-xl md:text-2xl"
                />
              </button>

              {/* Menu Toggle */}
              <button
                id="menu-toggle-button"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  if (isSearchVisible) setIsSearchVisible(false);
                }}
                className="p-2 hover:text-[var(--btn-color)] transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <FontAwesomeIcon
                  icon={isMenuOpen ? faXmark : faBars}
                  className="text-xl sm:text-2xl md:text-3xl"
                />
              </button>

              {/* Notification Icon */}
              <div
                ref={notificationMenuRef}
                onClick={() => setNotificationOpen((prev) => !prev)}
                className="relative cursor-pointer"
              >
                <div className="relative border-solid rounded-full border border-[--accent-color] border-opacity-80 aspect-square p-2 min-w-10 sm:min-w-12 flex flex-col justify-center">
                  {newNotifications !== 0 && (
                    <div className="rounded-full bg-red-500 text-center absolute left-5 sm:left-6 -top-2 aspect-square justify-center self-center flex flex-col z-20 text-sm min-w-5 sm:min-w-6">
                      {newNotifications}
                    </div>
                  )}
                  <FontAwesomeIcon
                    size="lg"
                    icon={faBell}
                    className="cursor-pointer text-lg sm:text-xl md:text-2xl"
                    shake={newNotifications !== 0}
                  />
                </div>
                {notificationOpen && (
                  <div className="absolute top-full right-0 mt-2 z-50">
                    <NotificationList
                      isOpen={notificationOpen}
                      role={role}
                      onClose={() => setNotificationOpen(false)}
                    />
                  </div>
                )}
              </div>

              {/* Profile Image - Now at the rightmost position */}
              <div ref={profileMenuRef} className="relative ml-2">
                <div
                  className="relative w-10 sm:w-12 aspect-square rounded-full overflow-hidden cursor-pointer"
                  onClick={toggleProfileMenu}
                >
                  <Image
                    src={image || userProfile}
                    fill
                    alt="userProfile"
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                {isProfileMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 z-50">
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
          </div>

          {/* Mobile & Tablet Search Bar - Now under the top bar */}
          {isSearchVisible && (
            <div className="lg:hidden w-full mt-3 sm:mt-4 px-4 sm:px-6">
              <form
                onSubmit={handleSearch}
                className="relative w-full max-w-2xl mx-auto"
              >
                <input
                  type="text"
                  name="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full bg-[var(--background-color)] placeholder:text-gray-400 pl-10 sm:pl-12 md:pl-14 p-2 md:p-3 rounded-2xl border-solid border border-[var(--border-color)] focus:outline-none focus:ring-2 text-sm sm:text-base md:text-lg"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  aria-label="Search"
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-gray-400 text-lg sm:text-xl md:text-2xl"
                  />
                </button>
              </form>
            </div>
          )}

          {/* Mobile & Tablet Menu */}
          {isMenuOpen && (
            <div
              id="mobile-menu"
              className="lg:hidden w-full bg-[var(--background-color)] border-t border-[var(--border-color)] shadow-lg z-50"
            >
              <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6">
                {/* Navigation Links */}
                <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                  {navItems.map((item) => (
                    <li
                      key={item.label}
                      className="border-b border-[var(--border-color)] pb-2"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-base sm:text-lg md:text-xl mb-2">
                          {item.label}
                        </span>
                        <ul className="pl-4 space-y-2">
                          {item.options.map((option) => (
                            <li key={option.label}>
                              <Link
                                href={option.link}
                                className="block py-1 text-sm sm:text-base md:text-lg text-[var(--accent-color)] hover:text-[var(--btn-color)] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {option.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </nav>
      </Container>
    </>
  );
};

export default NavLoggedin;
