/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { EmpHistoryAction } from "@/app/_lib/FreelancerProfile/APi";
import Cookies from "js-cookie";
import { FormEvent, useState } from "react";
import ProtectedPage from "../../common/ProtectedPage";
import Model from "../Model";

interface EmpHistory {
  company: string;
  position: string;
  startYear: string;
  endYear: string;
}

interface EducationFormProps {
  closeEdit: () => void;
  currentHistory: EmpHistory[];
}

export default function EmpHisForm({
  closeEdit,
  currentHistory,
}: EducationFormProps) {
  const [empHistory, setEmpHistory] = useState<EmpHistory[]>(currentHistory);
  const [isForbidden, setIsForbidden] = useState(false);
  // Remove an education row by index
  const removeEmpHistory = (index: number) => {
    setEmpHistory((prev) => prev.filter((_, i) => i !== index));
  };

  // Add a new education row with empty fields
  const addEmpHistory = () => {
    setEmpHistory((prev) => [
      ...prev,
      { company: "", position: "", startYear: "", endYear: "" },
    ]);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(empHistory);
      const token = Cookies.get("token");
      const res = await EmpHistoryAction(empHistory, token);
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
      <h2 className="text-2xl font-bold mb-4">Edit Employment History</h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col  w-[60rem] gap-6 pt-3"
      >
        {empHistory.map((emp, i) => (
          <div key={i} className="flex items-center gap-6">
            <input
              required
              type="text"
              placeholder="Company"
              value={emp.company}
              onChange={(e) =>
                setEmpHistory((prev) => {
                  const newEmpHistory = [...prev];
                  newEmpHistory[i].company = e.target.value;
                  return newEmpHistory;
                })
              }
              className="p-3  bg-[var(--border-color)] focus:outline-none"
            />
            <input
              required
              type="text"
              placeholder="position"
              value={emp.position}
              onChange={(e) =>
                setEmpHistory((prev) => {
                  const newEmpHistory = [...prev];
                  newEmpHistory[i].position = e.target.value;
                  return newEmpHistory;
                })
              }
              className="p-3  bg-[var(--border-color)] focus:outline-none"
            />
            <input
              required
              type="date"
              placeholder="Start Date"
              name="startDate"
              value={emp.startYear}
              onChange={(e) =>
                setEmpHistory((prev) => {
                  const newEmpHistory = [...prev];
                  newEmpHistory[i].startYear = e.target.value;
                  return newEmpHistory;
                })
              }
              className="p-3 bg-[var(--border-color)] focus:outline-none"
            />
            <input
              required
              type="date"
              min={emp.startYear}
              placeholder="End Date"
              name="endDate"
              value={emp.endYear}
              onChange={(e) =>
                setEmpHistory((prev) => {
                  const newEmpHistory = [...prev];
                  newEmpHistory[i].endYear = e.target.value;
                  return newEmpHistory;
                })
              }
              className="p-3 bg-[var(--border-color)] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeEmpHistory(i)}
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
            onClick={addEmpHistory}
            className="px-4 py-2 text-lg font-extrabold text-[var(--hover-color)]  "
          >
            + Add Employment history
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
