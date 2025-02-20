/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from "react";
import Model from "../Model";
import ProtectedPage from "../../common/ProtectedPage";
import Cookies from "js-cookie";
import { HPWAction } from "@/app/_lib/FreelancerProfile/APi";

export default function HPWForm({
  closeEdit,
  currentHPW,
}: {
  closeEdit: any;
  currentHPW: number;
}) {
  const [HPW, setHPW] = useState(currentHPW);
  const [isForbidden, setIsForbidden] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(HPW);
      const token = Cookies.get("token");
      const res = await HPWAction(HPW, token);
      console.log(res);
    } catch (error: any) {
      if (
        error.message === "Forbidden" ||
        error.message === "Unauthorized user"
      ) {
        setIsForbidden(true);
      }
      console.error(error.message);
    } finally {
      closeEdit();
    }
  };

  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  return (
    <Model isOpen={true} onClose={closeEdit}>
      <h2 className="text-2xl font-bold mb-4">Edit Hours per week</h2>
      {/* Put your form for editing the section here */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-6 w-[30rem]"
      >
        <input
          type="number"
          min={1}
          name="LinkedIn"
          defaultValue={HPW}
          onChange={(e) => setHPW(Number(e.target.value))}
          placeholder="Place Your linkedIn account here"
          className="p-3 focus:outline-none bg-[var(--background-color)] border border-solid border-gray-600"
        />
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
