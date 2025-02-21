/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import Container from "../common/Container";
import Button from "../common/button";
import jobApplication from "@/app/_lib/JobApplication/jobApplication";
import Cookies from "js-cookie";
import ProtectedPage from "../common/ProtectedPage";

type Props = {
  jobid: string;
};

interface Education {
  degree: string;
  institution: string;
  graduationYear: number;
}

interface Milestone {
  title: string;
  description: string;
  dueDate: string;
  expectedHours: string;
}

const TASKAYA_SERVICE = 0.02;
const paymentOptions = [
  { label: "Per Milestone", key: "PerMilestones" },
  { label: "Per Project", key: "PerProject" },
];

export default function JobApplication({ jobid }: Props) {
  // Job Application Fields
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [pricePerHour, setPricePerHour] = useState<string>("");
  const [milestones, setMilestones] = useState<Milestone[]>([
    { title: "", description: "", dueDate: "", expectedHours: "" },
  ]);
  const [coverLetter, setCoverLetter] = useState<string>("");
  // State for the file attachment
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

  // Candidate info from localStorage
  const [localCandidateId, setLocalCandidateId] = useState<string>("");
  const [localCandidateName, setLocalCandidateName] = useState<string>("");
  const [unauthorized, setUnauthorized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedCandidateId = localStorage.getItem("id") ?? "";
    const storedCandidateName = localStorage.getItem("name") ?? "";
    setLocalCandidateId(storedCandidateId);
    setLocalCandidateName(storedCandidateName);
  }, []);

  const handleMilestoneChange = (
    index: number,
    field: keyof Milestone,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleCoverLetterChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCoverLetter(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachmentFile(e.target.files[0]);
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setAttachmentFile(null);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert milestones to the expected API format
    const milestonesArr = milestones.map((m, index) => ({
      milestoneNumber: index + 1,
      title: m.title,
      description: m.description,
      dueDate: m.dueDate,
      expectedHours: Number(m.expectedHours),
    }));

    // Build the JSON payload. Note that pricePerHour is converted to a number.
    const payload = {
      jobId: jobid,
      candidateId: localCandidateId,
      pricePerHour: Number(pricePerHour),
      freelancerPayment: paymentMethod,
      milestones: milestonesArr,
      coverLetter: coverLetter,
    };

    // Create a Blob from the JSON string with the proper MIME type.
    const blob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });

    // Build the FormData
    const formData = new FormData();
    formData.append("requestDTO", blob);
    if (attachmentFile) {
      formData.append("attachment", attachmentFile);
    }

    const token = Cookies.get("token");
    try {
      setIsSubmitting(true);
      const response = await jobApplication(token, formData, jobid);

      router.back();
    } catch (err: any) {
      if (err.message === "Forbidden" || err.message === "Unauthorized user") {
        setUnauthorized(true);
      } else {
        console.error(err.message);
      }
      console.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (unauthorized) {
    return <ProtectedPage message="You are not allowed to do this action." />;
  }

  const totalPrice = milestones.reduce((acc, m) => {
    return acc + Number(m.expectedHours) * Number(pricePerHour);
  }, 0);
  const services = totalPrice * TASKAYA_SERVICE;
  const discountedTotalPrice = totalPrice * (1 - TASKAYA_SERVICE);

  return (
    <Container className="flex flex-col items-center gap-4">
      <div className="pt-16 text-center">
        <h1 className="text-3xl font-bold ">
          You are Applying as {localCandidateName}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 py-5">
        <div className="flex flex-col border border-solid border-gray-600 gap-5 px-6 py-6 rounded-lg">
          <h1 className="text-3xl">Terms</h1>
          <div className="flex flex-col gap-3">
            <label className="text-lg">How do you want to be paid</label>
            {paymentOptions.map((option) => (
              <div
                key={option.key}
                className="flex items-start justify-center place-content-center"
              >
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
                  <span className="text-lg">{option.label}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-lg">Expected price per hour</label>
            <input
              type="number"
              name="pricePerHour"
              id="pricePerHour"
              value={pricePerHour}
              onChange={handlePricePerHourChange}
              min="0"
              className="border border-solid w-1/4 border-[var(--border-color)] focus:outline-none bg-[var(--background-color)] py-2 px-2 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col gap-4 items-start">
            <span className="text-lg">
              How many milestones do you want to include
            </span>
            {milestones.map((m, index) => (
              <div key={index} className="flex gap-7 items-start py-3">
                <div className="flex flex-col gap-3">
                  <label htmlFor={`title-${index}`} className="text-lg">
                    Title
                  </label>
                  <input
                    type="text"
                    name={`title-${index}`}
                    id={`title-${index}`}
                    value={m.title}
                    onChange={(e) => handleMilestoneChange(index, "title", e)}
                    className="border border-solid border-[var(--border-color)] focus:outline-none bg-[var(--background-color)] py-2 px-2 rounded-lg"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor={`description-${index}`}>Description</label>
                  <textarea
                    name={`description-${index}`}
                    id={`description-${index}`}
                    value={m.description}
                    onChange={(e) =>
                      handleMilestoneChange(index, "description", e)
                    }
                    className="border border-solid border-[var(--border-color)] focus:outline-none bg-[var(--background-color)] py-2 px-2 rounded-lg resize-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor={`duedate-${index}`}>Due Date</label>
                  <input
                    type="date"
                    name={`duedate-${index}`}
                    id={`duedate-${index}`}
                    value={m.dueDate}
                    onChange={(e) => handleMilestoneChange(index, "dueDate", e)}
                    className="border border-solid border-[var(--border-color)] bg-[var(--background-color)] focus:outline-none py-2 px-2 rounded-lg"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
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
                    className="border border-solid border-[var(--border-color)] bg-[var(--background-color)] focus:outline-none py-2 px-2 rounded-lg"
                    required
                  />
                </div>
                <div
                  className={`${
                    !(milestones.length > 1) ? "invisible" : ""
                  } self-center`}
                >
                  <button
                    type="button"
                    onClick={() => removeMilestone(index)}
                    className="focus:outline-none text-red-600 transition-transform duration-200 hover:scale-110"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addMilestone}
              className="text-[var(--btn-color)] focus:outline-none text-lg hover:text-[var(--hover-color)]"
            >
              + Add Milestone
            </button>
          </div>
          <div className="border border-gray-600 border-solid border-b-0 border-l-0 border-r-0 flex py-5 justify-start flex-row-reverse">
            <div className="flex flex-col w-1/2 gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-lg">Total Price of Project</span>
                  <span className="text-red-600 text-lg">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <span className="text-[var(--bg-skill)]">
                  This includes all milestones, and is the amount your client
                  will see
                </span>
              </div>
              <div className="flex justify-between border-solid border border-[var(--border-color)] border-b-0 border-l-0 border-r-0 py-3 text-lg">
                <span>Taskaya Service Fee</span>
                <span className="text-[var(--bg-skill)]">
                  ${services.toFixed(2)}
                </span>
              </div>
              <div>
                <div className="flex justify-between border-solid border border-[var(--border-color)] border-b-0 border-l-0 border-r-0 py-3 gap-3 text-lg">
                  <span>You&apos;ll Receive</span>
                  <span className="text-[var(--accent-color)]">
                    ${discountedTotalPrice.toFixed(2)}
                  </span>
                </div>
                <span className="text-[var(--bg-skill)]">
                  Your estimated payment, after service fees
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center flex-1">
              <FontAwesomeIcon icon={faMoneyCheck} size="10x" />
            </div>
          </div>
        </div>
        <div className="border border-solid border-gray-600 rounded-lg px-6 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Cover Letter</h1>
            <textarea
              name="coverLetter"
              id="coverLetter"
              value={coverLetter}
              onChange={handleCoverLetterChange}
              className="border border-solid border-[var(--border-color)] focus:outline-none bg-[var(--background-color)] text-lg box-content resize-none py-2 px-2 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl">Attachments</h3>
            <div className="flex  gap-5">
              <input
                type="file"
                name="attachment"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="file:bg-[var(--btn-color)] file:border-0 file:text-lg border-solid border border-[var(--border-color)] py-5 px-5"
              />
              <button
                type="button"
                onClick={resetFileInput}
                className={`text-lg text-red-600 ${
                  attachmentFile ? "" : "invisible"
                }`}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="text-lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
