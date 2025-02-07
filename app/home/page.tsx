"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import StarRating from "../_components/common/StarRating";
import JobCard from "@/app/_components/common/JobCard";

// Define union types for the keys
type ExperienceLevelKey = "Entry Level" | "Intermediate" | "Expert";
type ProjectLengthKey =
  | "Less than one month"
  | "1 to 3 months"
  | "3 to 6 months"
  | "More than 6 months";

const Home: React.FC = () => {
  const searchParams = useSearchParams();
  const currentType = searchParams?.get("type") || "";

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("Newest");
  const [userRating, setUserRating] = useState<number>(0);

  // Controlled inputs states
  const [skillsSearch, setSkillsSearch] = useState("");

  // Options for experience levels with proper typing
  const experienceOptions: { label: ExperienceLevelKey; count: number }[] = [
    { label: "Entry Level", count: 275 },
    { label: "Intermediate", count: 4558 },
    { label: "Expert", count: 2589 },
  ];
  const [experienceLevels, setExperienceLevels] = useState<
    Record<ExperienceLevelKey, boolean>
  >({
    "Entry Level": false,
    Intermediate: false,
    Expert: false,
  });

  // Job type and hourly rate states
  const [jobTypeHourly, setJobTypeHourly] = useState(false);
  const [hourlyRateMin, setHourlyRateMin] = useState("");
  const [hourlyRateMax, setHourlyRateMax] = useState("");

  // Options for project lengths with proper typing
  const projectLengthOptions: { label: ProjectLengthKey; count: number }[] = [
    { label: "Less than one month", count: 4264 },
    { label: "1 to 3 months", count: 4992 },
    { label: "3 to 6 months", count: 3748 },
    { label: "More than 6 months", count: 4123 },
  ];
  const [projectLengths, setProjectLengths] = useState<
    Record<ProjectLengthKey, boolean>
  >({
    "Less than one month": false,
    "1 to 3 months": false,
    "3 to 6 months": false,
    "More than 6 months": false,
  });

  const options = [
    { label: "Newest", value: "newest" },
    { label: "Client Spend", value: "client_spend" },
    { label: "Client Rating", value: "client_rating" },
  ];

  const handleSelect = (option: { label: string; value: string }) => {
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  return (
    <div className="h-screen grid grid-cols-[1fr_3fr] grid-rows-[min-content_min-content_1fr]">
      {/* Row 1: Navigation */}
      <nav className="col-span-2 bg-[var(--background-color)] p-4 flex items-center justify-center">
        <ul className="flex gap-44">
          <li>
            <Link
              href={{ pathname: "/home", query: { type: "jobs" } }}
              className={`${
                currentType === "jobs"
                  ? "text-[var(--accent-color)] font-bold hover:text-[var(--hover-color)]"
                  : "text-[var(--foreground-color)] hover:text-[var(--hover-color)]"
              }`}
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link
              href={{ pathname: "/home", query: { type: "communities" } }}
              className={`${
                currentType === "communities"
                  ? "text-[var(--accent-color)] font-bold hover:text-[var(--hover-color)]"
                  : "text-[var(--foreground-color)] hover:text-[var(--hover-color)]"
              }`}
            >
              Communities
            </Link>
          </li>
          <li>
            <Link
              href={{ pathname: "/home", query: { type: "freelancer" } }}
              className={`${
                currentType === "freelancer"
                  ? "text-[var(--accent-color)] font-bold hover:text-[var(--hover-color)]"
                  : "text-[var(--foreground-color)] hover:text-[var(--hover-color)]"
              }`}
            >
              Freelancers
            </Link>
          </li>
        </ul>
      </nav>

      {/* Row 2: Custom Select Component */}
      <div className="col-span-2 bg-[var(--foreground-color)] p-4 flex justify-end">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-[var(--btn-color)] text-[var(--accent-color)] px-4 py-2 rounded border border-[var(--hover-color)] flex items-center gap-2 min-w-[160px] justify-between hover:bg-[var(--button-hover-background-color)]"
          >
            <span>Sort by {selectedOption && `: ${selectedOption}`}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-[var(--hover-color)] text-sm transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              size="sm"
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute top-full right-0 mt-1 w-full bg-[var(--background-color)] border border-[var(--hover-color)] rounded shadow-lg transition-all duration-200 origin-top ${
              isOpen
                ? "opacity-100 scale-y-100 translate-y-0"
                : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className="w-full text-left px-4 py-2 text-[var(--accent-color)] hover:bg-[var(--button-hover-background-color)]"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Aside and Section */}
      <aside className="row-start-3 bg-[var(--foreground-color)] p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Rating</h2>
          <StarRating maxRating={5} size={24} onSetRating={setUserRating} />
        </div>

        {/* Skills Search */}
        <div className="mb-4">
          <h3 className="text-md font-bold">Skills</h3>
          <input
            type="text"
            placeholder="Search"
            value={skillsSearch}
            onChange={(e) => setSkillsSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)]"
          />
        </div>

        {/* Experience Level */}
        <div className="mb-4">
          <h3 className="text-md font-bold">Experience level</h3>
          <div className="space-y-2">
            {experienceOptions.map((exp) => (
              <label key={exp.label} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-[var(--btn-color)]"
                  checked={experienceLevels[exp.label]}
                  onChange={(e) =>
                    setExperienceLevels((prev) => ({
                      ...prev,
                      [exp.label]: e.target.checked,
                    }))
                  }
                />
                <span>
                  {exp.label}{" "}
                  <span className="text-gray-500">({exp.count})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <h3 className="text-md font-bold">Job type</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox text-[var(--btn-color)]"
              checked={jobTypeHourly}
              onChange={(e) => setJobTypeHourly(e.target.checked)}
            />
            <span>
              Hourly <span className="text-gray-500">(4,187)</span>
            </span>
          </label>

          {/* Hourly Rate Input */}
          <div className="mt-2 flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={hourlyRateMin}
              onChange={(e) => setHourlyRateMin(e.target.value)}
              className="w-1/2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)]"
            />
            <input
              type="number"
              placeholder="Max"
              value={hourlyRateMax}
              onChange={(e) => setHourlyRateMax(e.target.value)}
              className="w-1/2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)]"
            />
          </div>
        </div>

        {/* Project Length */}
        <div className="mb-4">
          <h3 className="text-md font-bold">Project length</h3>
          <div className="space-y-2">
            {projectLengthOptions.map((proj) => (
              <label key={proj.label} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-[var(--btn-color)]"
                  checked={projectLengths[proj.label]}
                  onChange={(e) =>
                    setProjectLengths((prev) => ({
                      ...prev,
                      [proj.label]: e.target.checked,
                    }))
                  }
                />
                <span>
                  {proj.label}{" "}
                  <span className="text-gray-500">({proj.count})</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      <section className="row-start-3 col-start-2 bg-[var(--btn-color)] p-4">
        <JobCard></JobCard>
        <JobCard></JobCard>
        <JobCard></JobCard>
      </section>
    </div>
  );
};

export default Home;
