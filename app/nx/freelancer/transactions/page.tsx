/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Finance from "@/app/_components/financeTransactions/Finance";
import { getProfileTransaction } from "@/app/_lib/FinanceAPI/transactionsAPI";
import { cookies } from "next/headers";
import React from "react";

const profile = {
  profilePicture: "https://example.com/images/isabel-austin.jpg",
  name: "Isabel Austin",
  totalBalance: 1000,
};

async function page() {
  const token = (await cookies()).get("token")?.value;
  try {
    const profileResponse = await getProfileTransaction(token);
    return <Finance profile={profileResponse} />;
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
