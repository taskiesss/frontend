// app/_components/clientProfile/ClientMetrics.tsx

import Metrics from "@/app/_types/ClientMetrics";
import React from "react";

interface Props {
  metrics: Metrics;
}

export default function ClientMetrics({ metrics }: Props) {
  return (
    <div className="bg-[var(--foreground-color)] rounded-lg shadow-md p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Metrics</h2>
      <ul className="list-none space-y-2 text-center w-full">
        <li>
          <strong>Total Spend:</strong> ${metrics.totalSpent.toFixed(2)}
        </li>
        <li>
          <strong>Jobs Posted:</strong> {metrics.completedJobs}
        </li>
      </ul>
    </div>
  );
}
