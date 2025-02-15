/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Container from "../common/Container";
import Image from "next/image";
import Button from "../common/button";
import MyUploadWidget from "../common/MyUploadWidget";
import Link from "next/link";
import jobApplication from "@/app/_lib/JobApplication/jobApplication";
import { JobApplicationRequest } from "@/app/_types/JobApplication";
import { useRouter } from "next/navigation";

type Props = {
  jobid: string;
};

const TASKAYA_SERVICE = 0.02;
interface Milestone {
  title: string;
  description: string;
  dueDate: string;
  expectedHours: string;
}

const paymentOptions = [
  { label: "Per Milestone", key: "PerMilestones" },
  { label: "Per Project", key: "PerProject" },
];

export default function JobApplication({ jobid }: Props) {
  const [localCandidateId, setLocalCandidateId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [pricePerHour, setPricePerHour] = useState<string>("");
  const [milestones, setMilestones] = useState<Milestone[]>([
    { title: "", description: "", dueDate: "", expectedHours: "" },
  ]);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [attachmentURL, setAttachmentURL] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    // Get candidateId from localStorage when the component mounts
    const storedCandidateId = localStorage.getItem("candidateId") ?? "";
    setLocalCandidateId(storedCandidateId);
  }, []);

  const handleMilestoneChange = (
    index: number,
    field: keyof Milestone,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setMilestones((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addMilestone = () => {
    setMilestones((prev) => [
      ...prev,
      { title: "", description: "", dueDate: "", expectedHours: "" },
    ]);
  };

  const removeMilestone = (index: number) => {
    setMilestones((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handlePricePerHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPricePerHour(e.target.value);
  };

  const handleCoverLetterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCoverLetter(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const milestonesArr = milestones.map((m, index) => {
      return {
        milestoneNumber: index + 1,
        title: m.title,
        description: m.description,
        dueDate: m.dueDate,
        expectedHours: Number(m.expectedHours),
      };
    });
    const request: JobApplicationRequest = {
      jobId: jobid,
      candidateId: localCandidateId,
      pricePerHour: Number(pricePerHour),
      freelancerPayment: paymentMethod,
      milestones: milestonesArr,
      coverLetter: coverLetter,
      attachment: attachmentURL,
    };
    console.log(request);
    try {
      const response = await jobApplication(request);
      if (response) {
        router.back();
      }
    } catch (e: any) {
      if (e === "forbidden" && e === "unauthorized") {
        router.push("/login");
      }
      console.error(e.message);
    }
  };

  const totalPrice = milestones.reduce((acc, m) => {
    return acc + Number(m.expectedHours) * Number(pricePerHour);
  }, 0);

  const services = totalPrice * TASKAYA_SERVICE;
  const discountedTotalPrice = totalPrice * (1 - TASKAYA_SERVICE);
  return (
    <Container className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10  py-10">
        <div className="flex flex-col border border-solid border-gray-600 gap-5 px-6 py-6">
          <h1 className="text-3xl">Terms</h1>
          <div className="flex flex-col gap-3">
            <label className="text-lg">How do you want to be paid</label>
            {paymentOptions.map((option) => (
              <div key={option.key} className="flex items-center">
                <label className="container">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.key}
                    checked={paymentMethod === option.key}
                    onChange={handlePaymentMethodChange}
                    className="focus:outline-none bg-[var(--background-color)]"
                    required
                  />
                  <span className="checkmark"></span>
                  <span className="text-lg ">{option.label}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="text-lg">Expected price per hour</label>
            <input
              type="number"
              name="pricePerHour"
              id="pricePerHour"
              value={pricePerHour}
              onChange={handlePricePerHourChange}
              min="0"
              className="border border-solid w-1/4 border-[var(--border-color)] focus:outline-none bg-[var(--background-color)]"
              required
            />
          </div>
          <div className="">
            <span>How many milestones do you want to include</span>
            {milestones.map((m, index) => (
              <div key={index} className="flex gap-7 ">
                <div className="flex flex-col">
                  <label htmlFor={`title-${index}`}>Title</label>
                  <input
                    type="text"
                    name={`title-${index}`}
                    id={`title-${index}`}
                    value={m.title}
                    onChange={(e) => handleMilestoneChange(index, "title", e)}
                    className="border border-solid border-[var(--border-color)] focus:outline-none bg-[var(--background-color)]"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`description-${index}`}>Description</label>
                  <input
                    type="text"
                    name={`description-${index}`}
                    id={`description-${index}`}
                    value={m.description}
                    onChange={(e) =>
                      handleMilestoneChange(index, "description", e)
                    }
                    className="border border-solid border-[var(--border-color)] focus:outline-none bg-[var(--background-color)]"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`duedate-${index}`}>Due Date</label>
                  <input
                    type="date"
                    name={`duedate-${index}`}
                    id={`duedate-${index}`}
                    value={m.dueDate}
                    onChange={(e) => handleMilestoneChange(index, "dueDate", e)}
                    className="border border-solid border-[var(--border-color)] focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`expectedHours-${index}`}>
                    Expected Hours
                  </label>
                  <input
                    type="number"
                    name={`expectedHours-${index}`}
                    id={`expectedHours-${index}`}
                    value={m.expectedHours}
                    onChange={(e) =>
                      handleMilestoneChange(index, "expectedHours", e)
                    }
                    min="0"
                    className="border border-solid border-[var(--border-color)] focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    type="button"
                    onClick={() => removeMilestone(index)}
                    className="focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addMilestone}
              className="text-[var(--btn-color)]  focus:outline-none"
            >
              + Add Milestone
            </button>
          </div>
          <div className="border border-gray-600 border-solid flex ">
            <div className="flex flex-col w-1/2">
              <div className="flex justify-between">
                <span>Total Price of Project</span>
                <span className="text-red-600">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taskaya Service Fee</span>
                <span className="text-[var(--bg-skill)]">
                  ${services.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>You&apos;ll Receive</span>
                <span className="text-[var(--accent-color)]">
                  ${discountedTotalPrice.toFixed(2)}
                </span>
              </div>
            </div>
            {/* <Image ref={}></Image> */}
          </div>
        </div>
        <div className="border border-solid border-gray-600">
          <div className="flex flex-col">
            <h1 className="text-3xl">Cover Letter</h1>
            <input
              type="text"
              name="coverLetter"
              id="coverLetter"
              value={coverLetter}
              onChange={handleCoverLetterChange}
              className="border border-solid border-[var(--border-color)] focus:outline-none"
              required
            />
          </div>
          <div className="">
            <h3 className="text-2xl">Attachments</h3>
            {/* Replace the file input with the custom upload widget */}
            <MyUploadWidget
              onUpload={(url) => setAttachmentURL(url)}
              buttonClassName="bg-[var(--btn-color)] rounded-lg py-2 px-2"
            />
            {attachmentURL && (
              <div>
                <Link
                  href={attachmentURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Uploaded File
                </Link>
              </div>
            )}
          </div>
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Container>
  );
}
