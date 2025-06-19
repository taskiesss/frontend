"use client";
import React, { useState } from "react";
import StarRating from "../common/StarRating";
import { useRouter } from "next/navigation";
import SkillsSearchInput from "../common/SkillsSearchInput";

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

    params.set("page", "1");
    const currentQuery = new URLSearchParams(window.location.search).toString();
    const newQuery = params.toString();
    if (currentQuery !== newQuery) {
      router.push(`${window.location.pathname}?${newQuery}`);
    }
  };

  return (
    <div className="sticky  left-0">
      <h1 className="px-4 py-2 text-xl font-bold text-[var(--accent-color)] rounded-md">
        Advanced Search
      </h1>

      <aside className="bg-[var(--background-color)] rounded-lg shadow-s  p-4 ">
        <div className="pb-2">
          <h2 className="py-3 text-xl font-bold">Rating</h2>
          <StarRating
            maxRating={5}
            size={24}
            onSetRating={setUserRating}
            value={userRating}
          />
        </div>

        <form onSubmit={handleSubmit} className="pb-5">
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

          <div className="pb-4">
            <h3 className="text-xl py-3 font-bold">Community capacity</h3>
            <div className="flex items-center">
              <label className="container">
                <input
                  type="checkbox"
                  checked={isFull}
                  onChange={(e) => setIsFull(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="text-lg leading-5">Is Full</span>
              </label>
            </div>
          </div>

          <div className="pb-4">
            <h3 className="text-xl py-3 font-bold">Hourly Rate range</h3>
            <div className="py-3 flex space-x-2">
              <div className="w-1/2">
                <label htmlFor="hourly-min" className="sr-only">
                  Minimum hourly rate
                </label>
                <input
                  id="hourly-min"
                  type="number"
                  placeholder="Min"
                  value={hourlyRateMin}
                  onChange={(e) => {
                    if (Number(e.target.value) > 0)
                      setHourlyRateMin(e.target.value);
                  }}
                  className="w-full px-3 py-2 border  border-[var(--border-color)] border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] bg-[var(--background-color)]"
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
                  className="w-full px-3 py-2 border border-[var(--border-color)] border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] bg-[var(--background-color)]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="px-3 py-1 bg-[var(--btn-color)] rounded-lg text-[var(--accent-color)] hover:bg-[var(--hover-color)]"
            >
              Apply Filters
            </button>
            <button
              type="button"
              className="px-3 py-1 text-[var(--btn-color)] rounded-lg hover:text-[var(--hover-color)] ml-2"
              onClick={() => {
                setUserRating(0);
                setSelectedSkills([]);
                setExperienceLevels({
                  entry_level: false,
                  intermediate: false,
                  expert: false,
                });
                setHourlyRateMin("");
                setHourlyRateMax("");
                setIsFull(false);
                setResetKey((prev) => prev + 1);
                const params = new URLSearchParams(window.location.search);
                params.set("page", "1");
                params.delete("skills");
                params.delete("experience");
                params.delete("minRate");
                params.delete("maxRate");
                params.delete("rate");
                const currentQuery = new URLSearchParams(
                  window.location.search
                ).toString();
                const newQuery = params.toString();
                if (currentQuery !== newQuery) {
                  router.push(`${window.location.pathname}?${newQuery}`);
                }
              }}
            >
              Clear Filters
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
