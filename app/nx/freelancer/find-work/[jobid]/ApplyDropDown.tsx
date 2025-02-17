/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { DropdownMenu } from "@/app/_components/common/DropDownMenu";
import { getOwnedCommunities } from "@/app/_lib/jobs/JobsSearch";
import { OwnedCommunity } from "@/app/_types/OwnedCommunity";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import ProtectedPage from "@/app/_components/common/ProtectedPage";

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
  const [communities, setCommunities] = useState<OwnedCommunity[]>([
    { name: "", id: "" },
  ]);

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const token = Cookies.get("token");
        const comms = await getOwnedCommunities(token);
        setCommunities(comms);
      } catch (error: any) {
        if (
          error.message == "Forbidden" ||
          error.message === "Unauthorized user"
        ) {
          return (
            <ProtectedPage message="You are not allowed to do this action." />
          );
        }
        throw new Error(error.message);
      }
    }
    fetchCommunities();
  }, []);

  // const fakeCommunities: OwnedCommunity[] = [
  //   { id: "freelancer-1", name: "John Doe" },
  //   { id: "comm-1", name: "Tech Innovators" },
  //   { id: "comm-2", name: "Creative Minds" },
  //   { id: "comm-3", name: "Digital Nomads" },
  // ];

  // Prepare dropdown options:
  // The first element is always the freelancer option.
  const freelancerOption = {
    label: communities[0].name,
    value: communities[0].id,
  };
  // The remaining elements (if any) are the community options.
  const communityOptions =
    communities.length > 1
      ? communities.slice(1).map((community) => ({
          label: community.name,
          value: community.id,
        }))
      : [];

  const dropdownOptions = [freelancerOption, ...communityOptions];

  const handleSelectOption = (option: string) => {
    localStorage.setItem("id", option);
    const name = dropdownOptions.reduce((acc, o) => {
      if (o.value === option) return o.label;
      return acc;
    }, "");
    localStorage.setItem("name", name);
    setSelectedOption(option);
    redirect(`/nx/freelancer/proposals/${jobid}/apply`);
  };

  return (
    <>
      {dropdownOptions[0].label !== "" ? (
        <DropdownMenu
          setSelectedOption={handleSelectOption}
          options={dropdownOptions}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        >
          {children}
        </DropdownMenu>
      ) : null}
    </>
  );
}
