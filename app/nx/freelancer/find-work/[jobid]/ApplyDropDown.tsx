"use client";
import React, { useEffect, useState } from "react";
import { DropdownMenu } from "@/app/_components/common/DropDownMenu";
import { getOwnedCommunities } from "@/app/_lib/jobs/JobsSearch";
import { OwnedCommunity } from "@/app/_types/OwnedCommunity";

interface ApplyDropDownProps {
  setSelectedOption: (option: string) => void;
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
  children?: React.ReactNode;
}

export default function ApplyDropDown({
  setSelectedOption,
  setIsOpen,
  isOpen,
  children,
}: ApplyDropDownProps) {
  const [communities, setCommunities] = useState<OwnedCommunity[]>([]);

  // Uncomment the API fetching code below to use real data.
  /*
  useEffect(() => {
    async function fetchCommunities() {
      try {
        const comms = await getOwnedCommunities();
        setCommunities(comms);
      } catch (error) {
        console.error("Error fetching communities", error);
      }
    }
    fetchCommunities();
  }, []);
  */

  const fakeCommunities: OwnedCommunity[] = [
    { id: "freelancer-1", name: "John Doe" },
    { id: "comm-1", name: "Tech Innovators" },
    { id: "comm-2", name: "Creative Minds" },
    { id: "comm-3", name: "Digital Nomads" },
  ];

  // Prepare dropdown options:
  // The first element is always the freelancer option.
  const freelancerOption = {
    label: fakeCommunities[0].name,
    value: fakeCommunities[0].id,
  };
  // The remaining elements (if any) are the community options.
  const communityOptions =
    fakeCommunities.length > 1
      ? fakeCommunities.slice(1).map((community) => ({
          label: community.name,
          value: community.id,
        }))
      : [];

  const dropdownOptions = [freelancerOption, ...communityOptions];

  const handleSelectOption = (option: string) => {
    localStorage.setItem("id", option);
    setSelectedOption(option);
  };

  return (
    <DropdownMenu
      setSelectedOption={handleSelectOption}
      options={dropdownOptions}
      setIsOpen={setIsOpen}
      isOpen={isOpen}
    >
      {children}
    </DropdownMenu>
  );
}
