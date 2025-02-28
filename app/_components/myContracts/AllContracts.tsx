import { Suspense } from "react";
import Container from "../common/Container";
import CustomeSelection from "../common/CustomeSelection";
import Spinner from "../common/Spinner";
import AdvancedSearchButton from "./AdvancedSearchButton";
import ContractList from "./ContractList";
import SearchBar from "./SearchBar";

type Props = {
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
      clientRateForFreelancer?: number;
      startDate: string;
      dueDate?: string;
      endDate?: string;
    }[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
};

const SortByOptions = [
  { label: "Due date", value: "dueDate" },
  { label: "Title", value: "title" },
  { label: "Start date", value: "startDate" },
];
const DirectionOptions = [
  { label: "Ascending", value: "ASC" },
  { label: "Descending", value: "DESC" },
];

function AllContracts({ contracts }: Props) {
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
        <AdvancedSearchButton />
        {contracts.content.length > 0 ? (
          <ContractList contracts={contracts} />
        ) : (
          <div className="flex flex-col">
            <span className="self-center text-2xl">
              There are no contracts yet
            </span>
          </div>
        )}
      </div>
    </Container>
  );
}

export default AllContracts;
