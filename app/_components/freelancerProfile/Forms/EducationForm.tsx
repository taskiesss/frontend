/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FormEvent, useState } from "react";
import Model from "../Model";
import { EducationAction } from "@/app/_lib/FreelancerProfile/APi";
import ProtectedPage from "../../common/ProtectedPage";
import Cookies from "js-cookie";

interface Education {
  institution: string;
  degree: string;
  graduationYear: number | string;
}

interface EducationFormProps {
  closeEdit: () => void;
  currentEducations: Education[];
}

export default function EducationForm({
  closeEdit,
  currentEducations,
}: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(currentEducations);
  const [isForbidden, setIsForbidden] = useState(false);

  // Remove an education row by index
  const removeEducation = (index: number) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  // Add a new education row with empty fields
  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      { institution: "", degree: "", graduationYear: "" },
    ]);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(educations);
      const token = Cookies.get("token");
      const res = await EducationAction(educations, token);
      console.log(res);
      closeEdit();
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
        return;
      }
      console.error(error.message);
    }
  };

  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  return (
    <Model isOpen={true} onClose={closeEdit}>
      <h2 className="text-2xl font-bold mb-4">Edit Education</h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col w-[45rem] gap-6 pt-3"
      >
        {educations.map((edu, i) => (
          <div key={i} className="flex items-center gap-6">
            <input
              required
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                setEducations((prev) => {
                  const newEducations = [...prev];
                  newEducations[i].institution = e.target.value;
                  return newEducations;
                })
              }
              className="p-3 w-2/5 bg-[var(--background-color)] border border-solid border-gray-600 focus:outline-none rounded-md"
            />
            <input
              required
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                setEducations((prev) => {
                  const newEducations = [...prev];
                  newEducations[i].degree = e.target.value;
                  return newEducations;
                })
              }
              className="p-3 w-2/5 bg-[var(--background-color)] border border-solid border-gray-600 focus:outline-none rounded-md"
            />
            <input
              required
              type="number"
              placeholder="Graduation Year"
              name="year"
              min="1900"
              max="2100"
              value={edu.graduationYear}
              onChange={(e) =>
                setEducations((prev) => {
                  const newEducations = [...prev];
                  newEducations[i].graduationYear = e.target.value;
                  return newEducations;
                })
              }
              className="p-3 bg-[var(--background-color)] border border-solid border-gray-600 focus:outline-none rounded-md"
            />
            <button
              type="button"
              onClick={() => removeEducation(i)}
              className="focus:outline-none text-red-600 transition-transform duration-200 hover:scale-110"
            >
              Remove
            </button>
          </div>
        ))}
        {/* Add Education Button */}
        <div>
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 text-lg font-extrabold text-[var(--hover-color)]  "
          >
            + Add Education
          </button>
        </div>
        {/* Submit Button */}
        <div className="self-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--btn-color)] rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </Model>
  );
}
