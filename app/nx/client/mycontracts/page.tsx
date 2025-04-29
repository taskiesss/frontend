/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import AllContracts from "@/app/_components/myContracts/AllContracts";
import { getMyClientContracts } from "@/app/_lib/ContractsAPi/contractAPI";
import { Contracts } from "@/app/_types/AllContractsResponce";
import { cookies } from "next/headers";

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
    contracts = await getMyClientContracts(reqbody, token);
    return <AllContracts contracts={contracts} role={"client"} />;
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
