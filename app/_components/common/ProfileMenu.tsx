// ProfileMenu.tsx
import React from "react";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faComments,
  faAddressCard,
  faArrowAltCircleLeft,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

interface ProfileMenuProps {
  role: string;
  name: string;
  avatarUrl: string | StaticImageData;
  onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  role,
  name,
  avatarUrl,
  onClose,
}) => {
  return (
    <div className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] bg-[var(--background-color)] py-3 sm:py-4 md:py-5 border border-[var(--border-color)] border-solid rounded-md shadow-sm">
      {/* Header with avatar and name */}
      <Link
        href={`/nx/${role.toLowerCase()}/myprofile`}
        className="flex flex-col items-center py-2 hover:bg-[var(--hover-color)] transition-colors"
      >
        <button onClick={onClose} className="text-start w-full">
          <div className="flex w-full items-center gap-2 sm:gap-3 px-3 sm:px-4">
            <div className="relative w-12 sm:w-14 aspect-square flex-shrink-0">
              <Image
                src={avatarUrl}
                alt="Profile photo"
                fill
                quality={100}
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold truncate">
                {name}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--accent-color)] opacity-80 capitalize">
                {role.toLowerCase()}
              </p>
            </div>
          </div>
        </button>
      </Link>

      {/* Menu items with regular icons */}
      <nav className="mt-1 sm:mt-2">
        <ul className="flex flex-col gap-1 sm:gap-2">
          <li className="hover:bg-[var(--hover-color)] transition-colors">
            <button onClick={onClose} className="w-full text-start">
              <Link
                href={`/nx/${role.toLowerCase()}/myprofile`}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-5 sm:w-6 text-base sm:text-lg flex-shrink-0"
                />
                <span className="text-sm sm:text-base md:text-lg">
                  Your profile
                </span>
              </Link>
            </button>
          </li>

          <li className="hover:bg-[var(--hover-color)] transition-colors">
            <button onClick={onClose} className="w-full text-start">
              <Link
                href={"#"}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-5 sm:w-6 text-base sm:text-lg flex-shrink-0"
                />
                <span className="text-sm sm:text-base md:text-lg">
                  Messages
                </span>
              </Link>
            </button>
          </li>

          {role === "FREELANCER" && (
            <li className="hover:bg-[var(--hover-color)] transition-colors">
              <button onClick={onClose} className="w-full text-start">
                <Link
                  href={`/nx/${role.toLowerCase()}/mycommunities`}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full"
                >
                  <FontAwesomeIcon
                    icon={faComments}
                    className="w-5 sm:w-6 text-base sm:text-lg flex-shrink-0"
                  />
                  <span className="text-sm sm:text-base md:text-lg">
                    Your Communities
                  </span>
                </Link>
              </button>
            </li>
          )}

          <li className="hover:bg-[var(--hover-color)] transition-colors">
            <button onClick={onClose} className="w-full text-start">
              <Link
                href={"#"}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full"
              >
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="w-5 sm:w-6 text-base sm:text-lg flex-shrink-0"
                />
                <span className="text-sm sm:text-base md:text-lg">
                  Account settings
                </span>
              </Link>
            </button>
          </li>

          <li className="hover:bg-[var(--hover-color)] transition-colors">
            <button onClick={onClose} className="w-full text-start">
              <Link
                href={"/login"}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full"
              >
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  className="w-5 sm:w-6 text-base sm:text-lg flex-shrink-0"
                />
                <span className="text-sm sm:text-base md:text-lg">Log out</span>
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileMenu;
