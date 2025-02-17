/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Button from "../../../_components/common/button";
import Container from "../../../_components/common/Container";
import SkillsSearchInput from "../../../_components/common/SkillsSearchInput";
import { submitFreelancerForm } from "../../../_lib/Freelancer/FreelancerForm";
import { FreelancerFormPayload } from "../../../_types/FreelancerForm";
import { invariant } from "../../../_helpers/invariant";
import { useRouter } from "next/navigation";

type Props = { params: string };

interface Education {
  degree: string;
  institution: string;
  graduationYear: number;
}

export default function Page({}: Props) {
  // Personal Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Professional Information
  const [expectedHourlyRate, setExpectedHourlyRate] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [languagesSpoken, setLanguagesSpoken] = useState("");
  const [averageWorkHours, setAverageWorkHours] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [professionalSummary, setProfessionalSummary] = useState("");

  // Education: Allow multiple entries
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { degree: "", institution: "", graduationYear: 0 },
    ]);
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string | number
  ) => {
    const updated = educationList.map((edu, i) => {
      if (i === index) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    setEducationList(updated);
  };

  const removeEducation = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleSelectSkill = (skill: string) => {
    // Avoid duplicate skills
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // New: Remove a selected skill
  const handleRemoveSkill = (skill: string, index: number) => {
    setSelectedSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      setError("You have to select a skill");
      return;
    }
    const languages = languagesSpoken.split(",").map((l) => l.trim());
    const formData: FreelancerFormPayload = {
      firstName: firstName,
      lastName: lastName,
      hourlyRate: Number(expectedHourlyRate),
      skills: selectedSkills,
      professionalSummary: professionalSummary,
      languages: languages,
      hoursPerWeek: Number(averageWorkHours),
      professionalTitle,
      education: educationList,
    };
    console.log("Form submitted: ", formData);

    try {
      const res = await submitFreelancerForm(formData);

      try {
        invariant(res === "unauthorized", "unauthorized user");
      } catch (error: any) {
        router.push("/login");
      }

      if (res === true) {
        router.push("/nx/freelancer/find-work");
      }
    } catch (error: any) {
      if (error.message === "Forbidden") router.push("/login");
      if (error.message === "unauthorized user") router.push("/login");

      console.error(error.message);
    }
  };

  return (
    <Container className="flex flex-col items-center py-20">
      <Container className="border-solid border-2 rounded-lg border-gray-600 w-11/12 flex flex-col gap-10 items-center">
        {/* Header */}
        <h1 className="text-6xl text-center pt-12">Freelancer Profile</h1>
        <span className="text-2xl text-center text-slate-500">
          Complete your profile to start freelancing
        </span>

        <form
          onSubmit={handleSubmit}
          className="w-11/12 flex flex-col py-10 gap-10"
        >
          {/* Personal Information */}
          <div className="flex flex-col gap-2 border-t-2 border-solid border-[var(--border-color)] w-full">
            <span className="text-2xl py-6 text-[var(--accent-color)]">
              Personal Information
            </span>
            <div className="flex justify-between gap-10">
              <div className="flex flex-col gap-3 w-full">
                <span className="text-lg">First Name</span>
                <input
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    e.preventDefault();
                    setFirstName(e.target.value);
                  }}
                  className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <span className="text-lg">Last Name</span>
                <input
                  required
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    e.preventDefault();
                    setLastName(e.target.value);
                  }}
                  className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="flex flex-col gap-2 border-t-2 border-solid border-[var(--border-color)] w-full">
            <span className="text-2xl py-6 text-[var(--accent-color)]">
              Professional Information
            </span>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-lg">Expected Hourly Rate ($)</span>
                <input
                  required
                  type="number"
                  min="1"
                  value={expectedHourlyRate}
                  onChange={(e) => {
                    e.preventDefault();
                    setExpectedHourlyRate(e.target.value);
                  }}
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg">Skills</span>
                <SkillsSearchInput
                  className="py-4 border border-solid border-gray-600 rounded-lg"
                  selectedSkills={selectedSkills}
                  onSelectSkill={handleSelectSkill}
                  onRemoveSkill={handleRemoveSkill}
                />
                {error === "" ? null : (
                  <span className="text-red-500 text-lg">{error}</span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Languages Spoken</span>
                <input
                  required
                  type="text"
                  placeholder="Separated by comma (ex. English,French)"
                  value={languagesSpoken}
                  onChange={(e) => {
                    e.preventDefault();
                    setLanguagesSpoken(e.target.value);
                  }}
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Average Work Hours/Week</span>
                <input
                  required
                  type="number"
                  min="1"
                  value={averageWorkHours}
                  onChange={(e) => {
                    e.preventDefault();
                    setAverageWorkHours(e.target.value);
                  }}
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Professional Title</span>
                <input
                  required
                  type="text"
                  value={professionalTitle}
                  onChange={(e) => {
                    e.preventDefault();
                    setProfessionalTitle(e.target.value);
                  }}
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg">Professional Summary</span>
                <textarea
                  required
                  value={professionalSummary}
                  onChange={(e) => {
                    e.preventDefault();
                    setProfessionalSummary(e.target.value);
                  }}
                  className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none resize-none bg-[var(--background-color)] h-32"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="flex flex-col border-t-2 border-solid border-[var(--border-color)] gap-2 w-full">
            <span className="text-2xl py-6 text-[var(--accent-color)]">
              Education
            </span>
            {educationList.map((edu, index) => (
              <div key={index} className="flex flex-col gap-6  p-4 rounded">
                <div className="flex flex-col gap-3">
                  <span className="text-lg">Degree</span>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      e.preventDefault();
                      updateEducation(index, "degree", e.target.value);
                    }}
                    className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-lg">Institution</span>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      e.preventDefault();
                      updateEducation(index, "institution", e.target.value);
                    }}
                    className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-lg">Graduation Year</span>
                  <input
                    type="number"
                    min="1"
                    value={edu.graduationYear}
                    onChange={(e) => {
                      e.preventDefault();
                      updateEducation(
                        index,
                        "graduationYear",
                        Math.max(Number(e.target.value), 1)
                      );
                    }}
                    className="px-3 py-4 text-lg border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={addEducation}
                className=" bg-[var(--btn-color)] text-[var(--accent-color)] px-4 py-2 rounded-full"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="text-2xl" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </Container>
  );
}
