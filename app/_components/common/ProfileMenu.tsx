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
    <div className="w-64 bg-[var(--background-color)] py-4 border border-[var(--border-color)] border-solid rounded-md  shadow-sm ">
      {/* Header with avatar and name */}
      <Link
        href={`/nx/${role.toLowerCase()}/myprofile`}
        className="flex flex-col items-center py-2 hover:bg-[var(--hover-color)] "
      >
        <button onClick={onClose} className="text-start self-start">
          <div className="flex w-full items-center gap-3  px-4">
            <div className="relative w-14 aspect-square">
              <Image
                src={avatarUrl}
                alt="Profile photo"
                fill
                quality={100}
                className="rounded-full object-cover"
                sizes="(max-width: 768px) 48px, 64px"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-xs">{role.toLowerCase()}</p>
            </div>
          </div>
        </button>
      </Link>
      {/* Menu items with regular icons */}
      <nav>
        <ul className="flex flex-col gap-4">
          <li className=" text-md hover:bg-[var(--hover-color)]">
            <button onClick={onClose} className="text-start self-start">
              <Link
                href={`/nx/${role.toLowerCase()}/myprofile`}
                className="flex items-center gap-2 p-4 w-full"
              >
                <FontAwesomeIcon icon={faUser} className="w-6 text-lg" />
                Your profile
              </Link>
            </button>
          </li>
          <li className=" text-md hover:bg-[var(--hover-color)]">
            <button onClick={onClose} className="text-start self-start">
              <Link href={"#"} className="flex items-center gap-2 p-4 w-full">
                <FontAwesomeIcon icon={faEnvelope} className="w-6 text-lg" />
                <span>Messages</span>
              </Link>
            </button>
          </li>
          {role === "FREELANCER" && (
            <li className=" text-md hover:bg-[var(--hover-color)]">
              <button onClick={onClose} className="text-start self-start">
                <Link
                  href={`/nx/${role.toLowerCase()}/mycommunities`}
                  className="flex items-center gap-2 p-4 w-full"
                >
                  <FontAwesomeIcon icon={faComments} className="w-6 text-lg" />
                  <span>Your Communities</span>
                </Link>
              </button>
            </li>
          )}
          <li className=" text-md hover:bg-[var(--hover-color)]">
            <button onClick={onClose} className="text-start self-start">
              <Link href={"#"} className="flex items-center gap-2 p-4 w-full">
                <FontAwesomeIcon icon={faAddressCard} className="w-6 text-lg" />
                <span>Account settings</span>
              </Link>
            </button>
          </li>
          <li className=" text-md hover:bg-[var(--hover-color)]">
            <button onClick={onClose} className="text-start self-start">
              <Link
                href={"/login"}
                className="flex items-center gap-2 p-4 w-full"
              >
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  className="w-6 text-lg "
                />
                <span>Log out</span>
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileMenu;
