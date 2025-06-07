/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useEffect, useState } from "react";
import Model from "../Model";
import Cookies from "js-cookie";
import ProtectedPage from "../../common/ProtectedPage";
import { LinksAction } from "@/app/_lib/FreelancerProfile/APi";
import { toast, ToastContainer } from "react-toastify";

export default function LinksForm({
  closeEdit,
  currentLink,
}: {
  closeEdit: any;
  currentLink: string;
}) {
  const [selectedLink, setSelectedLink] = useState(currentLink);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(selectedLink);
      const token = Cookies.get("token");
      const res = await LinksAction(selectedLink, token);
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
        <h2 className="text-2xl font-bold mb-4">Edit Linked account</h2>
        {/* Put your form for editing the section here */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-6 w-[30rem]"
        >
          <input
            type="url"
            name="LinkedIn"
            defaultValue={selectedLink}
            onChange={(e) => setSelectedLink(e.target.value)}
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
    </>
  );
}
