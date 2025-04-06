"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SkillsSearchInput from "../common/SkillsSearchInput";
import StarRating from "../common/StarRating";

type ExperienceLevelKey = "entry_level" | "intermediate" | "expert";
type ExperienceLevelLabel = "Entry Level" | "Intermediate" | "Expert";

type ProjectLengthKey =
  | "Less than one month"
  | "1 to 3 months"
  | "3 to 6 months"
  | "More than 6 months";

export default function JobAside({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const [userRating, setUserRating] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [resetKey, setResetKey] = useState<number>(0);

  const experienceOptions: {
    label: ExperienceLevelLabel;
    value: ExperienceLevelKey;
  }[] = [
    { label: "Entry Level", value: "entry_level" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Expert", value: "expert" },
  ];
  const [experienceLevels, setExperienceLevels] = useState<
    Record<ExperienceLevelKey, boolean>
  >({
    entry_level: false,
    intermediate: false,
    expert: false,
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

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
    params.set("page", "1");
    const currentQuery = new URLSearchParams(window.location.search).toString();
    const newQuery = params.toString();

    if (currentQuery !== newQuery) {
      router.push(`${window.location.pathname}?${newQuery}`);
    }
  };

  return (
    <div className="relative  left-0  ">
      <h1 className="px-4 py-2 text-xl font-bold text-[var(--accent-color)] rounded-md">
        Advanced Search
      </h1>

      <aside className="bg-[var(--background-color)] rounded-lg shadow-s  p-4">
        <div className="pb-2">
          <h2 className="py-3 text-xl font-bold">Rating</h2>
          <StarRating maxRating={5} size={24} onSetRating={setUserRating} />
        </div>

        <form onSubmit={handleSubmit} className="pb-2">
          <div className="pb-2">
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

          <div className="pb-2">
            <h3 className="text-xl py-3 font-bold">Experience level</h3>
            <div className="space-y-2 py-3">
              {experienceOptions.map((exp) => (
                <div key={exp.value} className="flex items-center">
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={experienceLevels[exp.value]}
                      onChange={(e) =>
                        setExperienceLevels((prev) => ({
                          ...prev,
                          [exp.value]: e.target.checked,
                        }))
                      }
                    />
                    <span className="checkmark"></span>
                    <span className="text-lg leading-5">{exp.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-5">
            <h3 className="text-xl py-3 font-bold">Hourly Rate Range</h3>
            <div className=" flex space-x-2">
              <div className="w-1/2">
                <label htmlFor="hourly-min" className="sr-only">
                  Minimum hourly rate
                </label>
                <input
                  id="hourly-min"
                  type="number"
                  placeholder="Min"
                  value={hourlyRateMin}
                  min={1}
                  onChange={(e) => {
                    setHourlyRateMin(e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-solid border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] bg-[var(--background-color)]"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="hourly-max" className="sr-only">
                  Maximum hourly rate
                </label>
                <input
                  id="hourly-max"
                  type="number"
                  placeholder="Max"
                  value={hourlyRateMax}
                  onChange={(e) => {
                    if (Number(e.target.value) > Number(hourlyRateMin))
                      setHourlyRateMax(e.target.value);
                    else
                      setHourlyRateMax((Number(hourlyRateMin) + 1).toString());
                  }}
                  className="w-full px-3 py-2 border border-solid border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] bg-[var(--background-color)]"
                />
              </div>
            </div>
          </div>

          <div className="pb-2">
            <h3 className="text-xl py-3 font-bold">Project length</h3>
            <div className="space-y-2 py-3">
              {projectLengthOptions.map((proj) => (
                <div key={proj.label} className="flex items-center">
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={projectLengths[proj.label]}
                      onChange={(e) =>
                        setProjectLengths((prev) => ({
                          ...prev,
                          [proj.label]: e.target.checked,
                        }))
                      }
                    />
                    <span className="checkmark"></span>
                    <span className="text-lg leading-5">{proj.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

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
