import React, { Suspense } from "react";
import Portfolio from "./Portfolio";
import Spinner from "../common/Spinner";
import CompletedJobslist from "./CompletedJobslist";
import { formatYearToString } from "@/app/_helpers/helper";
import EditButton from "../common/EditButton";

interface RightPanelProps {
  role?: string;
  onEditAbout: () => void;
  onEditPortfolio: () => void;
  onEditEmpHis: () => void;
  editable: boolean;
  id: string;
  freelancer: {
    description: string;
    employmentHistory: {
      company: string;
      position: string;
      startYear: string;
      endYear: string;
    }[];
  };
}

export default function RightPanel({
  role,
  freelancer,
  editable,
  onEditAbout,
  onEditPortfolio,
  onEditEmpHis,
  id,
}: RightPanelProps) {
  return (
    // About
    <div className="bg-[var(--foreground-color)] rounded-2xl w-full lg:w-2/3 px-1 py-6 sm:py-8 flex flex-col gap-4 sm:gap-5">
      <div className="flex justify-between pb-4 sm:pb-6 px-4 sm:px-6 border-b-4 border-[var(--border-color)]">
        <div className="flex flex-col gap-4 sm:gap-5 flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold">About</h2>
          <div className="flex gap-2 flex-wrap w-full">
            <p className="text-base sm:text-lg py-2 w-full whitespace-pre-wrap">
              {freelancer.description}
            </p>
          </div>
        </div>
        {editable && (
          <div className="self-start ml-4">
            <EditButton
              onClick={onEditAbout}
              className="text-lg sm:text-xl text-[var(--hover-color)] hover:text-[var(--accent-color)] transition-colors"
            />
          </div>
        )}
      </div>
      {/* Portfolio */}
      <div className="flex justify-between pb-4 sm:pb-6 px-4 sm:px-6 border-b-4 border-[var(--border-color)]">
        <div className="flex flex-col gap-4 sm:gap-6 flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold">Portfolio</h2>
          <div className="flex flex-col w-full gap-2 flex-wrap">
            <Suspense fallback={<Spinner />}>
              <Portfolio editable={editable} id={id} />
            </Suspense>
          </div>
        </div>
        {editable && (
          <div className="self-start ml-4">
            <EditButton
              onClick={onEditPortfolio}
              className="text-lg sm:text-xl text-[var(--hover-color)] hover:text-[var(--accent-color)] transition-colors"
            />
          </div>
        )}
      </div>
      {/* Completed Jobs */}
      <div className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6 px-4 sm:px-6 border-b-4 border-[var(--border-color)] ">
        <h2 className="text-2xl sm:text-3xl font-bold">Completed Jobs</h2>
        <div className="gap-2  ">
          <Suspense fallback={<Spinner />}>
            <CompletedJobslist role={role} id={id} />
          </Suspense>
        </div>
      </div>
      {/* Employment history */}
      <div className="flex justify-between pb-4 sm:pb-6 px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:gap-5 flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold">Employment history</h2>
          <div className="flex flex-col gap-4 sm:gap-6">
            {freelancer.employmentHistory.map((e, i) => (
              <div key={i} className="flex flex-col gap-2 flex-wrap">
                <span className="text-lg sm:text-xl">
                  {e.position} | {e.company}
                </span>
                <span className="text-xs sm:text-sm">
                  {formatYearToString(e.startYear)} -{" "}
                  {formatYearToString(e.endYear)}
                </span>
              </div>
            ))}
          </div>
        </div>
        {editable && (
          <div className="self-start ml-4">
            <EditButton
              onClick={onEditEmpHis}
              className="text-lg sm:text-xl text-[var(--hover-color)] hover:text-[var(--accent-color)] transition-colors"
            />
          </div>
        )}
      </div>
    </div>
  );
}
