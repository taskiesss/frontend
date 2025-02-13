"use client";

import React from "react";
import Container from "@/app/_components/common/Container";

// Import Font Awesome React components and icons
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

export default function Page({ params }: { params: { jobid: string } }) {
  // We won't actually use `jobid` here; it's just for demonstration

  // Fake data for illustration
  const fakeData = {
    projectTitle: "JavaScript Dev Needed to Build a Cool App",
    postedAt: "2024-11-24T00:00:00.000Z",
    projectDescription:
      "Looking for a JavaScript developer to help build a data-rich app. We need someone who can work with React and Node to create an awesome user experience.",
    projectLength: "More than 30 hrs/week",
    experienceLevel: "Intermediate",
    expectedPricePerHour: "$10.00 - $50.00",
    skills: ["JavaScript", "HTML", "CSS"],
    client: {
      completedJobs: 12,
      totalSpent: "$5k+",
      rate: 4.5,
    },
  };

  // Destructure data
  const {
    projectTitle,
    postedAt,
    projectDescription,
    projectLength,
    experienceLevel,
    expectedPricePerHour,
    skills,
    client: { completedJobs, totalSpent, rate },
  } = fakeData;

  // Force a consistent date format on both server and client:
  const formattedDate = new Date(postedAt).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page headings */}
        <h1 className="text-2xl font-bold mb-1">Submit A Proposal</h1>
        <h2 className="text-xl font-semibold mb-6">Job Details</h2>

        {/* Title and posted date */}
        <h3 className="text-lg font-semibold mb-1">{projectTitle}</h3>
        <p className="text-sm text-gray-500 mb-4">Posted at {formattedDate}</p>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: project description */}
          <div className="md:col-span-2 space-y-4">
            <p>{projectDescription}</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Solid JavaScript/React experience</li>
              <li>Ability to work with APIs and handle data-rich UIs</li>
              <li>Strong communication skills</li>
            </ul>
          </div>

          {/* Right column: vertical line on the left, icons + text */}
          <div className="border-l border-gray-300 pl-4 flex flex-col gap-6">
            {/* Experience Level */}
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUserGear} className="text-lg" />
              <div>
                <div className="text-base font-medium">{experienceLevel}</div>
                <div className="text-xs text-gray-500">Experience Level</div>
              </div>
            </div>

            {/* Hourly Range */}
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSackDollar} className="text-lg" />
              <div>
                <div className="text-base font-medium">
                  {expectedPricePerHour}
                </div>
                <div className="text-xs text-gray-500">Hourly range</div>
              </div>
            </div>

            {/* Project Length */}
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-lg" />
              <div>
                <div className="text-base font-medium">{projectLength}</div>
                <div className="text-xs text-gray-500">Project Length</div>
              </div>
            </div>

            {/* Client details (no border around, just text) */}
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold">Client Details</div>
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faTasks} />
                <span>Completed Jobs: {completedJobs}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faWallet} />
                <span>Total Spent: {totalSpent}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faStar} />
                <span>Rate: {rate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2">Skills and expertise</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-[var(--bg-skill)] px-2 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply button */}
        <div className="mt-6">
          <button
            className="flex items-center gap-2 bg-[var(--btn-color)] text-[var(--btn-clr-primary)]
                       px-4 py-2 rounded hover:bg-[var(--button-hover-background-color)]"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            <span>Apply Now</span>
          </button>
        </div>
      </div>
    </Container>
  );
}
