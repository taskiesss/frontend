"use client";
import React, { useState } from "react";
import StarRating from "./StarRating";
import { useRouter } from "next/navigation";
import SkillsSearchInput from "./SkillsSearchInput";
import Link from "next/link";

type ExperienceLevelKey = "Entry Level" | "Intermediate" | "Expert";
type ProjectLengthKey =
  | "Less than one month"
  | "1 to 3 months"
  | "3 to 6 months"
  | "More than 6 months";

export default function Aside() {
  const router = useRouter();

  const [userRating, setUserRating] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // Use a key to force re-mounting of the SkillsSearchInput (resetting its local state)
  const [resetKey, setResetKey] = useState<number>(0);

  const experienceOptions: { label: ExperienceLevelKey; count: number }[] = [
    { label: "Entry Level" },
    { label: "Intermediate" },
    { label: "Expert" },
  ];
  const [experienceLevels, setExperienceLevels] = useState<
    Record<ExperienceLevelKey, boolean>
  >({
    "Entry Level": false,
    Intermediate: false,
    Expert: false,
  });

  const [jobTypeHourly, setJobTypeHourly] = useState(false);
  const [hourlyRateMin, setHourlyRateMin] = useState("");
  const [hourlyRateMax, setHourlyRateMax] = useState("");

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

  // Handle form submission: update URL query parameters and then reset all filters.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    // Set "skills" from the selected skills array.
    if (selectedSkills.length > 0) {
      params.set("skills", selectedSkills.join(","));
    } else {
      params.delete("skills");
    }

    const selectedExperience = Object.keys(experienceLevels).filter(
      (key) => experienceLevels[key as ExperienceLevelKey]
    );
    if (selectedExperience.length > 0) {
      params.set("experience", selectedExperience.join(","));
    } else {
      params.delete("experience");
    }

    if (jobTypeHourly) {
      params.set("jobType", "hourly");
    } else {
      params.delete("jobType");
    }

    if (hourlyRateMin !== "") {
      params.set("minRate", hourlyRateMin);
    } else {
      params.delete("minRate");
    }
    if (hourlyRateMax !== "") {
      params.set("maxRate", hourlyRateMax);
    } else {
      params.delete("maxRate");
    }

    const selectedProjectLengths = Object.keys(projectLengths).filter(
      (key) => projectLengths[key as ProjectLengthKey]
    );
    if (selectedProjectLengths.length > 0) {
      params.set("projectLength", selectedProjectLengths.join(","));
    } else {
      params.delete("projectLength");
    }

    if (userRating > 0) {
      params.set("rate", userRating.toString());
    } else {
      params.delete("rate");
    }

    const currentQuery = new URLSearchParams(window.location.search).toString();
    const newQuery = params.toString();

    if (currentQuery !== newQuery) {
      router.push(`${window.location.pathname}?${newQuery}`);
    }

    // Reset all filter states after submission.
    setUserRating(0);
    setSelectedSkills([]);
    setExperienceLevels({
      "Entry Level": false,
      Intermediate: false,
      Expert: false,
    });
    setJobTypeHourly(false);
    setHourlyRateMin("");
    setHourlyRateMax("");
    setProjectLengths({
      "Less than one month": false,
      "1 to 3 months": false,
      "3 to 6 months": false,
      "More than 6 months": false,
    });
    // Update the resetKey to force re-mounting of SkillsSearchInput.
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="sticky top-[2.5rem] left-0">
      <Link href="/jobs">
        <button className="px-4 py-2  bg-[var(--btn-color)] text-[var(--accent-color)] rounded-md">
          Advanced Search
        </button>
      </Link>
      <aside className=" row-start-3 bg-[var(--background-color)] rounded-lg shadow-s">
        <div className="py-4 ">
          <h2 className="py-3 text-xl font-bold">Rating</h2>
          <StarRating maxRating={5} size={24} onSetRating={setUserRating} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Skills Search Component */}
          <div className="py-4">
            <h3 className="py-3 text-xl font-bold">Skills</h3>
            <SkillsSearchInput
              key={resetKey}
              selectedSkills={selectedSkills}
              onSelectSkill={(skill: string) => {
                if (!selectedSkills.includes(skill)) {
                  setSelectedSkills((prev) => [...prev, skill]);
                }
              }}
            />
          </div>

          {/* Experience Level */}
          <div className="py-4">
            <h3 className="text-xl py-3 font-bold">Experience level</h3>
            <div className="space-y-2 py-3">
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
                  <span className="text-lg">{exp.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div className="py-4">
            <h3 className="text-xl py-3 font-bold">Job type</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-[var(--btn-color)]"
                checked={jobTypeHourly}
                onChange={(e) => setJobTypeHourly(e.target.checked)}
              />
              <span className="text-lg">Hourly</span>
            </label>

            {/* Hourly Rate Input */}
            <div className="py-4 flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={hourlyRateMin}
                onChange={(e) => {
                  if (Number(e.target.value) > 0)
                    setHourlyRateMin(e.target.value);
                }}
                className="w-1/2 px-3 py-2 border border-[var(--border-color)] border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)]"
              />
              <input
                type="number"
                placeholder="Max"
                value={hourlyRateMax}
                onChange={(e) => {
                  if (Number(e.target.value) > Number(hourlyRateMin))
                    setHourlyRateMax(e.target.value);
                  else setHourlyRateMax((Number(hourlyRateMin) + 1).toString());
                }}
                className="w-1/2 px-3 py-2 border border-[var(--border-color)]  border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)]"
              />
            </div>
          </div>

          {/* Project Length */}
          <div className="py-4">
            <h3 className="text-xl py-3 font-bold">Project length</h3>
            <div className="space-y-2 py-3">
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
                  <span className="text-lg text-[var(--accent-color)]">
                    {proj.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--btn-color)] rounded-lg text-[var(--accent-color)]"
          >
            Apply Filters
          </button>
        </form>
      </aside>
    </div>
  );
}
