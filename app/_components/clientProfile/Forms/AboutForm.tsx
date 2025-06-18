/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useEffect, useState } from "react";

import { AboutAction } from "@/app/_lib/Client/Profile";
import Cookies from "js-cookie";
import ProtectedPage from "../../common/ProtectedPage";
import { toast, ToastContainer } from "react-toastify";
import Model from "../../freelancerProfile/Model";

export default function AboutForm({
  closeEdit,
  description,
}: {
  closeEdit: any;
  description: string;
}) {
  const [About, setAbout] = useState(description);
  const [isForbidden, setIsForbidden] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, { autoClose: 5000 });
      // Delay removal of the toast message from localStorage by 1 second
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
    }
  }, [errorMsg]);

  const handleAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      console.log(About);
      const res = await AboutAction(About, token);
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
      setErrorMsg(error.message);
    }
  };

  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Model isOpen={true} onClose={closeEdit}>
        <h2 className="text-2xl font-bold mb-4">Edit Description</h2>
        {/* Put your form for editing the section here */}
        <form onSubmit={(e) => handleAction(e)} className="flex flex-col gap-8">
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            defaultValue={description}
            name="description"
            className="resize-none w-[40rem] h-[15rem] focus:outline-none p-6 bg-[var(--background-color)] rounded-xl border-[var(--border-color)] border-solid border-2 text-lg"
          />
          <div className="self-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--btn-color)]  rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </Model>
    </>
  );
}
