// ProfileMenu.tsx
import {
  faArrowAltCircleLeft,
  faComments,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

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
        onClick={onClose}
      >
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
      </Link>

      {/* Menu items with regular icons */}
      <nav className="mt-1 sm:mt-2">
        <ul className="flex flex-col gap-1 sm:gap-2">
          <li className="hover:bg-[var(--hover-color)] transition-colors">
            <Link
              href={`/nx/${role.toLowerCase()}/myprofile`}
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full"
              onClick={onClose}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="w-5 sm:w-6 text-base sm:text-lg flex-shrink-0"
              />
              <span className="text-sm sm:text-base md:text-lg">
                Your profile
              </span>
            </Link>
          </li>

          {role === "FREELANCER" && (
            <li className="hover:bg-[var(--hover-color)] transition-colors">
              <Link
                href={`/nx/${role.toLowerCase()}/mycommunities`}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full"
                onClick={onClose}
              >
                <FontAwesomeIcon
                  icon={faComments}
                  className="w-5 sm:w-6 text-base sm:text-lg flex-shrink-0"
                />
                <span className="text-sm sm:text-base md:text-lg">
                  Your Communities
                </span>
              </Link>
            </li>
          )}

          <li className="hover:bg-[var(--hover-color)] transition-colors">
            <Link
              href={"/login"}
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 w-full"
              onClick={onClose}
            >
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                className="w-5 sm:w-6 text-base sm:text-lg flex-shrink-0"
              />
              <span className="text-sm sm:text-base md:text-lg">Log out</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileMenu;
