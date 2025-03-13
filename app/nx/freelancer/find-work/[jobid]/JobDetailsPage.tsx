"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import Container from "@/app/_components/common/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGear,
  faSackDollar,
  faClock,
  faTasks,
  faWallet,
  faStar,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import Spinner from "@/app/_components/common/Spinner";
import { getExperienceLevel, getProjectLength } from "@/app/_helpers/helper";

// Lazy-load the ApplyDropDown component.
const ApplyDropDown = React.lazy(() => import("./ApplyDropDown"));

type Props = {
  jobid: string;
  jobdetails: {
    projectTitle: string;
    postedAt: string;
    canApply: boolean;
    projectDescription: string;
    projectLength: string;
    experienceLevel: string;
    pricePerHour: string;
    skills: string[];
    client: {
      completedJobs: number;
      totalSpent: string;
      rate: number;
    };
  };
};

export default function JobDetailsPage({ jobid, jobdetails }: Props) {
  // We won't actually use jobid here; it's for demonstration.

  const {
    projectTitle,
    canApply,
    postedAt,
    projectDescription,
    projectLength,
    experienceLevel,
    pricePerHour,
    skills,
    client: { completedJobs, totalSpent, rate },
  } = jobdetails;

  // Format the posted date consistently.
  const formattedDate = new Date(postedAt).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });

  // State for managing dropdown visibility and selected option.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Ref for detecting clicks outside the dropdown.
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-16 py-20">
        {/* Page Headings */}
        <h1 className="text-3xl font-bold mb-4">{projectTitle}</h1>

        {/*Posted Date */}

        <p className="text-base text-gray-500 mb-8">
          Posted at {formattedDate}
        </p>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column: Project Description */}
          <div className="md:col-span-2 space-y-8">
            <p className="text-lg whitespace-pre-wrap">{projectDescription}</p>
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li>Solid JavaScript/React experience</li>
              <li>Ability to work with APIs and handle data-rich UIs</li>
              <li>Strong communication skills</li>
            </ul>
          </div>

          {/* Right Column: Job & Client Details */}
          <div className="border-l border-gray-300 pl-12 flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faUserGear} className="text-xl" />
              <div>
                <div className="text-xl font-medium">
                  {getExperienceLevel(experienceLevel)}
                </div>
                <div className="text-sm text-gray-500">Experience Level</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faSackDollar} className="text-xl" />
              <div>
                <div className="text-xl font-medium">$ {pricePerHour}</div>
                <div className="text-sm text-gray-500">Hourly Range</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faClock} className="text-xl" />
              <div>
                <div className="text-xl font-medium">
                  {getProjectLength(projectLength)}
                </div>
                <div className="text-sm text-gray-500">Project Length</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xl font-semibold">Client Details</div>
              <div className="flex items-center gap-3 text-lg">
                <FontAwesomeIcon icon={faTasks} />
                <span>Completed Jobs: {completedJobs}</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <FontAwesomeIcon icon={faWallet} />
                <span>Total Spent: {totalSpent}</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <FontAwesomeIcon icon={faStar} />
                <span>Rate: {rate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-12">
          <h4 className="text-xl font-semibold mb-6">Skills and Expertise</h4>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-[var(--bg-skill)] px-4 py-2 rounded text-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply Now Button with Dropdown Menu */}
        <div className="mt-12 relative inline-block" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`flex items-center gap-3 bg-[var(--btn-color)] text-[var(--btn-clr-primary)] px-8 py-4 rounded hover:bg-[var(--button-hover-background-color)] ${
              canApply ? "" : "invisible"
            }`}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            <span className="text-xl">Apply Now</span>
          </button>
          {isDropdownOpen && (
            <Suspense fallback={<Spinner />}>
              <ApplyDropDown
                setSelectedOption={setSelectedOption}
                setIsOpen={setIsDropdownOpen}
                isOpen={isDropdownOpen}
                jobid={jobid}
              >
                applyOption
              </ApplyDropDown>
            </Suspense>
          )}
        </div>
      </div>
    </Container>
  );
}
