"use client";
import React, { useEffect, useState } from "react";
import { DropdownMenu } from "@/app/_components/common/DropDownMenu";
import { getOwnedCommunities } from "@/app/_lib/jobs/JobsSearch";
import { OwnedCommunity } from "@/app/_types/OwnedCommunity";
import { redirect } from "next/navigation";

interface ApplyDropDownProps {
  setSelectedOption: (option: string) => void;
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
  children?: React.ReactNode;
  jobid: string;
}

export default function ApplyDropDown({
  setSelectedOption,
  setIsOpen,
  isOpen,
  children,
  jobid,
}: ApplyDropDownProps) {
  const [communities, setCommunities] = useState<OwnedCommunity[]>([]);

  // useEffect(() => {
  //   async function fetchCommunities() {
  //     try {
  //       const comms = await getOwnedCommunities();
  //       setCommunities(comms);
  //     } catch (error) {
  //       if (error.message == "Forbidden") {
  //         redirect("/login");
  //       }
  //       throw new Error(error.message);
  //     }
  //   }
  //   fetchCommunities();
  // }, []);

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
    redirect(`/nx/freelancer/${jobid}/apply`);
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
