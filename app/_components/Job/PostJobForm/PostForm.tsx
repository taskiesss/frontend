"use client";
import React, { useState } from "react";
import Container from "../../common/Container";
import SkillsSearchInput from "../../common/SkillsSearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import Button from "../../common/button";
import { postAJob } from "@/app/_lib/Client/PostJob";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type Props = { t?: string };

const projectLengthOptions = [
  { value: "_less_than_1_month", label: "Less than 1 month" },
  { value: "_1_to_3_months", label: "1 to 3 months" },
  { value: "_3_to_6_months", label: "3 to 6 months" },
  { value: "_more_than_6_months", label: "More than 6 months" },
];

const experienceLevelOptions = [
  { value: "entry_level", label: "Entry Level" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" },
];

// Submit button component to use useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="text-lg" disabled={pending}>
      {pending ? "Posting..." : "Post this job"}
    </Button>
  );
}

function PostForm({}: Props) {
  // State for all form fields
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [projectLength, setProjectLength] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [expectedPricePerHour, setExpectedPricePerHour] = useState("");
  const [description, setDescription] = useState("");

  const [state, formAction] = useActionState(postAJob, { error: undefined });

  const handleSelectSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skill: string, index: number) => {
    setSelectedSkills((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Container className="flex flex-col items-center py-20">
      <div className="border-solid border-2 rounded-lg overflow-hidden border-gray-600 w-10/12 flex flex-col gap-10">
        <div className="flex flex-col gap-5 bg-[var(--foreground-color)] px-20 pb-10 w-full">
          <h1 className="text-5xl pt-12">
            <FontAwesomeIcon icon={faSuitcase} /> Post a new job
          </h1>
          <span className="text-2xl text-slate-500">
            Find the perfect developer for your project
          </span>
        </div>

        <form
          action={formAction}
          className="w-full flex flex-col pb-20 gap-10 items-center px-20"
        >
          {state?.error &&
            state.error !== "Skills required is a mandatory field" && (
              <div className="w-full text-red-500 text-lg">{state.error}</div>
            )}

          <div className="flex flex-col gap-3 w-full">
            <span className="text-xl">Job title</span>
            <input
              required
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: E-commerce website"
              className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="text-lg">Skills required</span>
            <SkillsSearchInput
              className="py-4 px-3 text-lg border border-solid border-gray-600 rounded-lg"
              selectedSkills={selectedSkills}
              onSelectSkill={handleSelectSkill}
              onRemoveSkill={handleRemoveSkill}
            />
            <input
              type="hidden"
              name="skills"
              value={selectedSkills.join(",")}
            />
            {state?.error === "Skills required is a mandatory field" && (
              <span className="text-red-500 text-sm">{state.error}</span>
            )}
          </div>
          <div className="flex w-full gap-6">
            <div className="w-full flex flex-col gap-2">
              <span className="text-lg">Project length</span>
              <select
                name="projectLength"
                id="projectLength"
                required
                value={projectLength}
                onChange={(e) => setProjectLength(e.target.value)}
                className="outline-none focus:outline-none py-4 px-3 text-lg border border-solid border-gray-600 rounded-lg bg-[var(--background-color)] w-full"
              >
                <option value="" className="text-gray-500" disabled={true}>
                  Select duration
                </option>
                {projectLengthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-lg">Experience level</span>
              <select
                name="experienceLevel"
                id="experienceLevel"
                required
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="outline-none focus:outline-none py-4 px-3 text-lg border border-solid border-gray-600 rounded-lg bg-[var(--background-color)] w-full"
              >
                <option value="" className="text-gray-500" disabled={true}>
                  Select level
                </option>
                {experienceLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <span className="text-xl">Expected price per hour</span>
            <input
              required
              type="number"
              name="expectedPricePerHour"
              value={expectedPricePerHour}
              onChange={(e) => setExpectedPricePerHour(e.target.value)}
              min={0}
              placeholder="ex: 14.00"
              className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <span className="text-xl">Job Description</span>
            <textarea
              required
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the job requirements and responsibilities..."
              className="resize-none px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
              rows={5}
            />
          </div>
          <div className="self-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </Container>
  );
}

export default PostForm;
