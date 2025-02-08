"use client";
import React, { useState } from "react";
import StarRating from "./StarRating";
import { useRouter } from "next/navigation";
import SkillsSearchInput from "./SkillsSearchInput";

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
    <aside className="row-start-3 bg-[var(--background-color)] p-4 rounded-lg shadow-s">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Rating</h2>
        <StarRating maxRating={5} size={24} onSetRating={setUserRating} />
      </div>

      <form onSubmit={handleSubmit}>
        {/* Skills Search Component */}
        <div className="mb-4">
          <h3 className="text-md font-bold">Skills</h3>
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
                  {exp.label}
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

        {/* Submit button */}
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--btn-color)] rounded-md text-white"
        >
          Apply Filters
        </button>
      </form>
    </aside>
  );
}
