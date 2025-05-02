/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import Spinner from "@/app/_components/common/Spinner";
import AllContracts from "@/app/_components/myContracts/AllContracts";
import { getMyContracts } from "@/app/_lib/ContractsAPi/contractAPI";
import { Contracts } from "@/app/_types/AllContractsResponce";
import { cookies } from "next/headers";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{
    contractQuery?: string;
    page?: string | "1";
    status?: string;
    advanced?: string;
    "Sort by"?: string;
    "Sort direction"?: "ASC" | "DESC";
  }>;
};

let contracts: Contracts;

async function page({ searchParams }: Props) {
  const params = await searchParams;
  const {
    status,
    contractQuery,
    page,
    "Sort by": sortBy,
    "Sort direction": sortDirection,
  } = params;
  const statusArr = status ? status.split(",") : [];
  const pageNumber = Number(page) ? Number(page) : 1;
  // console.log(statusArr, contractQuery, page, sortBy, sortDirection);
  try {
    const reqbody = {
      search: contractQuery,
      contractStatus: statusArr,
      page: pageNumber - 1,
      size: 10,
      sortedBy: sortBy,
      sortDirection: sortDirection,
    };
    // console.log(reqbody);
    const token = (await cookies()).get("token")?.value;
    contracts = await getMyContracts(reqbody, token);
    console.log(contracts);
    return (
      <Suspense fallback={<Spinner />}>
        <AllContracts contracts={contracts} />
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
