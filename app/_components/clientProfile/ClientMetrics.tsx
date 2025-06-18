// app/_components/clientProfile/ClientMetrics.tsx

import Metrics from "@/app/_types/ClientMetrics";
import React from "react";

interface Props {
  metrics: Metrics;
}

export default function ClientMetrics({ metrics }: Props) {
  return (
    <div className="bg-[var(--foreground-color)] rounded-lg shadow-md p-4 text-center">
      <h2 className="text-lg font-semibold mb-2"> Metrics </h2>
      <ul className="list-none flex flex-col space-y-2 text-center w-full">
        <li className="flex gap-4 self-center">
          <p>Total Spend:</p>{" "}
          <p className="text-green-600 font-bold">
            ${metrics.totalSpent.toFixed(2)}
          </p>
        </li>
        <li className="flex gap-4 self-center">
          <p>Completed Jobs:</p>{" "}
          <p className="text-blue-500 font-bold">{metrics.completedJobs}</p>
        </li>
      </ul>
    </div>
  );
}
