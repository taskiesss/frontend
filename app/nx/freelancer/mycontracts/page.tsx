/* eslint-disable @typescript-eslint/no-explicit-any */
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import AllContracts from "@/app/_components/contracts page/AllContracts";
import { getMyContracts } from "@/app/_lib/ContractsAPi/contractAPI";
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
interface Contracts {
  content: {
    contractID: string;
    jobID: string;
    jobTitle: string;
    clientName: string;
    clientID: string;
    contractStatus: "ACTIVE" | "ENDED";
    budget: number;
    activeMilestone: string;
    clientRateForFreelancer: number;
    startDate: string;
    dueDate: string;
    endDate: string;
  }[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
let contracts: Contracts = {
  content: [
    {
      contractID: "string",
      jobID: "string",
      jobTitle: "string",
      clientName: "string",
      clientID: "string",
      contractStatus: "ACTIVE",
      budget: 140.5,
      activeMilestone: "string",
      clientRateForFreelancer: 3,
      startDate: "2025-02-24",
      dueDate: "2025-02-24",
      endDate: "present",
    },
  ],
  totalElements: 9,
  totalPages: 0,
  size: 3,
  number: 0,
};
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
  console.log(statusArr, contractQuery, page, sortBy, sortDirection);
  try {
    const reqbody = {
      search: contractQuery,
      contractStatus: statusArr,
      page: pageNumber - 1,
      size: 10,
      sortedBy: sortBy,
      sortDirection: sortDirection,
    };
    const token = (await cookies()).get("token")?.value;
    contracts = await getMyContracts(reqbody, token);
    return <AllContracts contracts={contracts} params={params} />;
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
