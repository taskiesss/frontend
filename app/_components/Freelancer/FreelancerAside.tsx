"use client";
import React, { useState } from "react";
import StarRating from "../common/StarRating";
import { useRouter } from "next/navigation";
import SkillsSearchInput from "../common/SkillsSearchInput";
import Link from "next/link";

type ExperienceLevelKey = "entry_level" | "intermediate" | "expert";
type ExperienceLevelLabel = "Entry Level" | "Intermediate" | "Expert";

export default function FreelancerAside() {
  const router = useRouter();

  // Local state for filter values
  const [searchText, setSearchText] = useState("");
  const [userRating, setUserRating] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // A key to force re-mounting of SkillsSearchInput for resetting its local state
  const [resetKey, setResetKey] = useState<number>(0);

  // Experience options as radio buttons (freelancer API accepts a single value)
  const experienceOptions: {
    label: ExperienceLevelLabel;
    value: ExperienceLevelKey;
  }[] = [
    { label: "Entry Level", value: "entry_level" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Expert", value: "expert" },
  ];
  const [experienceLevel, setExperienceLevel] = useState<
    ExperienceLevelKey | ""
  >("");

  const [hourlyRateMin, setHourlyRateMin] = useState("");
  const [hourlyRateMax, setHourlyRateMax] = useState("");

  // Handle form submission: update URL query parameters based on selected filters.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    if (searchText.trim() !== "") {
      params.set("search", searchText.trim());
    } else {
      params.delete("search");
    }

    if (selectedSkills.length > 0) {
      params.set("skills", selectedSkills.join(","));
    } else {
      params.delete("skills");
    }

    if (experienceLevel !== "") {
      params.set("experience", experienceLevel);
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

    // Reset all filter states after submission.
    setSearchText("");
    setUserRating(0);
    setSelectedSkills([]);
    setExperienceLevel("");
    setHourlyRateMin("");
    setHourlyRateMax("");
    // Update the resetKey to force a re-mount of the SkillsSearchInput component.
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="sticky top-[2.5rem] left-0">
      <Link href="/freelancers/search">
        <button className="px-4 py-2 bg-[var(--btn-color)] text-[var(--accent-color)] rounded-md">
          Advanced Search
        </button>
      </Link>
      <aside className="bg-[var(--background-color)] rounded-lg shadow-s mt-4 p-4">
        {/* Search Text Input */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Search</h2>
          <input
            type="text"
            placeholder="Search freelancers..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)]"
          />
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <h2 className="py-3 text-xl font-bold">Rating</h2>
          <StarRating maxRating={5} size={24} onSetRating={setUserRating} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Skills Search Input */}
          <div className="mb-4">
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

          {/* Experience Level (Radio Buttons) */}
          <div className="mb-4">
            <h3 className="text-xl py-3 font-bold">Experience Level</h3>
            <div className="space-y-2">
              {experienceOptions.map((exp) => (
                <label key={exp.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="experience"
                    className="form-radio text-[var(--btn-color)]"
                    value={exp.value}
                    checked={experienceLevel === exp.value}
                    onChange={() => setExperienceLevel(exp.value)}
                  />
                  <span className="text-lg">{exp.label}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="experience"
                  className="form-radio text-[var(--btn-color)]"
                  value=""
                  checked={experienceLevel === ""}
                  onChange={() => setExperienceLevel("")}
                />
                <span className="text-lg">Any</span>
              </label>
            </div>
          </div>

          {/* Hourly Rate Range */}
          <div className="mb-4">
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
                className="w-1/2 px-3 py-2 border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)]"
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
                className="w-1/2 px-3 py-2 border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[var(--btn-color)] text-[var(--accent-color)] rounded-lg"
          >
            Apply Filters
          </button>
        </form>
      </aside>
    </div>
  );
}
