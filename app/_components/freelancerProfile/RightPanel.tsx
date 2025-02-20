import React, { Suspense } from "react";
import Portfolio from "./Portfolio";
import Spinner from "../common/Spinner";
import CompletedJobslist from "./CompletedJobslist";
import { formatYearToString } from "@/app/_helpers/helper";
import EditButton from "../common/EditButton";

interface RightPanelProps {
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
  freelancer,
  editable,
  onEditAbout,
  onEditPortfolio,
  onEditEmpHis,
  id,
}: RightPanelProps) {
  return (
    // About
    <div className="bg-[var(--foreground-color)] rounded-2xl w-2/3 p-8 flex flex-col gap-5">
      <div className="flex justify-between pb-6 px-6 border-b-4 border-[var(--border-color)]">
        <div className="flex flex-col gap-5 ">
          <h2 className="text-3xl font-bold">About</h2>
          <div className="flex gap-2 flex-wrap">
            <span className="text-lg py-2">{freelancer.description}</span>
          </div>
        </div>
        {editable && (
          <div className="self-start">
            <EditButton onClick={onEditAbout} />
          </div>
        )}
      </div>
      {/* Portfolio */}
      <div className="flex justify-between pb-6 px-6 border-b-4 border-[var(--border-color)]">
        <div className="flex flex-col gap-6 ">
          <h2 className="text-3xl font-bold">Portfolio</h2>
          <div className="flex gap-2 flex-wrap">
            <Suspense fallback={<Spinner />}>
              <Portfolio id={id} />
            </Suspense>
          </div>
        </div>
        {editable && (
          <div className="self-start">
            <EditButton onClick={onEditPortfolio} />
          </div>
        )}
      </div>
      {/* Completed Jobs */}
      <div className="flex flex-col gap-6 pb-6 px-6 border-b-4 border-[var(--border-color)] ">
        <h2 className="text-3xl font-bold">Completed Jobs</h2>
        <div className="gap-2 ">
          <Suspense fallback={<Spinner />}>
            <CompletedJobslist id={id} />
          </Suspense>
        </div>
      </div>
      {/* Employment history */}
      <div className="flex justify-between pb-6 px-6">
        <div className="flex flex-col gap-5  ">
          <h2 className="text-3xl font-bold">Employment history</h2>
          <div className="flex flex-col gap-6">
            {freelancer.employmentHistory.map((e, i) => (
              <div key={i} className="flex flex-col gap-2 flex-wrap">
                <span className="text-xl">
                  {e.position} | {e.company}
                </span>
                <span className="text-sm">
                  {formatYearToString(e.startYear)} -{" "}
                  {formatYearToString(e.endYear)}
                </span>
              </div>
            ))}
          </div>
        </div>
        {editable && (
          <div className="self-start">
            <EditButton onClick={onEditEmpHis} />
          </div>
        )}
      </div>
    </div>
  );
}
