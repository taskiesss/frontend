// ProfileMenu.tsx
import React from "react";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faComments,
  faAddressCard,
  faArrowAltCircleRight,
} from "@fortawesome/free-regular-svg-icons";

interface ProfileMenuProps {
  name: string;
  avatarUrl: string | StaticImageData;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ name, avatarUrl }) => {
  return (
    <div className="w-64 bg-foreground-color text-accent-color border border-border-color rounded-md p-4 shadow-sm">
      {/* Header with avatar and name */}
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={avatarUrl}
          alt="Profile photo"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <h2 className="text-sm font-semibold">{name}</h2>
          <p className="text-xs">Freelancer</p>
        </div>
      </div>

      {/* Menu items with regular icons */}
      <nav>
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-2 text-sm cursor-pointer hover:text-hover-color">
            <FontAwesomeIcon icon={faUser} className="w-4" />
            <span>Your profile</span>
          </li>
          <li className="flex items-center gap-2 text-sm cursor-pointer hover:text-hover-color">
            <FontAwesomeIcon icon={faEnvelope} className="w-4" />
            <span>Messages</span>
          </li>
          <li className="flex items-center gap-2 text-sm cursor-pointer hover:text-hover-color">
            <FontAwesomeIcon icon={faComments} className="w-4" />
            <span>Community</span>
          </li>
          <li className="flex items-center gap-2 text-sm cursor-pointer hover:text-hover-color">
            <FontAwesomeIcon icon={faAddressCard} className="w-4" />
            <span>Account settings</span>
          </li>
          <li className="flex items-center gap-2 text-sm cursor-pointer hover:text-hover-color">
            <FontAwesomeIcon icon={faArrowAltCircleRight} className="w-4" />
            <span>Log out</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileMenu;
