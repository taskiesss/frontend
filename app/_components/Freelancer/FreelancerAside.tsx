"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SkillsSearchInput from "../common/SkillsSearchInput";
import StarRating from "../common/StarRating";

type ExperienceLevelKey = "entry_level" | "intermediate" | "expert";
type ExperienceLevelLabel = "Entry Level" | "Intermediate" | "Expert";

export default function FreelancerAside({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  // Local state for filter values
  const [userRating, setUserRating] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // A key to force re-mounting of SkillsSearchInput for resetting its local state
  const [resetKey, setResetKey] = useState<number>(0);

  // Experience options as checkboxes (freelancer API accepts a single value)
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

  // Handle form submission: update URL query parameters based on selected filters.
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

    // Update the resetKey to force a re-mount of the SkillsSearchInput component.
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="sticky left-0">
      <h1 className="px-4 py-2 text-xl font-bold text-[var(--accent-color)] rounded-md">
        Advanced Search
      </h1>

      <aside className="bg-[var(--background-color)] rounded-lg shadow-s  p-4">
        {/* Rating Filter */}
        <div className="pb-2">
          <h2 className="py-3 text-xl font-bold">Rating</h2>
          <StarRating maxRating={5} size={24} onSetRating={setUserRating} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Skills Search Input */}
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

          {/* Experience Level */}
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

          {/* Hourly Rate Range */}
          <div className="pb-5">
            <h3 className="text-xl py-3 font-bold">Hourly Rate Range</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={hourlyRateMin}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0) {
                    setHourlyRateMin(e.target.value);
                  }
                }}
                className="w-1/2 px-3 py-2 border border-solid border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] bg-[var(--background-color)]"
              />
              <input
                type="number"
                placeholder="Max"
                value={hourlyRateMax}
                onChange={(e) => {
                  if (Number(e.target.value) > Number(hourlyRateMin)) {
                    setHourlyRateMax(e.target.value);
                  } else {
                    setHourlyRateMax((Number(hourlyRateMin) + 1).toString());
                  }
                }}
                className="w-1/2 px-3 py-2 border border-solid border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] bg-[var(--background-color)]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--btn-color)] text-[var(--accent-color)] rounded-lg"
          >
            Apply Filters
          </button>
        </form>
      </aside>
    </div>
  );
}
