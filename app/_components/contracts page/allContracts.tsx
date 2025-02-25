import Link from "next/link";
import { Suspense } from "react";
import Container from "../common/Container";
import CustomeSelection from "../common/CustomeSelection";
import Spinner from "../common/Spinner";
import ContractAside from "./ContractAside";
import ContractList from "./ContractList";
import SearchBar from "./SearchBar";

type Props = {
  params: {
    advanced?: string;
    contractQuery?: string;
  };
  contracts: {
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
  };
};

const SortByOptions = [
  { label: "Due date", value: "DUE_DATE" },
  { label: "Title", value: "TITLE" },
  { label: "Start date", value: "START_DATE" },
];
const DirectionOptions = [
  { label: "Ascending", value: "ASC" },
  { label: "Descending", value: "DESC" },
];

function AllContracts({ params, contracts }: Props) {
  const { advanced } = params;
  const showAdvanced = advanced === "true";
  return (
    <Container className="pt-10 flex flex-col gap-8">
      <h1 className="text-4xl">All Contracts</h1>
      <div className="flex pt-20 justify-between">
        <SearchBar />

        <div className="flex gap-5">
          <Suspense fallback={<Spinner />}>
            <CustomeSelection options={SortByOptions}>Sort by</CustomeSelection>
            <CustomeSelection options={DirectionOptions}>
              Sort direction
            </CustomeSelection>
          </Suspense>
        </div>
      </div>
      <div className=" bg-[var(--background-color)] flex items-start justify-around p-4 ">
        {showAdvanced ? (
          <div className="relative">
            <ContractAside pathname="/nx/freelancer/mycontracts" />
            {/* <JobAside /> */}
          </div>
        ) : (
          <div className="">
            <Link href="?advanced=true">
              <button className="px-4 py-2 bg-[var(--btn-color)] text-[var(--accent-color)] rounded-md">
                Advanced Search
              </button>
            </Link>
          </div>
        )}
        <ContractList contracts={contracts} />
      </div>
    </Container>
  );
}

export default AllContracts;
