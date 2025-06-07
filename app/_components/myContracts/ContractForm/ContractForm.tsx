"use client";

import React, { useEffect, useState, useTransition } from "react";
import Container from "../../common/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../common/button";
import { CreateContract } from "@/app/_lib/Client/CreateContract";
import ProtectedPage from "../../common/ProtectedPage";
import { toast, ToastContainer } from "react-toastify";

type Props = { proposalId: string };

function ContractForm({ proposalId }: Props) {
  const [isForbidden, setIsForbidden] = useState(false);
  // State for form fields
  const [formData, setFormData] = useState({
    startDate: "",
    costPerHour: 0,
    payment: "",
  });

  // State for milestones
  const [milestones, setMilestones] = useState([
    {
      milestoneNumber: 1,
      title: "",
      description: "",
      dueDate: "",
      expectedHours: 0,
    },
  ]);
  const [errorMsg, setErrorMsg] = useState("");
  // State for handling submission with useTransition
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, { autoClose: 5000 });
      // Delay removal of the toast message from localStorage by 1 second
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
    }
  }, [errorMsg]);

  // Function to handle form field changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "costPerHour" ? Number(value) : value,
    }));
  };

  // Function to add a new milestone
  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        milestoneNumber: milestones.length + 1,
        title: "",
        description: "",
        dueDate: "",
        expectedHours: 0,
      },
    ]);
  };

  // Function to remove a milestone by index
  const removeMilestone = (index: number) => {
    const updatedMilestones = milestones
      .filter((_, i) => i !== index)
      .map((milestone, i) => ({ ...milestone, milestoneNumber: i + 1 }));
    setMilestones(updatedMilestones);
  };

  // Function to update a milestone field
  const updateMilestone = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    setMilestones(updatedMilestones);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create FormData object
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("proposalId", proposalId);
    // formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("startDate", formData.startDate);
    formDataToSubmit.append("costPerHour", formData.costPerHour.toString());
    formDataToSubmit.append("payment", formData.payment);
    formDataToSubmit.append("milestones", JSON.stringify(milestones));

    // Use startTransition for submission
    startTransition(async () => {
      const response = await CreateContract(
        { error: undefined },
        formDataToSubmit
      );
      if (response.error) {
        if (
          response.error === "Forbidden" ||
          response.error === "Unauthorized user"
        ) {
          setIsForbidden(true);
        } else {
          setErrorMsg(response.error);
        }
        return;
      }
    });
  };

  if (isForbidden)
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );

  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <Container className="flex flex-col items-center py-20">
        <div className="border-solid border-2 rounded-lg overflow-hidden border-gray-600 w-10/12 flex flex-col gap-10">
          <div className="flex flex-col gap-5 bg-[var(--foreground-color)] px-20 pb-10 w-full">
            <h1 className="text-5xl pt-12">
              <FontAwesomeIcon icon={faFileSignature} /> Contract Form
            </h1>
            <span className="text-2xl opacity-70">
              Fill in the details below to create a new contract
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col pb-20 gap-12 items-start px-20"
          >
            {/* Start Date */}
            <section className="flex flex-col w-full gap-2">
              <div className="flex items-center gap-2">
                <label htmlFor="startDate" className="text-lg font-medium">
                  Start date
                </label>
                <span className="text-sm opacity-75">
                  (NOTE: This acts as due date for freelancer to respond to this
                  contract)
                </span>
              </div>
              <input
                required
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                className="px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
              />
            </section>

            {/* Cost Per Hour */}
            <section className="flex flex-col w-full gap-2">
              <label htmlFor="costPerHour" className="text-lg font-medium">
                Cost Per Hour
              </label>
              <input
                required
                type="number"
                name="costPerHour"
                value={formData.costPerHour}
                onChange={handleInputChange}
                min={0}
                className="resize-none px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
              />
            </section>

            {/* Payment method */}
            <section className="flex flex-col w-full gap-2">
              <label htmlFor="payment" className="text-lg font-medium">
                Payment method
              </label>
              <select
                required
                name="payment"
                value={formData.payment}
                onChange={handleInputChange}
                className="resize-none px-3 py-4 text-lg w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
              >
                <option value="" disabled>
                  Choose payment method
                </option>
                <option value="PerMilestones">Per Milestones</option>
                <option value="PerProject">Per Project</option>
              </select>
            </section>

            {/* Milestones */}
            <section className="flex flex-col w-full gap-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <p className="text-2xl font-medium">Milestones</p>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="bg-[var(--btn-color)] hover:bg-[var(--button-hover-background-color)] transition-all rounded-lg py-2 px-3"
                >
                  + Add milestone
                </button>
              </div>
              {/* Milestone list */}
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 px-4 py-5 border border-[var(--accent-color)] border-opacity-70 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">
                      Milestone #{milestone.milestoneNumber}
                    </p>
                    {milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="text-red-500 hover:text-red-700 transition-all"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </div>
                  {/* Title */}
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium">Title</label>
                    <input
                      required
                      type="text"
                      placeholder="Milestone title"
                      value={milestone.title}
                      onChange={(e) =>
                        updateMilestone(index, "title", e.target.value)
                      }
                      className="resize-none px-3 py-2 text-base w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                    />
                  </div>
                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-base font-medium">Description</label>
                    <textarea
                      required
                      placeholder="Describe this milestone"
                      value={milestone.description}
                      onChange={(e) =>
                        updateMilestone(index, "description", e.target.value)
                      }
                      className="resize-none px-3 py-2 text-base w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                      rows={3}
                    />
                  </div>
                  {/* Due Date and Expected Hours */}
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="text-base font-medium">Due Date</label>
                      <input
                        required
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={milestone.dueDate}
                        onChange={(e) =>
                          updateMilestone(index, "dueDate", e.target.value)
                        }
                        className="resize-none px-3 py-2 text-base w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="text-base font-medium">
                        Expected Hours
                      </label>
                      <input
                        required
                        type="number"
                        min={0}
                        value={milestone.expectedHours}
                        onChange={(e) =>
                          updateMilestone(
                            index,
                            "expectedHours",
                            Number(e.target.value)
                          )
                        }
                        className="resize-none px-3 py-2 text-base w-full border border-solid border-gray-600 rounded-lg focus:outline-none bg-[var(--background-color)]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Submit Button */}
            <div className="flex w-full justify-end">
              <Button type="submit" className="" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Contract"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default ContractForm;
