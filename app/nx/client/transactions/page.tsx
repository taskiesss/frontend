/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Spinner from "@/app/_components/common/Spinner";
import Finance from "@/app/_components/financeTransactions/Finance";
import { getProfileTransaction } from "@/app/_lib/FinanceAPI/transactionsAPI";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

async function page() {
  const token = (await cookies()).get("token")?.value;
  try {
    const profileResponse = await getProfileTransaction(token);
    return (
      <Suspense fallback={<Spinner />}>
        <Finance profile={profileResponse} />
      </Suspense>
    );
  } catch (error: any) {
    if (
      error.message === "Forbidden" ||
      error.message === "Unauthorized user"
    ) {
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in" />
      );
    }
    throw new Error(error.message);
  }
}

export default page;
