/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import StarRating from "../common/StarRating";
import { useRouter } from "next/navigation";
import SkillsSearchInput from "../common/SkillsSearchInput";
import Link from "next/link";

type ExperienceLevelKey = "entry_level" | "intermediate" | "expert";
type ExperienceLevelLabel = "Entry Level" | "Intermediate" | "Expert";

export default function CommunitiyAside() {
  const router = useRouter();

  const [userRating, setUserRating] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // Use a key to force re-mounting of the SkillsSearchInput (resetting its local state)
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

  const [isFull, setIsFull] = useState<boolean>(false);

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

    if (isFull) {
      params.set("isFull", "true");
    } else {
      params.delete("isFull");
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

    params.set("page", "0");
    const currentQuery = new URLSearchParams(window.location.search).toString();
    const newQuery = params.toString();
    if (currentQuery !== newQuery) {
      router.push(`${window.location.pathname}?${newQuery}`);
    }

    // Reset all filter states after submission.
    // setIsFull(false);
    // setUserRating(0);
    // setSelectedSkills([]);
    // setExperienceLevels({
    //   entry_level: false,
    //   intermediate: false,
    //   expert: false,
    // });

    // setHourlyRateMin("");
    // setHourlyRateMax("");

    // // Update the resetKey to force re-mounting of SkillsSearchInput.
    // setResetKey((prev) => prev + 1);
  };

  return (
    <div className="sticky top-[2.5rem] left-0">
      <Link href="/communities/search">
        <button className="px-4 py-2  bg-[var(--btn-color)] text-[var(--accent-color)] rounded-md">
          Advanced Search
        </button>
      </Link>
      <aside className=" row-start-3 bg-[var(--background-color)] rounded-lg shadow-s">
        <div className="py-2 ">
          <h2 className="py-3 text-xl font-bold">Rating</h2>
          <StarRating maxRating={5} size={24} onSetRating={setUserRating} />
        </div>

        <form onSubmit={handleSubmit} className="py-5">
          {/* Skills Search Component */}
          <div className="py-2">
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
          <div className="py-2">
            <h3 className="text-xl py-3 font-bold">Experience level</h3>
            <div className="space-y-2 py-3">
              {experienceOptions.map((exp) => (
                <label key={exp.label} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-[var(--btn-color)]"
                    checked={experienceLevels[exp.value]}
                    onChange={(e) =>
                      setExperienceLevels((prev) => ({
                        ...prev,
                        [exp.value]: e.target.checked,
                      }))
                    }
                  />
                  <span className="text-lg">{exp.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Is Full or not */}
          <div className="py-4">
            <h3 className="text-xl py-3 font-bold">Community capacity</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-[var(--btn-color)]"
                checked={isFull}
                onChange={(e) => setIsFull(e.target.checked)}
              />
              <span className="text-xl py-3 font-bold">is Full</span>
            </label>
          </div>

          {/* Hourly Rate Input */}
          <div className="py-4">
            <h3 className="text-xl py-3 font-bold">Hourly Rate range</h3>
            <div className="py-3 flex space-x-2">
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
